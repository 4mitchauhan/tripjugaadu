'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOOKING_ITEMS } from '@/lib/data';

export default function BookingCheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState('Amit Sharma');
  const [email, setEmail] = useState('amit@tripjugaadu.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [promoCode, setPromoCode] = useState('JUGAADU1500');
  const [promoApplied, setPromoApplied] = useState(true);

  const subtotal = 33896;
  const fees = 799;
  const discount = promoApplied ? -1500 : 0;
  const total = subtotal + fees + discount;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/confirmation');
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
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white">Rishikesh Adventure Package</h3>
                  <span className="label text-xs">12–15 Oct 2026 · 02 Travelers</span>
                </div>
                <span className="badge">3 Items Selected</span>
              </div>

              <div className="space-y-4">
                {BOOKING_ITEMS.map((item, idx) => (
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
            <form onSubmit={handlePayment} className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <h3 className="font-display text-xl uppercase tracking-wider text-white mb-6">Traveler Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="auth-form__group">
                  <label className="auth-form__label">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    className="auth-form__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="auth-form__group">
                  <label className="auth-form__label">Email Address (for vouchers)</label>
                  <input
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
                  <label className="auth-form__label">Mobile Phone (WhatsApp updates)</label>
                  <input
                    type="tel"
                    required
                    className="auth-form__input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="auth-form__group">
                  <label className="auth-form__label">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="auth-form__input uppercase"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setPromoApplied(true)}
                      className="btn btn--secondary px-4 text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span className="label block mb-3">Preferred Payment Method</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-center text-xs font-bold text-white cursor-pointer">
                    UPI / QR Code
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-center text-xs text-[var(--text-secondary)] cursor-pointer">
                    Credit / Debit Card
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-center text-xs text-[var(--text-secondary)] cursor-pointer">
                    Net Banking
                  </div>
                </div>
              </div>
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
                      <span>Voucher Discount (JUGAADU1500)</span>
                      <span>−₹{Math.abs(discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[var(--border-color)]">
                    <span>Amount Payable</span>
                    <span className="text-[var(--color-accent)]">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="btn btn--primary btn--lg btn--full mt-6 shadow-lg shadow-cyan-500/20"
                >
                  Pay via Razorpay <span className="btn-arrow">→</span>
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
                    🔒 256-Bit SSL Encrypted & Verified
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Free cancellation up to 48 hours before trip start
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
