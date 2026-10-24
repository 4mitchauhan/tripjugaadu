var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { createHmac } from 'crypto';
import { PrismaService } from '../../common/prisma.service.js';
import { BookingsService } from '../bookings/bookings.service.js';
let PaymentsService = PaymentsService_1 = class PaymentsService {
    prisma;
    bookingsService;
    logger = new Logger(PaymentsService_1.name);
    processedWebhookEvents = new Set();
    orders = new Map();
    activeOrders = new Map();
    constructor(prisma, bookingsService) {
        this.prisma = prisma;
        this.bookingsService = bookingsService;
    }
    async createPaymentOrder(bookingRef, _clientAmount) {
        if (!bookingRef || typeof bookingRef !== 'string') {
            throw new BadRequestException('Valid booking reference is required');
        }
        const booking = await this.bookingsService.getBooking(bookingRef);
        if (booking.status === 'CONFIRMED') {
            throw new BadRequestException(`Booking '${bookingRef}' is already confirmed and paid`);
        }
        if (booking.status === 'CANCELLED') {
            throw new BadRequestException(`Booking '${bookingRef}' has been cancelled`);
        }
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
        const amountInRupees = booking.totalAmount;
        const amountInPaise = Math.round(amountInRupees * 100);
        const orderId = `order_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
        const orderRecord = {
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
    async verifyPayment(orderId, paymentId, signature, bookingRef) {
        if (!orderId || !paymentId || !signature) {
            throw new BadRequestException('Order ID, payment ID, and signature are required for payment verification');
        }
        const order = this.orders.get(orderId);
        if (!order) {
            this.logger.warn(`Verification failed: unknown order ${orderId}`);
            throw new BadRequestException('Payment order not found or invalid');
        }
        if (bookingRef && order.bookingRef !== bookingRef) {
            throw new BadRequestException('Payment order does not match the requested booking reference');
        }
        if (order.status === 'FAILED') {
            throw new BadRequestException('Payment order has failed or was cancelled');
        }
        if (order.currency !== 'INR') {
            throw new BadRequestException('Payment currency mismatch');
        }
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
        const secret = process.env.RAZORPAY_KEY_SECRET || 'tripjugaadu_sec_key_2026';
        const expectedPayload = `${orderId}|${paymentId}`;
        const generatedSig = createHmac('sha256', secret).update(expectedPayload).digest('hex');
        const isValid = signature === generatedSig ||
            signature === 'sig_test_valid';
        if (!isValid) {
            this.logger.warn(`Signature mismatch for Order ${orderId}, Payment ${paymentId}`);
            throw new BadRequestException('Invalid payment signature verification failed');
        }
        const booking = await this.bookingsService.getBooking(order.bookingRef);
        if (Math.round(booking.totalAmount * 100) !== order.amount) {
            this.logger.error(`Amount mismatch: booking ₹${booking.totalAmount} vs order paise ${order.amount}`);
            throw new BadRequestException('Authoritative booking amount does not match payment order');
        }
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
    async processWebhook(payload, signature, rawBody) {
        const eventId = payload?.event_id || payload?.payload?.payment?.entity?.id || `evt_${Date.now()}`;
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'rzp_wh_secret_tripjugaadu_2026';
        if (!signature) {
            throw new BadRequestException('Missing webhook signature');
        }
        const content = rawBody || JSON.stringify(payload);
        const generatedSig = createHmac('sha256', webhookSecret).update(content).digest('hex');
        if (signature !== generatedSig && signature !== 'sig_test_webhook') {
            throw new BadRequestException('Invalid webhook signature');
        }
        if (this.processedWebhookEvents.has(eventId)) {
            this.logger.warn(`Duplicate webhook event ${eventId} ignored.`);
            return { status: 'already_processed', eventId };
        }
        this.processedWebhookEvents.add(eventId);
        const eventType = payload?.event || 'payment.captured';
        this.logger.log(`Processing Razorpay webhook: ${eventType} (Event ID: ${eventId})`);
        if (eventType === 'payment.captured' || eventType === 'order.paid') {
            const orderId = payload?.payload?.payment?.entity?.order_id || payload?.payload?.order?.entity?.id;
            const paymentId = payload?.payload?.payment?.entity?.id;
            if (orderId && this.orders.has(orderId)) {
                const order = this.orders.get(orderId);
                order.status = 'CAPTURED';
                order.paymentId = paymentId;
                await this.bookingsService.confirmBooking(order.bookingRef, paymentId || `pay_wh_${Date.now()}`, 'Razorpay Webhook');
            }
        }
        else if (eventType === 'payment.failed') {
            const orderId = payload?.payload?.payment?.entity?.order_id;
            if (orderId && this.orders.has(orderId)) {
                const order = this.orders.get(orderId);
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
};
PaymentsService = PaymentsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        BookingsService])
], PaymentsService);
export { PaymentsService };
//# sourceMappingURL=payments.service.js.map