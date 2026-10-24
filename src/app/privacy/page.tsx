import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-3xl">
        <div className="section__header reveal mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase text-[var(--color-accent)] mb-4 hover:underline">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="badge mb-2">Legal</span>
          <h1 className="section__title">Privacy Policy</h1>
          <p className="section__subtitle max-w-xl">
            How TripJugaadu collects, uses, and protects your personal information.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-6 text-sm text-[var(--text-secondary)]">
          <div>
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Information We Collect</h3>
            <p>We collect information you provide directly: name, email, phone number, payment details, and travel preferences. We also collect usage data including device information, IP address, and browsing behavior on the Platform.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">How We Use Your Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Process and manage your bookings and payments</li>
              <li>Send booking confirmations, vouchers, and trip updates via email/WhatsApp</li>
              <li>Personalize your travel recommendations and search results</li>
              <li>Improve platform performance and user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Data Sharing</h3>
            <p>We share your relevant booking information with verified operators solely for trip fulfillment. We do not sell personal data to third parties. Payment data is handled exclusively by Razorpay and never stored on our servers.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Data Security</h3>
            <p>All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We implement Zero-Trust Architecture principles and conduct regular security audits.</p>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="font-bold text-white text-base uppercase tracking-wider mb-2">Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal data at any time by contacting <strong className="text-white">privacy@tripjugaadu.com</strong>. You may also opt out of marketing communications via the unsubscribe link in any email.</p>
          </div>

          <p className="text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
            Last updated: October 2026. This privacy policy applies to all users of the TripJugaadu platform.
          </p>
        </div>
      </div>
    </div>
  );
}
