'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export default function Footer() {
  const { currency, locale } = useLocale();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">TRIP<span>JUGAADU</span></div>
            <p className="footer__tagline">
              Travel smarter. Explore deeper.<br/>
              India’s next-generation autonomous travel ecosystem and intelligent marketplace.
            </p>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94a3b8' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>Global Mesh: Active • Region: ap-south-1 (Mumbai Primary) • Currency: {currency} • Locale: {locale}</span>
            </div>
          </div>
          
          <div>
            <div className="footer__col-title">Explore</div>
            <Link href="/explore" className="footer__link">Destinations</Link>
            <Link href="/adventures" className="footer__link">Adventures</Link>
            <Link href="/stays" className="footer__link">Stays</Link>
            <Link href="/experiences" className="footer__link">Experiences</Link>
            <Link href="/trip-builder" className="footer__link">Trip Builder</Link>
            <Link href="/dashboard" className="footer__link">Traveler Dashboard</Link>
          </div>
          
          <div>
            <div className="footer__col-title">Platform & B2B</div>
            <Link href="/admin" className="footer__link" style={{ color: '#ffc107' }}>Admin Console</Link>
            <a href="http://localhost:4000/api/v1/finance/summary" target="_blank" rel="noreferrer" className="footer__link">Financial Ledger API</a>
            <a href="http://localhost:4000/api/v1/partner/catalog" target="_blank" rel="noreferrer" className="footer__link">Partner B2B API</a>
            <a href="http://localhost:4000/api/v1/health" target="_blank" rel="noreferrer" className="footer__link">Observability & Health</a>
            <a href="http://localhost:4000/api/v1/metrics" target="_blank" rel="noreferrer" className="footer__link">Platform Metrics</a>
          </div>
          
          <div>
            <div className="footer__col-title">Operators</div>
            <Link href="/provider/dashboard" className="footer__link">Operator Portal</Link>
            <Link href="/provider/register" className="footer__link">Join as Operator</Link>
            <Link href="/provider/listings" className="footer__link">Manage Inventory</Link>
            <a href="http://localhost:4000/api/v1/finance/commissions" target="_blank" rel="noreferrer" className="footer__link">Commission Tiers</a>
          </div>
          
          <div>
            <div className="footer__col-title">Support & Trust</div>
            <Link href="/help" className="footer__link">Help Center</Link>
            <Link href="/safety" className="footer__link">Safety & Protocols</Link>
            <Link href="/cancellation" className="footer__link">Cancellation Policy</Link>
            <Link href="/terms" className="footer__link">Marketplace Terms</Link>
            <Link href="/privacy" className="footer__link">Privacy Policy</Link>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 TripJugaadu Inc. All rights reserved. Zero-Trust Architecture.</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <a href="#" className="footer__link" style={{ padding: 0 }}>Instagram</a>
            <a href="#" className="footer__link" style={{ padding: 0 }}>Twitter</a>
            <a href="#" className="footer__link" style={{ padding: 0 }}>YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
