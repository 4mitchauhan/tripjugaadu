import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-3xl">
        <div className="section__header reveal mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase text-[var(--color-accent)] mb-4 hover:underline">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="badge mb-2">Legal</span>
          <h1 className="section__title">Marketplace Terms of Service</h1>
          <p className="section__subtitle max-w-xl">
            Terms and conditions governing your use of the TripJugaadu platform.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-6 text-sm text-[var(--text-secondary)]">
          <div>
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">1. Acceptance of Terms</h3>
            <p>By accessing or using TripJugaadu (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the Platform.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">2. Platform Role</h3>
            <p>TripJugaadu operates as a marketplace connecting travelers with verified adventure operators, accommodation providers, and experience curators. TripJugaadu is not the direct provider of travel services and acts as an intermediary.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">3. User Accounts</h3>
            <p>Users must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">4. Booking & Payments</h3>
            <p>All payments are processed through Razorpay with industry-standard encryption. Pricing displayed is inclusive of applicable GST. Refunds follow the Cancellation Policy published on the Platform.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">5. Liability Limitation</h3>
            <p>TripJugaadu shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of the Platform or services booked through it, to the maximum extent permitted by applicable law.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">6. Governing Law</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
          </div>

          <p className="text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
            Last updated: October 2026. TripJugaadu Inc. reserves the right to modify these terms at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
