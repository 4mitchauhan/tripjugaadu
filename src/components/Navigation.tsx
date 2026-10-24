'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { Locale, CurrencyCode, LOCALES, CURRENCIES } from '@/lib/i18n';

import { Search, Compass, MountainSnow, Hotel, Sparkles, Navigation as NavIcon, User, Backpack } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, currency, setCurrency, t } = useLocale();
  const { tripCount } = useTrip();

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
                background: 'rgba(1, 6, 17, 0.75)',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
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
                background: 'rgba(1, 6, 17, 0.75)',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              }}
            >
              {(Object.keys(LOCALES) as Locale[]).map((loc) => (
                <option key={loc} value={loc} style={{ background: '#0a101d', color: '#fff' }}>
                  {LOCALES[loc].label}
                </option>
              ))}
            </select>
          </div>

          {/* Trip Builder Header Icon with Live Count Badge */}
          <Link
            href="/trip-builder"
            className="btn btn--ghost btn--sm relative flex items-center justify-center p-2"
            aria-label={`Your trip, ${tripCount} ${tripCount === 1 ? 'experience' : 'experiences'}`}
            title={`Your trip (${tripCount} ${tripCount === 1 ? 'experience' : 'experiences'})`}
          >
            <Backpack size={18} strokeWidth={1.8} className="text-[var(--color-accent)]" />
            {tripCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[#010611] text-[10px] font-bold rounded-full h-4.5 w-4.5 min-w-[18px] px-1 flex items-center justify-center shadow-md"
                style={{ lineHeight: 1 }}
              >
                {tripCount}
              </span>
            )}
          </Link>

          <Link href="/search" className="btn btn--ghost btn--sm" aria-label="Search">
            <Search size={16} strokeWidth={1.8} />
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
        <Link href="/explore" className="nav__mobile-link">
          <Compass size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.explore')}
        </Link>
        <Link href="/adventures" className="nav__mobile-link">
          <MountainSnow size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.adventures')}
        </Link>
        <Link href="/stays" className="nav__mobile-link">
          <Hotel size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.stays')}
        </Link>
        <Link href="/experiences" className="nav__mobile-link">
          <Sparkles size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.experiences')}
        </Link>
        <Link href="/trip-builder" className="nav__mobile-link flex items-center justify-between">
          <span className="flex items-center">
            <Backpack size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
            {t('nav.trips')}
          </span>
          {tripCount > 0 && (
            <span className="bg-[var(--color-accent)] text-[#010611] text-xs font-bold px-2 py-0.5 rounded-full">
              {tripCount}
            </span>
          )}
        </Link>
        <Link href="/dashboard" className="nav__mobile-link">
          <User size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.dashboard')}
        </Link>
        <Link href="/login" className="nav__mobile-link">
          <User size={16} strokeWidth={1.8} className="inline mr-2 text-[var(--color-accent)]" />
          {t('nav.login')}
        </Link>
      </div>
    </nav>
  );
}
