'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, ArrowRight, Compass, AlertCircle, Clock, RotateCcw } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams?.get('ref');

  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingRef) {
      setLoading(false);
      setError('No reservation reference provided in URL.');
      return;
    }

    let isMounted = true;

    async function fetchBooking() {
      try {
        const res = await fetch(`/api/v1/bookings/${encodeURIComponent(bookingRef!)}`);
        if (!res.ok) {
          if (isMounted) {
            setError(`Reservation matching '${bookingRef}' was not found on the platform.`);
            setLoading(false);
          }
          return;
        }

        const json = await res.json();
        if (isMounted) {
          setBooking(json?.data || null);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError('Could not verify reservation details. Please check your network connection.');
          setLoading(false);
        }
      }
    }

    fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [bookingRef]);

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container max-w-2xl text-center">
          <div className="confirmation page-enter p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Verifying Authoritative Booking...</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">Connecting to zero-trust payment ledger</p>
          </div>
        </div>
      </div>
    );
  }

  // State 1: Invalid, Missing, or Not-Found Booking
  if (error || !booking) {
    return (
      <div className="pt-24 pb-20">
        <div className="container max-w-2xl text-center">
          <div className="confirmation page-enter p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-red-500/30">
            <div className="confirmation__check mx-auto w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-6 border border-red-500/30">
              <AlertCircle size={32} strokeWidth={2} />
            </div>

            <span className="badge mb-2 bg-red-500/20 text-red-400">Reservation Unverified</span>
            <h1 className="confirmation__title text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
              Booking Not Found
            </h1>
            <p className="confirmation__subtitle text-[var(--text-secondary)] mt-2">
              {error || 'No active or confirmed booking could be verified for this session.'}
            </p>

            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <Link href="/explore" className="btn btn--primary btn--lg inline-flex items-center gap-2">
                Explore Available Trips <ArrowRight size={16} />
              </Link>
              <Link href="/dashboard" className="btn btn--secondary btn--lg inline-flex items-center gap-1.5">
                <Compass size={14} /> Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Booking Exists but Payment is Pending / Not Captured
  if (booking.status !== 'CONFIRMED' || booking.paymentStatus !== 'CAPTURED') {
    return (
      <div className="pt-24 pb-20">
        <div className="container max-w-2xl text-center">
          <div className="confirmation page-enter p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-amber-500/30">
            <div className="confirmation__check mx-auto w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
              <Clock size={32} strokeWidth={2} />
            </div>

            <span className="badge mb-2 bg-amber-500/20 text-amber-400">Payment Pending Verification</span>
            <h1 className="confirmation__title text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
              Payment Incomplete
            </h1>
            <p className="confirmation__subtitle text-[var(--text-secondary)] mt-2">
              Reservation draft is held. Authoritative payment confirmation has not been received from Razorpay.
            </p>

            <div className="confirmation__details mt-8 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-left">
              <div className="confirmation__meta flex justify-between items-center pb-4 border-b border-[var(--border-color)] text-sm flex-wrap gap-2">
                <span className="font-bold text-white uppercase">{booking.destination || 'Expedition Booking'}</span>
                <span className="label label--accent">{booking.dates} · {booking.guestCount} Travelers</span>
                <span className="font-mono text-xs text-amber-400 font-semibold">REF: {booking.bookingRef}</span>
              </div>

              <div className="mt-4 space-y-3">
                {(booking.items || []).map((item: any, idx: number) => (
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
                <span className="badge bg-amber-500/20 text-amber-400 text-xs">AWAITING CAPTURE</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <Link href={`/booking?ref=${booking.bookingRef}`} className="btn btn--primary btn--lg inline-flex items-center gap-2">
                Complete Payment Now <RotateCcw size={16} />
              </Link>
              <Link href="/dashboard" className="btn btn--secondary btn--lg inline-flex items-center gap-1.5">
                <Compass size={14} /> Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Fully Authoritative Confirmed Booking
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-2xl text-center">
        <div className="confirmation page-enter p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <div className="confirmation__check mx-auto w-16 h-16 rounded-full bg-[var(--accent-green)]/20 text-[var(--accent-green)] flex items-center justify-center mb-6 border border-[var(--accent-green)]/40">
            <Check size={32} strokeWidth={2.5} />
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
              <span className="font-bold text-white uppercase">{booking.destination || 'Rishikesh Expedition'}</span>
              <span className="label label--accent">{booking.dates} · {booking.guestCount} Travelers</span>
              <span className="font-mono text-xs text-[var(--color-accent)] font-semibold">ID: {booking.bookingRef}</span>
            </div>

            <div className="mt-4 space-y-3">
              {(booking.items || []).map((item: any, idx: number) => (
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
              <span className="label label--accent text-xs">
                PAID via {booking.paymentMethod || 'Razorpay UPI'}
              </span>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="btn btn--primary btn--lg inline-flex items-center gap-2">
              Open Traveler Dashboard <ArrowRight size={16} />
            </Link>
            <Link href="/" className="btn btn--secondary btn--lg inline-flex items-center gap-1.5">
              <Compass size={14} /> Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
