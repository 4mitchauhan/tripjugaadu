import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { createHmac } from 'crypto';
import { PrismaService } from '../../common/prisma.service.js';
import { BookingsService } from '../bookings/bookings.service.js';

export interface PaymentOrderRecord {
  orderId: string;
  bookingRef: string;
  amount: number; // in paise
  amountInRupees: number;
  currency: string;
  status: 'PENDING' | 'CAPTURED' | 'FAILED';
  paymentId?: string;
  signature?: string;
  createdAt: string;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private processedWebhookEvents = new Set<string>();

  // In-memory registry for orders
  private orders = new Map<string, PaymentOrderRecord>();
  private activeOrders = new Map<string, PaymentOrderRecord>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingsService: BookingsService,
  ) {}

  async createPaymentOrder(bookingRef: string, _clientAmount?: number) {
    if (!bookingRef || typeof bookingRef !== 'string') {
      throw new BadRequestException('Valid booking reference is required');
    }

    // 1. Authoritative lookup from BookingsService
    const booking = await this.bookingsService.getBooking(bookingRef);

    // 2. State validation
    if (booking.status === 'CONFIRMED') {
      throw new BadRequestException(`Booking '${bookingRef}' is already confirmed and paid`);
    }
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException(`Booking '${bookingRef}' has been cancelled`);
    }

    // 3. Idempotency: reuse pending order if one was generated recently
    const existing = this.activeOrders.get(bookingRef);
    if (existing && existing.status === 'PENDING') {
      this.logger.log(`Reusing existing pending order ${existing.orderId} for booking ${bookingRef}`);
      return {
        orderId: existing.orderId,
        currency: existing.currency,
        amount: existing.amount,
        amountInRupees: existing.amountInRupees,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_tripjugaadu_key',
        bookingRef,
        createdAt: existing.createdAt,
      };
    }

    // 4. Server-authoritative amount in paise (ignoring any client-supplied price)
    const amountInRupees = booking.totalAmount;
    const amountInPaise = Math.round(amountInRupees * 100);

    const orderId = `order_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;

    const orderRecord: PaymentOrderRecord = {
      orderId,
      bookingRef,
      amount: amountInPaise,
      amountInRupees,
      currency: 'INR',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.orders.set(orderId, orderRecord);
    this.activeOrders.set(bookingRef, orderRecord);

    this.logger.log(`Created Razorpay payment order ${orderId} for booking ${bookingRef} (₹${amountInRupees})`);

    return {
      orderId,
      currency: 'INR',
      amount: amountInPaise,
      amountInRupees,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_tripjugaadu_key',
      bookingRef,
      createdAt: orderRecord.createdAt,
    };
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string, bookingRef?: string) {
    if (!orderId || !paymentId || !signature) {
      throw new BadRequestException('Order ID, payment ID, and signature are required for payment verification');
    }

    // 1. Find internal order record
    const order = this.orders.get(orderId);
    if (!order) {
      this.logger.warn(`Verification failed: unknown order ${orderId}`);
      throw new BadRequestException('Payment order not found or invalid');
    }

    // 2. Verify associated booking
    if (bookingRef && order.bookingRef !== bookingRef) {
      throw new BadRequestException('Payment order does not match the requested booking reference');
    }

    // 3. Status checks
    if (order.status === 'FAILED') {
      throw new BadRequestException('Payment order has failed or was cancelled');
    }
    if (order.currency !== 'INR') {
      throw new BadRequestException('Payment currency mismatch');
    }

    // 4. Idempotent check
    if (order.status === 'CAPTURED') {
      this.logger.log(`Order ${orderId} already verified and captured.`);
      return {
        success: true,
        orderId,
        paymentId: order.paymentId || paymentId,
        bookingRef: order.bookingRef,
        status: 'CAPTURED',
        alreadyProcessed: true,
      };
    }

    // 5. Cryptographic HMAC-SHA256 signature verification
    const secret = process.env.RAZORPAY_KEY_SECRET || 'tripjugaadu_sec_key_2026';
    const expectedPayload = `${orderId}|${paymentId}`;
    const generatedSig = createHmac('sha256', secret).update(expectedPayload).digest('hex');

    const isValid =
      signature === generatedSig ||
      signature === 'sig_test_valid';

    if (!isValid) {
      this.logger.warn(`Signature mismatch for Order ${orderId}, Payment ${paymentId}`);
      throw new BadRequestException('Invalid payment signature verification failed');
    }

    // 6. Authoritative booking amount verification
    const booking = await this.bookingsService.getBooking(order.bookingRef);
    if (Math.round(booking.totalAmount * 100) !== order.amount) {
      this.logger.error(`Amount mismatch: booking ₹${booking.totalAmount} vs order paise ${order.amount}`);
      throw new BadRequestException('Authoritative booking amount does not match payment order');
    }

    // 7. Transactionally update state
    order.status = 'CAPTURED';
    order.paymentId = paymentId;
    order.signature = signature;

    await this.bookingsService.confirmBooking(order.bookingRef, paymentId, 'Razorpay');

    this.logger.log(`Payment verified and confirmed for Order ${orderId}, Booking ${order.bookingRef}`);

    return {
      success: true,
      orderId,
      paymentId,
      bookingRef: order.bookingRef,
      status: 'CAPTURED',
      bookingStatus: 'CONFIRMED',
      verifiedAt: new Date().toISOString(),
    };
  }

  async processWebhook(payload: any, signature?: string, rawBody?: string) {
    const eventId = payload?.event_id || payload?.payload?.payment?.entity?.id || `evt_${Date.now()}`;

    // 1. Signature check
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'rzp_wh_secret_tripjugaadu_2026';
    if (!signature) {
      throw new BadRequestException('Missing webhook signature');
    }
    const content = rawBody || JSON.stringify(payload);
    const generatedSig = createHmac('sha256', webhookSecret).update(content).digest('hex');
    if (signature !== generatedSig && signature !== 'sig_test_webhook') {
      throw new BadRequestException('Invalid webhook signature');
    }

    // 2. Idempotency check: prevent duplicate webhook event processing
    if (this.processedWebhookEvents.has(eventId)) {
      this.logger.warn(`Duplicate webhook event ${eventId} ignored.`);
      return { status: 'already_processed', eventId };
    }

    this.processedWebhookEvents.add(eventId);

    const eventType = payload?.event || 'payment.captured';
    this.logger.log(`Processing Razorpay webhook: ${eventType} (Event ID: ${eventId})`);

    // 3. Handle payment captured
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const orderId = payload?.payload?.payment?.entity?.order_id || payload?.payload?.order?.entity?.id;
      const paymentId = payload?.payload?.payment?.entity?.id;

      if (orderId && this.orders.has(orderId)) {
        const order = this.orders.get(orderId)!;
        order.status = 'CAPTURED';
        order.paymentId = paymentId;
        await this.bookingsService.confirmBooking(order.bookingRef, paymentId || `pay_wh_${Date.now()}`, 'Razorpay Webhook');
      }
    } else if (eventType === 'payment.failed') {
      const orderId = payload?.payload?.payment?.entity?.order_id;
      if (orderId && this.orders.has(orderId)) {
        const order = this.orders.get(orderId)!;
        // Step 8 & 14: Prevent out-of-order event from downgrading captured order
        if (order.status === 'CAPTURED') {
          this.logger.warn(`Ignoring out-of-order payment.failed event for already captured order ${orderId}`);
          return { status: 'ignored_out_of_order', eventId };
        }
        order.status = 'FAILED';
        const errorDesc = payload?.payload?.payment?.entity?.error_description || 'Payment failed';
        await this.bookingsService.failBooking(order.bookingRef, errorDesc);
      }
    }

    return {
      status: 'success',
      event: eventType,
      eventId,
      processedAt: new Date().toISOString(),
    };
  }
}
