'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Locale, CurrencyCode, LOCALES, CURRENCIES, TRANSLATIONS, convertAndFormatPrice } from '../lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  t: (key: string) => string;
  formatPrice: (amountInInr: number) => string;
  isOffline: boolean;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  currency: 'INR',
  setCurrency: () => {},
  t: (key: string) => key,
  formatPrice: (amount: number) => `₹${amount}`,
  isOffline: false,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    // Restore saved preferences
    const savedLocale = localStorage.getItem('tj_locale') as Locale;
    if (savedLocale && LOCALES[savedLocale]) {
      setLocaleState(savedLocale);
    }
    const savedCurrency = localStorage.getItem('tj_currency') as CurrencyCode;
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }

    // Offline / Online listeners for remote travel resilience
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('tj_locale', l);
  };

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('tj_currency', c);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[locale] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const formatPrice = (amountInInr: number): string => {
    return convertAndFormatPrice(amountInInr, currency);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, currency, setCurrency, t, formatPrice, isOffline }}>
      {isOffline && (
        <div style={{
          background: 'linear-gradient(90deg, #d97706, #b45309)',
          color: '#fff',
          padding: '6px 16px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 600,
          position: 'sticky',
          top: 0,
          zIndex: 99999,
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span className="inline-flex items-center gap-1.5"><AlertTriangle size={14} strokeWidth={2} /> OFFLINE EXPEDITION MODE ACTIVE</span>
          <span style={{ opacity: 0.85, fontWeight: 400 }}>• Remote Mountain Cache Enabled. Bookings will sync on reconnection.</span>
        </div>
      )}
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
