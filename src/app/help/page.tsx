import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-3xl">
        <div className="section__header reveal mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase text-[var(--color-accent)] mb-4 hover:underline">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="badge mb-2">Support & Assistance</span>
          <h1 className="section__title">Help Center</h1>
          <p className="section__subtitle max-w-xl">
            Need help planning your trip, managing a booking, or resolving a payment issue? We&apos;re here for you.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <h3 className="font-bold text-white text-lg uppercase tracking-wider mb-4">Contact Our Team</h3>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--color-accent)]" />
                <span>Emergency Helpline: <strong className="text-white">+91 1800-TRIP-HELP</strong> (24×7)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--color-accent)]" />
                <span>Email: <strong className="text-white">support@tripjugaadu.com</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={16} className="text-[var(--color-accent)]" />
                <span>WhatsApp: <strong className="text-white">+91 98765 00000</strong> (9 AM – 9 PM IST)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <h3 className="font-bold text-white text-lg uppercase tracking-wider mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              {[
                { q: 'How do I cancel a booking?', a: 'Navigate to your Dashboard → My Trips → select the booking and click "Cancel". Free cancellation is available up to 48 hours before the trip start date.' },
                { q: 'When will I receive my refund?', a: 'Refunds are processed within 5–7 business days to your original payment method after a confirmed cancellation.' },
                { q: 'Is my payment secure?', a: 'All transactions are processed through Razorpay with 256-bit SSL encryption and PCI DSS Level 1 compliance.' },
                { q: 'How do I become a verified operator?', a: 'Visit the Operator Portal, submit your KYC documents (PAN, Tourism Board License), and our team will review within 48 hours.' },
              ].map((faq, i) => (
                <div key={i} className="pb-3 border-b border-[var(--border-color)] last:border-b-0">
                  <h4 className="font-semibold text-white mb-1">{faq.q}</h4>
                  <p className="text-[var(--text-muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
