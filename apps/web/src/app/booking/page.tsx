'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BOOKING_ITEMS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import { ArrowRight, Lock, Check, AlertCircle, X, ShieldCheck } from 'lucide-react';

const VALID_PROMO_CODES: Record<string, number> = {
  'JUGAADU1500': 1500,
  'HIMALAYA10': 2000,
  'EARLYBIRD': 1000,
  'FIRST500': 500,
};

function BookingCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Booking item determination from query parameters or fallback
  const bookingType = searchParams?.get('type');
  const bookingId = searchParams?.get('id');
  const bookingDate = searchParams?.get('date') || '12–15 Oct 2026';
  const travelerCountParam = parseInt(searchParams?.get('travelers') || searchParams?.get('guests') || '2', 10);
  const timeSlot = searchParams?.get('time');

  let packageName = 'Rishikesh Adventure Package';
  let packageMeta = `${bookingDate} · ${travelerCountParam.toString().padStart(2, '0')} Travelers`;
  let itemsToDisplay = BOOKING_ITEMS;
  let computedSubtotal = 33896;

  if (bookingType === 'adventure' && bookingId) {
    const adv = ADVENTURES.find((a) => a.id.toLowerCase() === bookingId.toLowerCase());
    if (adv) {
      packageName = adv.name;
      packageMeta = `${adv.location} · ${bookingDate} ${timeSlot ? `· ${timeSlot}` : ''} · ${travelerCountParam} Travelers`;
      const numPrice = parseInt(adv.price.replace(/[^\d]/g, ''), 10) || 3999;
      computedSubtotal = numPrice * travelerCountParam;
      itemsToDisplay = [
        {
          name: adv.name,
          detail: `${adv.duration} · Certified Guide · ${bookingDate}`,
          price: `₹${(numPrice * travelerCountParam).toLocaleString()}`,
          image: adv.image,
        },
      ];
    }
  } else if (bookingType === 'stay' && bookingId) {
    const stay = STAYS.find((s) => s.id.toLowerCase() === bookingId.toLowerCase());
    if (stay) {
      packageName = stay.name;
      packageMeta = `${stay.location} · ${bookingDate} · ${travelerCountParam} Guests`;
      const numPrice = parseInt(stay.price.replace(/[^\d]/g, ''), 10) || 6499;
      computedSubtotal = numPrice * 3; // 3 nights default
      itemsToDisplay = [
        {
          name: stay.name,
          detail: `3 Nights · ${stay.amenities.slice(0, 3).join(', ')}`,
          price: `₹${computedSubtotal.toLocaleString()}`,
          image: stay.image,
        },
      ];
    }
  } else if (bookingType === 'experience' && bookingId) {
    const exp = EXPERIENCES.find((e) => e.id.toLowerCase() === bookingId.toLowerCase());
    if (exp) {
      packageName = exp.name;
      packageMeta = `${exp.location} · ${exp.duration} · ${travelerCountParam} Travelers`;
      const numPrice = 2499;
      computedSubtotal = numPrice * travelerCountParam;
      itemsToDisplay = [
        {
          name: exp.name,
          detail: `${exp.duration} · Local Expert Hosted`,
          price: `₹${computedSubtotal.toLocaleString()}`,
          image: exp.image,
        },
      ];
    }
  }

  const [name, setName] = useState('Amit Sharma');
  const [email, setEmail] = useState('amit@tripjugaadu.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [promoCode, setPromoCode] = useState('JUGAADU1500');
  const [promoApplied, setPromoApplied] = useState(true);
  const [appliedDiscount, setAppliedDiscount] = useState(1500);
  const [promoError, setPromoError] = useState('');
  const [promoMessage, setPromoMessage] = useState('Voucher JUGAADU1500 applied: Saved ₹1,500');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const subtotal = computedSubtotal;
  const fees = 799;
  const total = Math.max(0, subtotal + fees - (promoApplied ? appliedDiscount : 0));

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a voucher or promo code.');
      setPromoApplied(false);
      setAppliedDiscount(0);
      return;
    }

    try {
      // Attempt backend coupon validation
      const res = await fetch('/api/v1/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: subtotal }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.isValid) {
          setPromoApplied(true);
          setAppliedDiscount(data.data.discountAmount);
          setPromoMessage(data.data.message || `Code applied: Saved ₹${data.data.discountAmount.toLocaleString()}`);
          setPromoError('');
          return;
        }
      }
    } catch {
      // Backend unavailable, fallback to local coupons
    }

    if (VALID_PROMO_CODES[code]) {
      const disc = VALID_PROMO_CODES[code];
      setPromoApplied(true);
      setAppliedDiscount(disc);
      setPromoMessage(`Voucher '${code}' applied: Saved ₹${disc.toLocaleString()}`);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setAppliedDiscount(0);
      setPromoError(`Invalid or expired promo code '${code}'.`);
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setAppliedDiscount(0);
    setPromoCode('');
    setPromoMessage('');
    setPromoError('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    // Strict client-side validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setPaymentError('Please enter a valid traveler full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setPaymentError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      setPaymentError('Please enter a valid contact phone number (10–15 digits).');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create authoritative booking on server in PAYMENT_PENDING state
      const bookingPayload = {
        itemType: bookingType ? bookingType.toUpperCase() : 'ADVENTURE',
        itemId: bookingId || 'rafting',
        travelers: travelerCountParam,
        dates: bookingDate,
        timeSlot: timeSlot || undefined,
        travelerName: trimmedName,
        travelerEmail: trimmedEmail,
        travelerPhone: trimmedPhone,
        couponCode: promoApplied ? promoCode.trim() : undefined,
        packageName,
      };

      const bookingRes = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (!bookingRes.ok) {
        const errJson = await bookingRes.json().catch(() => null);
        throw new Error(errJson?.message || 'Failed to initiate booking reservation on server.');
      }

      const bookingData = await bookingRes.json();
      const booking = bookingData?.data;
      const authoritativeBookingRef = booking?.bookingRef;

      if (!authoritativeBookingRef) {
        throw new Error('Server did not return a valid booking reference.');
      }

      // Step 2: Create authoritative Razorpay order on server (server calculates amount)
      const orderRes = await fetch('/api/v1/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: authoritativeBookingRef,
        }),
      });

      if (!orderRes.ok) {
        const orderErr = await orderRes.json().catch(() => null);
        throw new Error(orderErr?.message || 'Failed to generate payment gateway order.');
      }

      const orderData = await orderRes.json();
      const order = orderData?.data;

      // Step 3: Razorpay checkout modal if SDK is available
      if (typeof window !== 'undefined' && typeof (window as any).Razorpay === 'function') {
        const rzp = new (window as any).Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'TripJugaadu Expeditions',
          description: packageName,
          order_id: order.orderId,
          prefill: {
            name: trimmedName,
            email: trimmedEmail,
            contact: trimmedPhone,
          },
          theme: { color: '#00AEEF' },
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch('/api/v1/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  bookingRef: authoritativeBookingRef,
                }),
              });

              if (verifyRes.ok) {
                const verifyData = await verifyRes.json();
                if (verifyData?.data?.status === 'CAPTURED') {
                  router.push(`/confirmation?ref=${authoritativeBookingRef}`);
                  return;
                }
              }
              const verifyErr = await verifyRes.json().catch(() => null);
              setPaymentError(verifyErr?.message || 'Payment signature verification failed. Please contact support.');
              setIsProcessing(false);
            } catch {
              setPaymentError('Connection error during payment verification. Please retry.');
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              setPaymentError('Payment window was closed. Your reservation remains pending.');
            },
          },
        });
        rzp.open();
        return;
      }

      // Step 4: Test/Development environment fallback with deterministic verification
      const verifyRes = await fetch('/api/v1/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.orderId,
          paymentId: `pay_test_${Date.now()}`,
          signature: 'sig_test_valid',
          bookingRef: authoritativeBookingRef,
        }),
      });

      if (verifyRes.ok) {
        const verifyData = await verifyRes.json();
        if (verifyData?.data?.status === 'CAPTURED') {
          router.push(`/confirmation?ref=${authoritativeBookingRef}`);
          return;
        }
      }

      const verifyErr = await verifyRes.json().catch(() => null);
      throw new Error(verifyErr?.message || 'Payment verification could not be confirmed.');
    } catch (err: any) {
      setPaymentError(err?.message || 'Payment processing encountered an error. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-5xl">
        <div className="section__header reveal mb-6">
          <span className="badge mb-2">Secure Reservation</span>
          <h1 className="section__title">Review & Checkout</h1>
        </div>

        {/* Breadcrumb Steps */}
        <div className="steps reveal max-w-2xl mx-auto mb-12">
          <div className="step step--completed">01 Select</div>
          <div className="step step--completed">02 Details</div>
          <div className="step step--active">03 Review</div>
          <div className="step">04 Payment</div>
          <div className="step">05 Confirm</div>
        </div>

        <div className="booking-summary reveal">
          {/* Main Left: Traveler Details Form & Item list */}
          <div className="space-y-8">
            {/* Items Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white">{packageName}</h3>
                  <span className="label text-xs">{packageMeta}</span>
                </div>
                <span className="badge">{itemsToDisplay.length} {itemsToDisplay.length === 1 ? 'Item' : 'Items'} Selected</span>
              </div>

              <div className="space-y-4">
                {itemsToDisplay.map((item, idx) => (
                  <div key={idx} className="booking-item">
                    <img className="booking-item__img" src={item.image} alt={item.name} />
                    <div className="booking-item__info">
                      <div className="booking-item__name text-white font-medium">{item.name}</div>
                      <div className="booking-item__detail text-xs text-[var(--text-secondary)]">{item.detail}</div>
                    </div>
                    <div className="booking-item__price font-bold text-[var(--color-accent)]">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traveler Information Form */}
            <form id="traveler-form" onSubmit={handlePayment} className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <h3 className="font-display text-xl uppercase tracking-wider text-white mb-6">Traveler Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="auth-form__group">
                  <label htmlFor="booking-name" className="auth-form__label">Full Legal Name *</label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    minLength={2}
                    className="auth-form__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="auth-form__group">
                  <label htmlFor="booking-email" className="auth-form__label">Email Address (for vouchers) *</label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    className="auth-form__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="auth-form__group">
                  <label htmlFor="booking-phone" className="auth-form__label">Mobile Phone (WhatsApp updates) *</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    pattern="[+]?[0-9\s]{10,15}"
                    title="Enter a valid phone number (10-15 digits)"
                    className="auth-form__input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="auth-form__group">
                  <label htmlFor="booking-promo" className="auth-form__label">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      id="booking-promo"
                      type="text"
                      className="auth-form__input uppercase"
                      value={promoCode}
                      placeholder="e.g. JUGAADU1500"
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        if (promoApplied) {
                          setPromoApplied(false);
                          setPromoError('');
                        }
                      }}
                    />
                    {promoApplied ? (
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="btn btn--secondary px-3 text-xs font-bold text-red-400 hover:text-red-300 inline-flex items-center gap-1"
                        title="Remove coupon"
                      >
                        <X size={13} /> Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="btn btn--secondary px-4 text-xs font-bold"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {promoError && (
                    <p className="text-xs mt-1 flex items-center gap-1 text-red-400">
                      <AlertCircle size={12} /> {promoError}
                    </p>
                  )}
                  {promoApplied && !promoError && (
                    <p className="text-xs mt-1 flex items-center gap-1 text-emerald-400">
                      <Check size={12} /> {promoMessage}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span id="payment-method-label" className="label block mb-3">Preferred Payment Method</span>
                <div
                  role="radiogroup"
                  aria-labelledby="payment-method-label"
                  className="grid grid-cols-3 gap-3"
                >
                  {[
                    { id: 'upi' as const, label: 'UPI / QR Code' },
                    { id: 'card' as const, label: 'Credit / Debit Card' },
                    { id: 'netbanking' as const, label: 'Net Banking' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-white'
                          : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]/50'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentError && (
                <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Sidebar: Cost Summary */}
          <div>
            <div className="booking-sidebar sticky top-28">
              <div className="booking-sidebar__card p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="label label--accent text-xs">Trip Jugaadu Guarantee</span>
                <h4 className="font-display text-4xl text-white mt-2 mb-1">₹{total.toLocaleString()}</h4>
                <p className="text-xs text-[var(--text-muted)] mb-6">Total inclusive of all GST & guide insurance</p>

                <div className="space-y-3 py-4 border-y border-[var(--border-color)] text-sm">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Platform & Permit Fee</span>
                    <span className="text-white font-medium">₹{fees.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[var(--accent-green)] font-medium">
                      <span>Voucher Discount</span>
                      <span>−₹{appliedDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[var(--border-color)]">
                    <span>Amount Payable</span>
                    <span className="text-[var(--color-accent)]">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="traveler-form"
                  disabled={isProcessing}
                  className={`btn btn--primary btn--lg btn--full mt-6 shadow-lg shadow-cyan-500/20 inline-flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isProcessing ? 'Processing Payment...' : 'Pay via Razorpay'} {!isProcessing && <ArrowRight size={16} />}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-[var(--status-success)]" /> 256-Bit SSL Encrypted & Verified
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center justify-center gap-1.5">
                    <Check size={12} className="text-[var(--status-success)]" /> Free cancellation up to 48 hours before trip start
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingCheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading checkout...</div>}>
      <BookingCheckoutContent />
    </Suspense>
  );
}
