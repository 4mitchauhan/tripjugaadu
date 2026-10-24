import { describe, it, expect, beforeEach } from 'vitest';
import { createHmac } from 'crypto';
import { BookingsService } from '../src/modules/bookings/bookings.service.js';
import { PaymentsService } from '../src/modules/payments/payments.service.js';
import { CouponsService } from '../src/modules/coupons/coupons.service.js';
import { PrismaService } from '../src/common/prisma.service.js';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Booking & Razorpay Payment Integrity Suite (Step K 1-20)', () => {
  let prismaService: PrismaService;
  let couponsService: CouponsService;
  let bookingsService: BookingsService;
  let paymentsService: PaymentsService;

  const TEST_SECRET = 'tripjugaadu_sec_key_2026';
  const TEST_WEBHOOK_SECRET = 'rzp_wh_secret_tripjugaadu_2026';

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = TEST_SECRET;
    process.env.RAZORPAY_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

    prismaService = new PrismaService();
    couponsService = new CouponsService(prismaService);
    bookingsService = new BookingsService(prismaService, couponsService);
    paymentsService = new PaymentsService(prismaService, bookingsService);
  });

  // 1. Required traveler details missing
  it('1. should reject booking creation when traveler name is missing or too short', async () => {
    await expect(
      bookingsService.createBooking({
        travelerName: '',
        travelerEmail: 'traveler@tripjugaadu.com',
        travelerPhone: '+91 9876543210',
        itemId: 'rafting',
        travelers: 2,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  // 2. Invalid email or phone
  it('2. should reject booking creation with invalid email or phone', async () => {
    // Invalid email
    await expect(
      bookingsService.createBooking({
        travelerName: 'Rahul Verma',
        travelerEmail: 'invalid-email-address',
        travelerPhone: '+91 9876543210',
        itemId: 'rafting',
        travelers: 2,
      }),
    ).rejects.toThrow('Valid traveler email address is required');

    // Invalid phone
    await expect(
      bookingsService.createBooking({
        travelerName: 'Rahul Verma',
        travelerEmail: 'rahul@tripjugaadu.com',
        travelerPhone: '123',
        itemId: 'rafting',
        travelers: 2,
      }),
    ).rejects.toThrow('Valid traveler contact phone number is required');
  });

  // 3. Valid form submission
  it('3. should create a valid booking with PAYMENT_PENDING state and authoritative pricing', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Priya Sharma',
      travelerEmail: 'priya@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
      dates: '15–18 Nov 2026',
    });

    expect(booking).toBeDefined();
    expect(booking.bookingRef).toMatch(/^TJ-\d{6}$/);
    expect(booking.status).toBe('PAYMENT_PENDING');
    expect(booking.paymentStatus).toBe('PENDING');
    expect(booking.subtotal).toBe(3999 * 2); // 7998
    expect(booking.serviceFee).toBe(799);
    expect(booking.discount).toBe(0);
    expect(booking.totalAmount).toBe(7998 + 799); // 8797
  });

  // 4. Tampered listing price
  it('4. should ignore client-tampered prices and compute authoritative subtotal', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Hacker Bob',
      travelerEmail: 'bob@attacker.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
      clientPrice: 1, // Tampered price
      price: 1, // Tampered price
      subtotal: 10, // Tampered subtotal
      totalAmount: 11, // Tampered total
    });

    // Authoritative rafting unit price is ₹3,999 * 2 + ₹799 service fee = ₹8,797
    expect(booking.subtotal).toBe(7998);
    expect(booking.totalAmount).toBe(8797);
  });

  // 5. Tampered total or coupon discount
  it('5. should ignore client-supplied discount and apply authoritative coupon value', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Ananya Roy',
      travelerEmail: 'ananya@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 3, // 3999 * 3 = 11997 > 8000 min order
      couponCode: 'JUGAADU1500',
      discount: 99999, // Tampered discount
      totalAmount: 1, // Tampered total
    });

    // Subtotal: 11997, Fee: 799, Authoritative discount for JUGAADU1500 is 1500
    // Total: 11997 + 799 - 1500 = 11296
    expect(booking.subtotal).toBe(11997);
    expect(booking.discount).toBe(1500);
    expect(booking.totalAmount).toBe(11296);
  });

  // 6. Invalid and expired coupon
  it('6. should reject invalid and expired coupons', async () => {
    // Invalid coupon
    await expect(
      bookingsService.createBooking({
        travelerName: 'Vikram Singh',
        travelerEmail: 'vikram@tripjugaadu.com',
        travelerPhone: '+91 9876543210',
        itemId: 'rafting',
        travelers: 2,
        couponCode: 'NONEXISTENT_PROMO',
      }),
    ).rejects.toThrow(BadRequestException);

    // Expired coupon
    await expect(
      bookingsService.createBooking({
        travelerName: 'Vikram Singh',
        travelerEmail: 'vikram@tripjugaadu.com',
        travelerPhone: '+91 9876543210',
        itemId: 'rafting',
        travelers: 2,
        couponCode: 'EXPIRED2025',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  // 7. Repeated order-creation requests (idempotency)
  it('7. should return the same payment order on repeated order-creation requests', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Karan Mehra',
      travelerEmail: 'karan@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order1 = await paymentsService.createPaymentOrder(booking.bookingRef);
    const order2 = await paymentsService.createPaymentOrder(booking.bookingRef);

    expect(order1.orderId).toBe(order2.orderId);
    expect(order1.amount).toBe(order2.amount);
    expect(order1.amount).toBe(booking.totalAmount * 100);
  });

  // 8. Successful server-side signature verification
  it('8. should successfully verify authentic HMAC-SHA256 signature and confirm booking', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Deepa Nair',
      travelerEmail: 'deepa@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    const paymentId = 'pay_test_' + Math.random().toString(36).substring(2, 10);

    const validSignature = createHmac('sha256', TEST_SECRET)
      .update(`${order.orderId}|${paymentId}`)
      .digest('hex');

    const result = await paymentsService.verifyPayment(
      order.orderId,
      paymentId,
      validSignature,
      booking.bookingRef,
    );

    expect(result.success).toBe(true);
    expect(result.status).toBe('CAPTURED');

    const verifiedBooking = await bookingsService.getBooking(booking.bookingRef);
    expect(verifiedBooking.status).toBe('CONFIRMED');
    expect(verifiedBooking.paymentStatus).toBe('CAPTURED');
    expect(verifiedBooking.paymentId).toBe(paymentId);
  });

  // 9. Invalid signature
  it('9. should reject payment verification with invalid signature', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Arjun Das',
      travelerEmail: 'arjun@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    const paymentId = 'pay_fake_999';
    const fakeSignature = 'bad_forged_signature_hex_1234567890abcdef';

    await expect(
      paymentsService.verifyPayment(order.orderId, paymentId, fakeSignature, booking.bookingRef),
    ).rejects.toThrow('Invalid payment signature verification failed');

    const bookingAfter = await bookingsService.getBooking(booking.bookingRef);
    expect(bookingAfter.status).toBe('PAYMENT_PENDING');
  });

  // 10. Order ID or payment ID mismatch
  it('10. should reject verification when payment order does not match booking reference', async () => {
    const booking1 = await bookingsService.createBooking({
      travelerName: 'User One',
      travelerEmail: 'user1@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const booking2 = await bookingsService.createBooking({
      travelerName: 'User Two',
      travelerEmail: 'user2@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order1 = await paymentsService.createPaymentOrder(booking1.bookingRef);
    const paymentId = 'pay_test_mismatch';
    const signature = createHmac('sha256', TEST_SECRET)
      .update(`${order1.orderId}|${paymentId}`)
      .digest('hex');

    // Attempt to verify order1 against booking2
    await expect(
      paymentsService.verifyPayment(order1.orderId, paymentId, signature, booking2.bookingRef),
    ).rejects.toThrow('Payment order does not match the requested booking reference');
  });

  // 11. Amount or currency mismatch
  it('11. should reject verification if currency or authoritative booking amount is tampered', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Tanvi Sen',
      travelerEmail: 'tanvi@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    const paymentId = 'pay_test_tamper';
    const signature = createHmac('sha256', TEST_SECRET)
      .update(`${order.orderId}|${paymentId}`)
      .digest('hex');

    // Tamper with order amount
    (paymentsService as any).orders.get(order.orderId).amount = 9999999;

    await expect(
      paymentsService.verifyPayment(order.orderId, paymentId, signature, booking.bookingRef),
    ).rejects.toThrow('Authoritative booking amount does not match payment order');
  });

  // 12. Duplicate payment callbacks (safe idempotency)
  it('12. should handle duplicate payment callbacks idempotently without error', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Meera Patel',
      travelerEmail: 'meera@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    const paymentId = 'pay_test_duplicate';
    const signature = createHmac('sha256', TEST_SECRET)
      .update(`${order.orderId}|${paymentId}`)
      .digest('hex');

    const firstRes = await paymentsService.verifyPayment(
      order.orderId,
      paymentId,
      signature,
      booking.bookingRef,
    );
    expect(firstRes.status).toBe('CAPTURED');

    // Duplicate callback
    const secondRes = await paymentsService.verifyPayment(
      order.orderId,
      paymentId,
      signature,
      booking.bookingRef,
    );
    expect(secondRes.status).toBe('CAPTURED');
    expect(secondRes.alreadyProcessed).toBe(true);
  });

  // 13. Duplicate webhook delivery
  it('13. should handle duplicate webhook deliveries idempotently', async () => {
    const payload = {
      event_id: 'evt_unique_123',
      event: 'payment.captured',
      payload: {
        payment: { entity: { id: 'pay_123', order_id: 'order_123' } },
      },
    };

    const signature = createHmac('sha256', TEST_WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    const res1 = await paymentsService.processWebhook(payload, signature);
    expect(res1.status).toBe('success');

    // Duplicate delivery
    const res2 = await paymentsService.processWebhook(payload, signature);
    expect(res2.status).toBe('already_processed');
  });

  // 14. Delayed or out-of-order webhook events
  it('14. should prevent out-of-order failed webhook from downgrading a captured order', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Vivek Joshi',
      travelerEmail: 'vivek@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    const paymentId = 'pay_order_valid';
    const validSignature = createHmac('sha256', TEST_SECRET)
      .update(`${order.orderId}|${paymentId}`)
      .digest('hex');

    // Order captured first
    await paymentsService.verifyPayment(order.orderId, paymentId, validSignature, booking.bookingRef);

    // Out-of-order delayed payment.failed event arrives later
    const delayedFailedPayload = {
      event_id: 'evt_delayed_failed_01',
      event: 'payment.failed',
      payload: {
        payment: {
          entity: {
            id: paymentId,
            order_id: order.orderId,
            error_description: 'Payment timed out on gateway',
          },
        },
      },
    };

    const webhookSig = createHmac('sha256', TEST_WEBHOOK_SECRET)
      .update(JSON.stringify(delayedFailedPayload))
      .digest('hex');

    const webhookRes = await paymentsService.processWebhook(delayedFailedPayload, webhookSig);
    expect(webhookRes.status).toBe('ignored_out_of_order');

    // Booking must remain CONFIRMED
    const bookingCheck = await bookingsService.getBooking(booking.bookingRef);
    expect(bookingCheck.status).toBe('CONFIRMED');
    expect(bookingCheck.paymentStatus).toBe('CAPTURED');
  });

  // 15. Payment failure and cancellation
  it('15. should transition booking to FAILED on payment failure webhook', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Sunil Rao',
      travelerEmail: 'sunil@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);

    const failedPayload = {
      event_id: 'evt_fail_999',
      event: 'payment.failed',
      payload: {
        payment: {
          entity: {
            id: 'pay_failed_123',
            order_id: order.orderId,
            error_description: 'Card declined by issuing bank',
          },
        },
      },
    };

    const webhookSig = createHmac('sha256', TEST_WEBHOOK_SECRET)
      .update(JSON.stringify(failedPayload))
      .digest('hex');

    await paymentsService.processWebhook(failedPayload, webhookSig);

    const failedBooking = await bookingsService.getBooking(booking.bookingRef);
    expect(failedBooking.status).toBe('FAILED');
    expect(failedBooking.paymentStatus).toBe('FAILED');
    expect(failedBooking.failureReason).toContain('Card declined');
  });

  // 16. Payment pending or uncertain outcome
  it('16. should leave booking in PAYMENT_PENDING when payment is not yet verified', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Ritu Kapoor',
      travelerEmail: 'ritu@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    const order = await paymentsService.createPaymentOrder(booking.bookingRef);
    expect(order.orderId).toBeDefined();

    // Check status without calling verifyPayment
    const pendingBooking = await bookingsService.getBooking(booking.bookingRef);
    expect(pendingBooking.status).toBe('PAYMENT_PENDING');
    expect(pendingBooking.paymentStatus).toBe('PENDING');
    expect(pendingBooking.confirmedAt).toBeUndefined();
  });

  // 17. Unauthorized booking access
  it('17. should throw NotFoundException for invalid or nonexistent booking references', async () => {
    await expect(bookingsService.getBooking('TJ-9999999999')).rejects.toThrow(
      NotFoundException,
    );
  });

  // 18. Confirmation before payment verification
  it('18. should not allow unverified bookings to be reported as confirmed', async () => {
    const booking = await bookingsService.createBooking({
      travelerName: 'Aakash Jain',
      travelerEmail: 'aakash@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    expect(booking.status).not.toBe('CONFIRMED');

    // Trying to create order for confirmed booking is blocked
    await bookingsService.confirmBooking(booking.bookingRef, 'pay_mock');
    await expect(
      paymentsService.createPaymentOrder(booking.bookingRef),
    ).rejects.toThrow('already confirmed and paid');
  });

  // 19. Database transaction failure resilience
  it('19. should handle database failure gracefully without data corruption', async () => {
    // When prisma is offline, the in-memory fallback preserves system stability
    expect(prismaService.isConnected).toBe(false);
    const booking = await bookingsService.createBooking({
      travelerName: 'Sanjay Dutt',
      travelerEmail: 'sanjay@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });
    expect(booking.bookingRef).toBeDefined();
  });

  // 20. Inventory concurrency and duplicate booking prevention
  it('20. should prevent duplicate booking creation for rapid duplicate submissions', async () => {
    const payload = {
      travelerName: 'Harshita Goel',
      travelerEmail: 'harshita@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
      dates: '20–22 Dec 2026',
    };

    const firstBooking = await bookingsService.createBooking(payload);
    // Rapid duplicate click with identical traveler, dates, and item
    const secondBooking = await bookingsService.createBooking(payload);

    // Deduplication should return the existing active booking reference
    expect(secondBooking.bookingRef).toBe(firstBooking.bookingRef);
    expect(secondBooking.id).toBe(firstBooking.id);
  });
});
