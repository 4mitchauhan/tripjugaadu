'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  EMERGENCY_CONTACTS,
  AMS_SAFETY_PROTOCOLS,
  getOfflineItineraries,
  getOfflineChecklist,
  toggleChecklistItem,
  OfflineItinerary,
  OfflineChecklistItem,
} from '@/lib/offline-storage';
import {
  MountainSnow,
  Wifi,
  ArrowLeft,
  Compass,
  AlertTriangle,
  HeartPulse,
  Backpack,
  MapPin,
  Clock,
  TentTree,
  Droplets,
  Phone,
  Check
} from 'lucide-react';

export default function OfflineExpeditionPage() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [itineraries, setItineraries] = useState<OfflineItinerary[]>([]);
  const [checklist, setChecklist] = useState<OfflineChecklistItem[]>([]);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'emergency' | 'ams' | 'checklist'>('itinerary');
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>('');

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const loadedItineraries = getOfflineItineraries();
    setItineraries(loadedItineraries);
    if (loadedItineraries.length > 0) {
      setSelectedItineraryId(loadedItineraries[0].id);
    }
    setChecklist(getOfflineChecklist());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggleChecklist = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklist(updated);
  };

  const currentItinerary = itineraries.find((i) => i.id === selectedItineraryId) || itineraries[0];

  return (
    <div className="min-h-screen bg-[#010611] text-[#F4F7FA] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Expedition Status Banner */}
        <div className={`p-6 rounded-2xl border backdrop-blur-md transition-all ${
          !isOnline 
            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200' 
            : 'bg-[#071B3A]/60 border-cyan-500/30 text-cyan-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  !isOnline ? 'bg-amber-400' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${
                  !isOnline ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></span>
              </span>
              <div>
                <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
                  {!isOnline ? (
                    <>
                      <MountainSnow size={22} className="text-amber-400 shrink-0" />
                      EXPEDITION MODE ACTIVE (OFFLINE)
                    </>
                  ) : (
                    <>
                      <Wifi size={22} className="text-emerald-400 shrink-0" />
                      EXPEDITION MODE SYNCHRONIZED
                    </>
                  )}
                </h1>
                <p className="text-xs opacity-80 mt-0.5">
                  {!isOnline 
                    ? 'No cellular reception detected. Serving cached trail routes, emergency SDRF protocols & medical guides.' 
                    : 'All trail data and emergency protocols are safely cached locally for off-grid Himalayan travel.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/trip-builder"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft size={13} /> Back to Planner
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'itinerary'
                ? 'bg-[#00AEEF] text-black shadow-lg shadow-[#00AEEF]/20'
                : 'bg-[#071B3A]/40 text-gray-300 hover:bg-[#071B3A]'
            }`}
          >
            <Compass size={16} /> Cached Itineraries ({itineraries.length})
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'emergency'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                : 'bg-[#071B3A]/40 text-gray-300 hover:bg-[#071B3A]'
            }`}
          >
            <AlertTriangle size={16} /> Emergency SOS & SDRF
          </button>
          <button
            onClick={() => setActiveTab('ams')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'ams'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-[#071B3A]/40 text-gray-300 hover:bg-[#071B3A]'
            }`}
          >
            <HeartPulse size={16} /> AMS & First-Aid Guide
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-[#071B3A]/40 text-gray-300 hover:bg-[#071B3A]'
            }`}
          >
            <Backpack size={16} /> Trail Checklist ({checklist.filter((c) => c.checked).length}/{checklist.length})
          </button>
        </div>

        {/* TAB 1: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {currentItinerary ? (
              <div className="bg-[#071B3A]/40 border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00AEEF]">
                      OFFLINE EXPEDITION DOSSIER
                    </span>
                    <h2 className="text-2xl font-bold mt-1">{currentItinerary.title}</h2>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin size={13} className="text-[#00AEEF]" /> {currentItinerary.destination}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={13} className="text-[#00AEEF]" /> {currentItinerary.durationDays} Days</span>
                      <span>•</span>
                      <span>Cached locally</span>
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 max-w-sm">
                    <strong>Emergency Station:</strong> {currentItinerary.emergencyProtocol}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400">
                    Day-by-Day Trail Breakdown
                  </h3>
                  <div className="grid gap-4">
                    {currentItinerary.days.map((day) => (
                      <div
                        key={day.dayNumber}
                        className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 text-xs font-bold rounded bg-[#00AEEF]/20 text-[#00AEEF]">
                            DAY {day.dayNumber}
                          </span>
                          {day.elevationGainMeters !== undefined && (
                            <span className="text-xs font-mono text-gray-400">
                              ▲ Elevation: {day.elevationGainMeters > 0 ? `+${day.elevationGainMeters}m` : `${day.elevationGainMeters}m`}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-white">{day.title}</h4>
                        <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                          {day.activities.map((act, idx) => (
                            <li key={idx}>{act}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2 border-t border-white/5">
                          {day.campsite && (
                            <span className="flex items-center gap-1">
                              <TentTree size={13} className="text-[var(--color-accent)]" />
                              <span>Campsite: <strong>{day.campsite}</strong></span>
                            </span>
                          )}
                          {day.waterSourceAvailable !== undefined && (
                            <span className="flex items-center gap-1">
                              <Droplets size={13} className="text-cyan-400" />
                              <span>Water: <strong>{day.waterSourceAvailable ? 'Available on trail' : 'Carry 2L min (Dry stretch)'}</strong></span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No cached itineraries found. Plan a trip online to cache it automatically.</p>
            )}
          </div>
        )}

        {/* TAB 2: EMERGENCY SOS */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3">
              <AlertTriangle size={24} className="text-red-400 shrink-0" />
              <p className="text-sm text-red-200">
                In severe mountain distress or flash floods, dial directly. Numbers work without active internet on basic cellular / satellite networks.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {EMERGENCY_CONTACTS.map((c, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#071B3A]/40 border border-white/10 hover:border-red-500/40 transition-all space-y-2"
                >
                  <span className="text-xs font-mono uppercase text-[#00AEEF]">{c.region}</span>
                  <h3 className="text-lg font-bold text-white">{c.agency}</h3>
                  <p className="text-xs text-gray-300">{c.purpose}</p>
                  <div className="pt-2">
                    <a
                      href={`tel:${c.number.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-wide transition-colors"
                    >
                      <Phone size={14} /> CALL: {c.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AMS & FIRST-AID */}
        {activeTab === 'ams' && (
          <div className="space-y-6">
            <div className="bg-[#071B3A]/40 border border-white/10 rounded-2xl p-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  CLINICAL PROTOCOL FOR HIMALAYAN TREKKING
                </span>
                <h2 className="text-2xl font-bold mt-1">High-Altitude Sickness (AMS / HAPE / HACE)</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Essential first-aid protocol when ascending beyond 2,500 meters (Rishikesh to Roopkund, Spiti, Ladakh).
                </p>
              </div>

              <div className="space-y-6">
                {AMS_SAFETY_PROTOCOLS.map((proto, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/40 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-amber-300">{proto.stage}</h3>
                      <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-gray-300">
                        {proto.elevation}
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-200">
                      {proto.actions.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <Check size={14} className="text-amber-400 shrink-0 mt-1" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="bg-[#071B3A]/40 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold">Offline Expedition Checklist</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Checked items are saved locally on your device and persist without cellular reception.
                </p>
              </div>
              <span className="text-sm font-mono text-[#00AEEF]">
                {checklist.filter((c) => c.checked).length} / {checklist.length} Completed
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    item.checked
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 line-through opacity-75'
                      : 'bg-black/40 border-white/10 text-gray-200 hover:border-[#00AEEF]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}}
                      className="h-4 w-4 rounded accent-[#00AEEF] cursor-pointer"
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-gray-400">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
