'use client';

import Link from 'next/link';
import { BOOKING_ITEMS } from '@/lib/data';

export default function ConfirmationPage() {
  const bookingId = 'TJ-784219';

  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-2xl text-center">
        <div className="confirmation page-enter p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <div className="confirmation__check mx-auto w-16 h-16 rounded-full bg-[var(--accent-green)]/20 text-[var(--accent-green)] flex items-center justify-center text-3xl font-bold mb-6 border border-[var(--accent-green)]/40">
            ✓
          </div>

          <span className="badge mb-2">Payment Authorized</span>
          <h1 className="confirmation__title text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
            Booking Confirmed
          </h1>
          <p className="confirmation__subtitle text-[var(--text-secondary)] mt-2">
            Your Indian adventure is locked in. Official vouchers have been dispatched to your email.
          </p>

          <div className="confirmation__details mt-8 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-left">
            <div className="confirmation__meta flex justify-between items-center pb-4 border-b border-[var(--border-color)] text-sm flex-wrap gap-2">
              <span className="font-bold text-white uppercase">Rishikesh Expedition</span>
              <span className="label label--accent">12–15 Oct 2026 · 02 Travelers</span>
              <span className="font-mono text-xs text-[var(--color-accent)] font-semibold">ID: {bookingId}</span>
            </div>

            <div className="mt-4 space-y-3">
              {BOOKING_ITEMS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm py-1">
                  <div>
                    <span className="text-white font-medium block">{item.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{item.detail}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex justify-between items-center text-sm">
              <span className="text-[var(--text-secondary)]">Payment Status</span>
              <span className="label label--accent text-xs">PAID via Razorpay UPI</span>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="btn btn--primary btn--lg">
              Open Traveler Dashboard <span className="btn-arrow">→</span>
            </Link>
            <Link href="/" className="btn btn--secondary btn--lg">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
