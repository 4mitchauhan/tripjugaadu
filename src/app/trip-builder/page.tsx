'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTrip, TripItem, getCanonicalCity } from '@/context/TripContext';
import { useLocale } from '@/context/LocaleContext';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import {
  Compass,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Plus,
  Trash2,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Hotel,
  Waves,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Layers
} from 'lucide-react';

const CITY_METADATA: Record<string, { image: string; region: string; days: string; description: string }> = {
  Rishikesh: {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    region: 'Uttarakhand',
    days: '03 Days / 02 Nights',
    description: 'Adventure capital along the turquoise Ganges with white-water rapids and cliffside bungee jumps.',
  },
  Manali: {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    region: 'Himachal Pradesh',
    days: '04 Days / 03 Nights',
    description: 'Pine valleys, high Rohtang alpine passes, and raging river runs beneath jagged snow peaks.',
  },
  Ladakh: {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    region: 'Jammu & Kashmir / Ladakh',
    days: '07 Days / 06 Nights',
    description: 'High alpine mountain passes, starlit galactic skies, and crystalline glacial lakes.',
  },
  Kasol: {
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80',
    region: 'Himachal Pradesh',
    days: '03 Days / 02 Nights',
    description: 'Mythic valley of mist, hot sulfur springs, pine forests, and mountain trails leading to Kheerganga.',
  },
  Goa: {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    region: 'Western India',
    days: '04 Days / 03 Nights',
    description: 'Secluded golden beaches, Portuguese architecture, sunset markets, and crystal coastal scuba.',
  },
  Mussoorie: {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    region: 'Uttarakhand',
    days: '03 Days / 02 Nights',
    description: 'Historic Queen of Hills with panoramic Himalayan sunsets, winterline horizon, and misty pine trails.',
  },
  'Bir Billing': {
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    region: 'Himachal Pradesh',
    days: '03 Days / 02 Nights',
    description: 'World-renowned paragliding capital where you soar above emerald Tibetan monasteries.',
  },
  'Spiti Valley': {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    region: 'Himachal Pradesh',
    days: '06 Days / 05 Nights',
    description: 'Cliffside 1000-year monasteries, lunar mountain valleys, and high-altitude 4x4 safaris.',
  },
};

function TripBuilderContent() {
  const searchParams = useSearchParams();
  const {
    trip,
    tripCount,
    estimatedTotal,
    addToTrip,
    removeFromTrip,
    assignToDay,
    unassignFromDay,
    moveToDay,
    addDay,
    removeDay,
    setTravelers,
    setDestination,
    isInTrip,
  } = useTrip();

  const { formatPrice } = useLocale();

  // Active City Tab (default from query param or trip destination or Rishikesh)
  const queryCity = searchParams?.get('city');
  const [activeCity, setActiveCity] = useState<string>(
    queryCity ? getCanonicalCity(queryCity) : getCanonicalCity(trip.destination || 'Rishikesh')
  );

  // Modal State
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  // Collect all items across unscheduled and scheduled days
  const allTripItems = useMemo(() => {
    return [
      ...trip.unscheduledItems,
      ...trip.days.flatMap((d) => d.items),
    ];
  }, [trip]);

  // Group trip items by canonical city
  const cityGroups = useMemo(() => {
    const groups: Record<string, TripItem[]> = {};
    allTripItems.forEach((item) => {
      const city = getCanonicalCity(item.location);
      if (!groups[city]) groups[city] = [];
      groups[city].push(item);
    });
    return groups;
  }, [allTripItems]);

  // List of active cities for navigation pills
  const availableCities = useMemo(() => {
    const cities = new Set<string>();
    Object.keys(cityGroups).forEach((c) => cities.add(c));
    if (trip.destination) cities.add(getCanonicalCity(trip.destination));
    ['Rishikesh', 'Manali', 'Ladakh', 'Kasol', 'Goa'].forEach((c) => cities.add(c));
    return Array.from(cities);
  }, [cityGroups, trip.destination]);

  // Items for the active city
  const activeCityItems = useMemo(() => {
    if (activeCity === 'All') return allTripItems;
    return allTripItems.filter((item) => getCanonicalCity(item.location) === activeCity);
  }, [allTripItems, activeCity]);

  // Categorized breakdown for current city
  const cityStays = useMemo(() => activeCityItems.filter((i) => i.type === 'stay'), [activeCityItems]);
  const cityAdventures = useMemo(() => activeCityItems.filter((i) => i.type === 'adventure'), [activeCityItems]);
  const cityExperiences = useMemo(() => activeCityItems.filter((i) => i.type === 'experience'), [activeCityItems]);

  // City subtotal
  const citySubtotal = useMemo(() => {
    return activeCityItems.reduce((acc, curr) => {
      return acc + (curr.type === 'stay' ? curr.numericPrice : curr.numericPrice * trip.travelers);
    }, 0);
  }, [activeCityItems, trip.travelers]);

  // Smart Recommendations for this specific city
  const cityRecommendations = useMemo(() => {
    const list: Array<any & { itemType: 'adventure' | 'stay' | 'experience' }> = [];
    ADVENTURES.forEach((a) => list.push({ ...a, itemType: 'adventure' }));
    STAYS.forEach((s) => list.push({ ...s, itemType: 'stay', duration: 'Overnight' }));
    EXPERIENCES.forEach((e) => list.push({ ...e, itemType: 'experience', price: '₹1,499' }));

    return list
      .filter((item) => {
        if (activeCity === 'All') return !isInTrip(item.id);
        return getCanonicalCity(item.location) === activeCity && !isInTrip(item.id);
      })
      .slice(0, 3);
  }, [activeCity, isInTrip]);

  // Pricing calculations
  const totalSubtotal = estimatedTotal;
  const estimatedTaxes = Math.round(totalSubtotal * 0.18);
  const grandTotal = totalSubtotal + estimatedTaxes;

  const currentCityMeta = CITY_METADATA[activeCity] || {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    region: 'India',
    days: '03 Days / 02 Nights',
    description: `Explore verified adventures, stays, and experiences in ${activeCity}.`,
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#010611] text-[#F4F7FA]">
      <div className="container max-w-6xl px-4">
        {/* ── 1. CLEAN COMPACT HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge">EXPEDITION BUILDER</span>
              <span className="badge" style={{ background: 'rgba(0, 174, 239, 0.15)', color: '#38BDF8' }}>
                DIVIDED BY CITY
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
              Trip Itinerary Builder
            </h1>
            <p className="text-xs text-white/60">
              Browse anywhere on the site, add items to your trip, and review them organized cleanly by city.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Travelers counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Users size={13} className="text-cyan-400" />
              <button
                type="button"
                onClick={() => setTravelers(Math.max(1, trip.travelers - 1))}
                className="w-5 h-5 rounded flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 font-bold"
              >
                −
              </button>
              <span className="font-mono font-bold text-white px-1">{trip.travelers}</span>
              <button
                type="button"
                onClick={() => setTravelers(trip.travelers + 1)}
                className="w-5 h-5 rounded flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 font-bold"
              >
                +
              </button>
              <span className="text-[11px] text-white/50">Travelers</span>
            </div>

            {/* Total Budget Pill */}
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
              <span className="text-[10px] text-cyan-300/70 block uppercase font-mono">Total Est.</span>
              <span className="font-mono font-bold text-cyan-300">{formatPrice(grandTotal)}</span>
            </div>

            {/* Finalize Button */}
            <button
              type="button"
              disabled={tripCount === 0}
              onClick={() => setShowFinalizeModal(true)}
              className={`btn btn--primary btn--sm inline-flex items-center gap-1.5 ${
                tripCount === 0 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <ShoppingBag size={14} />
              <span>Finalize Trip ({tripCount})</span>
            </button>
          </div>
        </div>

        {/* ── 2. CITY HUBS / DESTINATION SELECTOR PILLS ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <MapPin size={13} />
              <span>Select Destination Space:</span>
            </span>
            <Link href="/explore" className="text-xs text-white/50 hover:text-cyan-400 flex items-center gap-1">
              <span>+ Explore More Destinations</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCity('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCity === 'All'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 font-extrabold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Compass size={13} />
              <span>All Cities ({allTripItems.length})</span>
            </button>

            {availableCities.map((city) => {
              const count = (cityGroups[city] || []).length;
              const isActive = activeCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setActiveCity(city);
                    setDestination(city);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 font-extrabold'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <MapPin size={13} className={isActive ? 'text-black' : count > 0 ? 'text-cyan-400' : 'text-white/40'} />
                  <span>{city} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. DEDICATED CITY WORKSPACE (CLEAN 2-COLUMN LAYOUT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── MAIN CONTENT (65% width): Selected Items & Daily Plan ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* City Title Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-[#071b3a]/70 border border-cyan-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img src={currentCityMeta.image} alt={activeCity} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {currentCityMeta.region}
                    </span>
                    <span className="text-[10px] text-white/50">{currentCityMeta.days}</span>
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wide text-white mt-0.5">
                    {activeCity === 'All' ? 'Complete Subcontinent Plan' : `${activeCity} Itinerary Space`}
                  </h2>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-white/50 uppercase block">City Subtotal</span>
                <span className="text-sm font-bold text-cyan-300 font-mono">{formatPrice(citySubtotal)}</span>
              </div>
            </div>

            {/* Selected Items in this City */}
            <div className="p-5 rounded-2xl bg-[#071026] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Layers size={14} className="text-cyan-400" />
                  <span>Selected Experiences in {activeCity} ({activeCityItems.length})</span>
                </h3>
                {activeCityItems.length > 0 && (
                  <span className="text-xs text-white/50">Assign to daily itinerary below</span>
                )}
              </div>

              {activeCityItems.length === 0 ? (
                <div className="py-10 text-center rounded-xl border border-dashed border-white/10">
                  <MapPin size={28} className="text-white/30 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white/70 mb-1">
                    No activities selected for {activeCity} yet
                  </p>
                  <p className="text-[11px] text-white/40 max-w-sm mx-auto mb-4">
                    Explore destinations or select a recommended experience from the sidebar to start building your {activeCity} leg.
                  </p>
                  <Link
                    href={`/destination/${activeCity.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn btn--secondary btn--sm inline-flex items-center gap-1.5 text-xs"
                  >
                    <Compass size={13} />
                    <span>Explore {activeCity} Page</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeCityItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                              {item.type}
                            </span>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-white/60 mt-1">
                            <span className="text-cyan-400 font-medium">{item.location}</span>
                            <span>·</span>
                            <span>{item.duration}</span>
                            <span>·</span>
                            <span className="text-white font-mono font-semibold">{item.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Day Assignment & Remove Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className="text-[10px] text-white/40">Assign:</span>
                        <div className="flex items-center gap-1">
                          {trip.days.map((d) => (
                            <button
                              key={d.dayNumber}
                              type="button"
                              onClick={() => assignToDay(item.id, d.dayNumber)}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 transition-all"
                            >
                              D{d.dayNumber}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromTrip(item.id)}
                          className="p-1.5 text-white/40 hover:text-rose-400 ml-1 transition-colors"
                          title="Remove from trip"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Day-by-Day Schedule for this City */}
            <div className="p-5 rounded-2xl bg-[#071026] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Calendar size={14} className="text-cyan-400" />
                    <span>Daily Schedule ({activeCity})</span>
                  </h3>
                  <span className="text-xs text-white/50">Sequence activities day-by-day</span>
                </div>
                <button
                  type="button"
                  onClick={addDay}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 flex items-center gap-1 transition-all"
                >
                  <Plus size={13} />
                  <span>Add Day</span>
                </button>
              </div>

              <div className="space-y-3">
                {trip.days.map((day) => {
                  const dayItems = activeCity === 'All'
                    ? day.items
                    : day.items.filter((it) => getCanonicalCity(it.location) === activeCity);

                  return (
                    <div key={day.dayNumber} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">
                            0{day.dayNumber}
                          </span>
                          <span>Day {day.dayNumber}</span>
                        </span>
                        <span className="text-[11px] text-white/50">
                          {dayItems.length} {dayItems.length === 1 ? 'activity' : 'activities'}
                        </span>
                      </div>

                      {dayItems.length === 0 ? (
                        <p className="text-[11px] text-white/40 py-2">
                          No activities assigned to Day {day.dayNumber} yet.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {dayItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-black/30">
                              <span className="text-white font-medium truncate max-w-[280px]">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[11px] text-cyan-400 font-mono">{item.price}</span>
                                <button
                                  type="button"
                                  onClick={() => unassignFromDay(item.id, day.dayNumber)}
                                  className="text-[10px] text-white/40 hover:text-white"
                                >
                                  Unassign
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR (35% width): City Readiness, Cost & Quick Recommendations ── */}
          <div className="space-y-6">
            {/* City Readiness Card */}
            <div className="p-5 rounded-2xl bg-[#071026] border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {activeCity} Trip Readiness
              </span>
              <h4 className="text-sm font-bold text-white mb-3">Expedition Blueprint Status</h4>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Hotel size={14} className={cityStays.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                    <span className="text-white/80">Accommodation</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${cityStays.length > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {cityStays.length > 0 ? `✓ ${cityStays.length} Added` : 'Missing'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Waves size={14} className={cityAdventures.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                    <span className="text-white/80">Outdoor Adventure</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${cityAdventures.length > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {cityAdventures.length > 0 ? `✓ ${cityAdventures.length} Added` : 'Missing'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className={cityExperiences.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                    <span className="text-white/80">Culture & Sights</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${cityExperiences.length > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {cityExperiences.length > 0 ? `✓ ${cityExperiences.length} Added` : 'Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* City Subtotal & Action */}
            <div className="p-5 rounded-2xl bg-[#071026] border border-cyan-500/30 shadow-xl shadow-cyan-950/20">
              <div className="flex justify-between items-center text-xs text-white/60 mb-1">
                <span>{activeCity} Subtotal ({trip.travelers} Guests):</span>
                <span className="font-mono text-base font-bold text-cyan-400">{formatPrice(citySubtotal)}</span>
              </div>
              <p className="text-[11px] text-white/40 mb-4">
                Estimated base rate. Taxes & permits calculated upon booking.
              </p>
              <button
                type="button"
                disabled={activeCityItems.length === 0}
                onClick={() => setShowFinalizeModal(true)}
                className={`w-full btn btn--primary btn--sm inline-flex items-center justify-center gap-2 ${
                  activeCityItems.length === 0 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <CheckCircle2 size={14} />
                <span>Finalize {activeCity} Plan</span>
              </button>
            </div>

            {/* Smart 1-Click Add Recommendations */}
            {cityRecommendations.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#071026] border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  1-Click Recommendations
                </span>
                <h4 className="text-sm font-bold text-white mb-3">Add to {activeCity}</h4>

                <div className="space-y-3">
                  {cityRecommendations.map((rec) => (
                    <div key={rec.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">{rec.name}</h5>
                          <span className="text-[11px] text-cyan-400 font-mono">{rec.price}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToTrip(rec, rec.itemType)}
                        className="px-2.5 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 text-[11px] font-bold border border-cyan-500/30 shrink-0 transition-all"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. REVIEW & FINALIZE MODAL ── */}
      {showFinalizeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-cyan-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  Finalize {activeCity} Itinerary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFinalizeModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block mb-1">
                  Selected Destination Space
                </span>
                <h4 className="text-base font-bold text-white">{activeCity} ({currentCityMeta.region})</h4>
                <p className="text-xs text-white/70 mt-1">{currentCityMeta.description}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2">
                  Selected Experiences ({activeCityItems.length})
                </span>
                <div className="space-y-2">
                  {activeCityItems.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{item.name}</span>
                        <span className="text-[11px] text-white/50">{item.duration} · {item.type}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-white/50 uppercase block">Total for {trip.travelers} Travelers</span>
                  <span className="text-xs text-white/70">Includes 18% GST & Gear</span>
                </div>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {formatPrice(citySubtotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowFinalizeModal(false)}
                className="btn btn--secondary btn--sm"
              >
                Back to Planner
              </button>
              <Link
                href={`/booking?type=adventure&id=rafting&travelers=${trip.travelers}`}
                className="btn btn--primary btn--sm inline-flex items-center gap-1.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TripBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#010611] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Compass className="animate-spin text-[var(--color-accent)]" size={24} />
          <span className="text-sm font-semibold tracking-wider uppercase">Loading Trip Architect...</span>
        </div>
      </div>
    }>
      <TripBuilderContent />
    </Suspense>
  );
}
