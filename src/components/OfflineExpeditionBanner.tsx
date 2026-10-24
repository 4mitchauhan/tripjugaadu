'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MountainSnow, Wifi } from 'lucide-react';

export default function OfflineExpeditionBanner() {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Register Service Worker for Expedition Mode
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[TripJugaadu SW] Expedition Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[TripJugaadu SW] Registration note:', err);
        });
    }

    // Set initial network status
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setShowSyncSuccess(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowSyncSuccess(true);
      const timer = setTimeout(() => setShowSyncSuccess(false), 5000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showSyncSuccess) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 max-w-md animate-fade-in pointer-events-auto"
    >
      {isOffline && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#010611]/95 border border-amber-500/60 rounded-2xl shadow-2xl backdrop-blur-md text-amber-200">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <div className="text-xs">
            <p className="font-bold text-white tracking-wide flex items-center gap-1.5">
              <MountainSnow size={14} className="text-amber-400" /> Offline Expedition Mode
            </p>
            <p className="text-[11px] text-amber-300/80">No cell service. Using cached trails & SOS emergency guides.</p>
          </div>
          <Link
            href="/offline"
            className="ml-auto shrink-0 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors"
          >
            Open Hub
          </Link>
        </div>
      )}

      {showSyncSuccess && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#010611]/95 border border-emerald-500/60 rounded-2xl shadow-2xl backdrop-blur-md text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <div className="text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Wifi size={14} className="text-emerald-400" /> Satellite Connection Restored
            </p>
            <p className="text-[11px] text-emerald-300/80">Expedition data synced with TripJugaadu cloud.</p>
          </div>
        </div>
      )}
    </aside>
  );
}
