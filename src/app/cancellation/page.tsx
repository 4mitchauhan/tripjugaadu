import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CancellationPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-3xl">
        <div className="section__header reveal mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase text-[var(--color-accent)] mb-4 hover:underline">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="badge mb-2">Booking Policies</span>
          <h1 className="section__title">Cancellation Policy</h1>
          <p className="section__subtitle max-w-xl">
            Transparent cancellation and refund policies for all TripJugaadu bookings.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-6 text-sm text-[var(--text-secondary)]">
          <div>
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Free Cancellation Window</h3>
            <p>All bookings made on TripJugaadu are eligible for <strong className="text-white">free cancellation up to 48 hours</strong> before the scheduled trip start date/time. A full refund will be processed to your original payment method.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Late Cancellation (24–48 Hours Before)</h3>
            <p>Cancellations made between 24 and 48 hours before the trip start time will incur a <strong className="text-white">25% cancellation fee</strong>. The remaining 75% will be refunded.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Last-Minute Cancellation (Under 24 Hours)</h3>
            <p>Cancellations within 24 hours of the trip start time are <strong className="text-white">non-refundable</strong>. However, you may reschedule to another available date at no additional cost, subject to operator availability.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Refund Timeline</h3>
            <p>Approved refunds are processed within <strong className="text-white">5–7 business days</strong> via the original payment method (UPI, card, or net banking). For any refund queries, contact <strong className="text-white">support@tripjugaadu.com</strong>.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Force Majeure & Weather Cancellations</h3>
            <p>If an activity is cancelled by the operator due to weather, safety concerns, or force majeure events, you will receive a <strong className="text-white">full refund or the option to reschedule</strong> at no extra charge.</p>
          </div>

          <p className="text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
            Last updated: October 2026. This policy applies to all bookings made through the TripJugaadu platform.
          </p>
        </div>
      </div>
    </div>
  );
}
