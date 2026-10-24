'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { Locale, CurrencyCode, LOCALES, CURRENCIES } from '@/lib/i18n';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, currency, setCurrency, t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`nav ${isScrolled ? 'nav--glass' : 'nav--transparent'}`} id="main-nav">
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
          TRIP<span>JUGAADU</span>
        </Link>
        
        <div className="nav__links">
          <Link href="/explore" className="nav__link">{t('nav.explore')}</Link>
          <Link href="/adventures" className="nav__link">{t('nav.adventures')}</Link>
          <Link href="/stays" className="nav__link">{t('nav.stays')}</Link>
          <Link href="/experiences" className="nav__link">{t('nav.experiences')}</Link>
          <Link href="/trip-builder" className="nav__link">{t('nav.trips')}</Link>
        </div>
        
        <div className="nav__actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select currency"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <option key={code} value={code} style={{ background: '#0a101d', color: '#fff' }}>
                  {CURRENCIES[code].symbol} {code}
                </option>
              ))}
            </select>
          </div>

          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              aria-label="Select language"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {(Object.keys(LOCALES) as Locale[]).map((loc) => (
                <option key={loc} value={loc} style={{ background: '#0a101d', color: '#fff' }}>
                  {LOCALES[loc].flag} {LOCALES[loc].label}
                </option>
              ))}
            </select>
          </div>

          <Link href="/search" className="btn btn--ghost btn--sm" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </Link>

          <Link href="/login" className="btn btn--ghost btn--sm nav__login-desktop">
            {t('nav.login')}
          </Link>

          <Link href="/dashboard" className="btn btn--secondary btn--sm">
            {t('nav.dashboard')}
          </Link>

          <button 
            className={`nav__hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <div className={`nav__mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <Link href="/explore" className="nav__mobile-link">{t('nav.explore')}</Link>
        <Link href="/adventures" className="nav__mobile-link">{t('nav.adventures')}</Link>
        <Link href="/stays" className="nav__mobile-link">{t('nav.stays')}</Link>
        <Link href="/experiences" className="nav__mobile-link">{t('nav.experiences')}</Link>
        <Link href="/trip-builder" className="nav__mobile-link">{t('nav.trips')}</Link>
        <Link href="/dashboard" className="nav__mobile-link">{t('nav.dashboard')}</Link>
        <Link href="/login" className="nav__mobile-link">{t('nav.login')}</Link>
      </div>
    </nav>
  );
}
