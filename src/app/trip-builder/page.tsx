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
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  Heart,
  SlidersHorizontal,
  Search,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
  Wallet,
  ShoppingBag,
  Info,
  Hotel,
  Waves,
  MountainSnow,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

// City image lookup for city workspace banner
const CITY_HERO_IMAGES: Record<string, { image: string; region: string; days: string; description: string }> = {
  Rishikesh: {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80',
    region: 'Uttarakhand',
    days: '03 Days / 02 Nights',
    description: 'The adventure capital of India, nestled along the turquoise Ganges with white-water rapids and cliffside bungee jumps.',
  },
  Manali: {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    region: 'Himachal Pradesh',
    days: '04 Days / 03 Nights',
    description: 'Pine-scented alpine valleys, high-altitude Rohtang passes, and raging river runs beneath jagged snow peaks.',
  },
  Ladakh: {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
    region: 'Jammu & Kashmir / Ladakh',
    days: '07 Days / 06 Nights',
    description: 'The raw rooftop of the world — high alpine mountain passes, starlit galactic skies, and crystalline glacial lakes.',
  },
  Kasol: {
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1200&q=80',
    region: 'Himachal Pradesh',
    days: '03 Days / 02 Nights',
    description: 'A mythic valley of mist, hot sulfur springs, pine forests, and transcendent mountain trails leading to Kheerganga.',
  },
  Goa: {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    region: 'Western India',
    days: '04 Days / 03 Nights',
    description: 'Secluded golden beaches, Portuguese colonial architecture, bohemian sunset markets, and crystal coastal scuba.',
  },
  Mussoorie: {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    region: 'Uttarakhand',
    days: '03 Days / 02 Nights',
    description: 'The historic Queen of Hills — panoramic Himalayan sunsets, the famous winterline horizon, and misty pine trails.',
  },
  'Bir Billing': {
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=80',
    region: 'Himachal Pradesh',
    days: '03 Days / 02 Nights',
    description: 'World-renowned paragliding capital where you soar above emerald Tibetan monasteries and Dhauladhar cliffs.',
  },
  'Spiti Valley': {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    region: 'Himachal Pradesh',
    days: '06 Days / 05 Nights',
    description: 'The Middle Land between Tibet and India — 1000-year-old cliffside monasteries, lunar landscapes, and fossil villages.',
  },
  Meghalaya: {
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200&q=80',
    region: 'Northeast India',
    days: '05 Days / 04 Nights',
    description: 'The Abode of Clouds — living bio-engineered root bridges, thunderous jungle waterfalls, and subterranean caves.',
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
    setDates,
    setTravelers,
    setBudgetLimit,
    setTripTitle,
    setDestination,
    toggleFavorite,
    isFavorite,
    isInTrip,
    saveTripToAccount,
  } = useTrip();

  const { formatPrice } = useLocale();

  // Active view tab: 'builder' | 'discover' | 'budget'
  const [activeTab, setActiveTab] = useState<'builder' | 'discover' | 'budget'>('builder');

  // Active City Workspace Filter
  const paramCity = searchParams?.get('city');
  const [activeCity, setActiveCity] = useState<string>(
    paramCity ? getCanonicalCity(paramCity) : getCanonicalCity(trip.destination || 'Rishikesh')
  );

  // Discovery Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  // Modal States
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCityFinalizeModal, setShowCityFinalizeModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');

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

  // Available unique cities in the trip or popular hubs
  const availableCities = useMemo(() => {
    const citiesSet = new Set<string>();
    // Cities with selected items
    Object.keys(cityGroups).forEach((c) => citiesSet.add(c));
    // User's trip destination
    if (trip.destination) citiesSet.add(getCanonicalCity(trip.destination));
    // Popular default hubs
    ['Rishikesh', 'Manali', 'Ladakh', 'Kasol', 'Goa'].forEach((c) => citiesSet.add(c));
    return Array.from(citiesSet);
  }, [cityGroups, trip.destination]);

  // Items for the currently selected city workspace
  const currentCityItems = useMemo(() => {
    if (activeCity === 'All') return allTripItems;
    return allTripItems.filter((item) => getCanonicalCity(item.location) === activeCity);
  }, [allTripItems, activeCity]);

  // Items in this city categorized
  const cityStays = useMemo(() => currentCityItems.filter((i) => i.type === 'stay'), [currentCityItems]);
  const cityAdventures = useMemo(() => currentCityItems.filter((i) => i.type === 'adventure'), [currentCityItems]);
  const cityExperiences = useMemo(() => currentCityItems.filter((i) => i.type === 'experience'), [currentCityItems]);

  // City subtotal
  const citySubtotal = useMemo(() => {
    return currentCityItems.reduce((acc, curr) => {
      return acc + (curr.type === 'stay' ? curr.numericPrice : curr.numericPrice * trip.travelers);
    }, 0);
  }, [currentCityItems, trip.travelers]);

  // Combined Catalog of Authoritative Items
  const catalogItems = useMemo(() => {
    const list: Array<any & { itemType: 'adventure' | 'stay' | 'experience' }> = [];

    ADVENTURES.forEach((adv) => {
      list.push({
        ...adv,
        itemType: 'adventure',
        category: adv.difficulty === 'Extreme' ? 'Bungee & Extreme' : adv.name.toLowerCase().includes('rafting') ? 'River Adventures' : 'Trekking & Hiking',
        rating: '4.9',
        reviewCount: 54,
        reviewHighlight: 'Certified grade-IV river safety and top guides.',
        verified: true,
      });
    });

    STAYS.forEach((stay) => {
      list.push({
        ...stay,
        itemType: 'stay',
        duration: 'Overnight',
        category: 'Stays & Retreats',
        reviewCount: 38,
        reviewHighlight: 'Spectacular mountain vista with organic cuisine.',
        verified: true,
      });
    });

    EXPERIENCES.forEach((exp) => {
      list.push({
        ...exp,
        itemType: 'experience',
        price: '₹1,499',
        category: 'Local & Cultural',
        rating: '4.8',
        reviewCount: 29,
        reviewHighlight: 'Authentic local artisan immersion with certified host.',
        verified: true,
      });
    });

    return list;
  }, []);

  // Smart Recommendations for the current city
  const cityRecommendations = useMemo(() => {
    if (activeCity === 'All') return catalogItems.slice(0, 4);
    return catalogItems
      .filter((item) => getCanonicalCity(item.location) === activeCity && !isInTrip(item.id))
      .slice(0, 4);
  }, [catalogItems, activeCity, isInTrip]);

  // Filtered & Sorted Catalog for Discover Tab
  const filteredCatalog = useMemo(() => {
    return catalogItems
      .filter((item) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchDesc = (item.description || '').toLowerCase().includes(q);
          if (!matchName && !matchLoc && !matchDesc) return false;
        }
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'River Adventures') {
            if (!item.name.toLowerCase().includes('rafting') && !item.name.toLowerCase().includes('scuba')) return false;
          } else if (selectedCategory === 'Trekking & Hiking') {
            if (!item.name.toLowerCase().includes('trekking') && !item.name.toLowerCase().includes('pass')) return false;
          } else if (selectedCategory === 'Bungee & Extreme') {
            if (!item.name.toLowerCase().includes('bungee') && !item.name.toLowerCase().includes('zipline') && !item.name.toLowerCase().includes('paragliding')) return false;
          } else if (selectedCategory === 'Stays & Retreats') {
            if (item.itemType !== 'stay') return false;
          } else if (selectedCategory === 'Local & Cultural') {
            if (item.itemType !== 'experience') return false;
          }
        }
        if (selectedDestination !== 'All') {
          if (!item.location.toLowerCase().includes(selectedDestination.toLowerCase())) return false;
        }
        if (selectedDifficulty !== 'All') {
          if (item.difficulty !== selectedDifficulty) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (parseInt(a.price?.replace(/\D/g, '')) || 0) - (parseInt(b.price?.replace(/\D/g, '')) || 0);
        if (sortBy === 'price-desc') return (parseInt(b.price?.replace(/\D/g, '')) || 0) - (parseInt(a.price?.replace(/\D/g, '')) || 0);
        if (sortBy === 'rating') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
        return 0;
      });
  }, [catalogItems, searchQuery, selectedCategory, selectedDestination, selectedDifficulty, sortBy]);

  const handleSaveTrip = async () => {
    setIsSaving(true);
    setSaveStatus('Saving your adventure...');
    const result = await saveTripToAccount();
    setIsSaving(false);
    setSaveStatus(result.message);
    if (result.success) {
      setTimeout(() => setShowSaveModal(false), 2000);
    }
  };

  const getDayDateLabel = (dayNumber: number): string => {
    if (!trip.startDate) return `Day 0${dayNumber}`;
    try {
      const dayDate = new Date(trip.startDate);
      dayDate.setDate(dayDate.getDate() + (dayNumber - 1));
      const formatted = dayDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      return `Day 0${dayNumber} — ${formatted}`;
    } catch {
      return `Day 0${dayNumber}`;
    }
  };

  // Pricing calculations
  const totalSubtotal = estimatedTotal;
  const estimatedTaxes = Math.round(totalSubtotal * 0.18);
  const grandTotal = totalSubtotal + estimatedTaxes;
  const isOverBudget = trip.budgetLimit !== null && grandTotal > trip.budgetLimit;
  const budgetDiff = trip.budgetLimit !== null ? grandTotal - trip.budgetLimit : 0;

  const currentCityMeta = CITY_HERO_IMAGES[activeCity] || {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    region: 'India',
    days: '03 Days / 02 Nights',
    description: `Discover the best outdoor expeditions, authentic retreats, and cultural immersion in ${activeCity}.`,
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#010611] text-[#F4F7FA]">
      <div className="container max-w-6xl px-4">
        {/* Header Breadcrumb & Identity */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge">CITY-SEGMENTED EXPEDITION ARCHITECT</span>
              <span className="badge" style={{ background: 'rgba(0, 174, 239, 0.15)', color: '#38BDF8' }}>
                LIVE TRIP BUILDER
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
              {trip.title || 'Personalized Adventure Itinerary'}
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">
              Add experiences from anywhere on the site · Organized by city · Finalized for your journey.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="btn btn--secondary btn--sm inline-flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} className="text-[var(--color-accent)]" />
              <span>{trip.isSavedToAccount ? 'Saved to Account' : 'Save Trip to Account'}</span>
            </button>
            <button
              type="button"
              disabled={tripCount === 0}
              onClick={() => setShowBookModal(true)}
              className={`btn btn--primary btn--sm inline-flex items-center gap-1.5 ${tripCount === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <ShoppingBag size={14} />
              <span>Review All ({tripCount})</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs: Builder / Discover / Budget Breakdown */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shrink-0 ${
              activeTab === 'builder'
                ? 'bg-[var(--color-accent)] text-[#010611] shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>Itinerary Board ({tripCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shrink-0 ${
              activeTab === 'discover'
                ? 'bg-[var(--color-accent)] text-[#010611] shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Compass size={14} />
            <span>Discover & Add Experiences</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shrink-0 ${
              activeTab === 'budget'
                ? 'bg-[var(--color-accent)] text-[#010611] shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <Wallet size={14} />
            <span>Itemized Cost & Budget ({formatPrice(grandTotal)})</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: CITY-SEGMENTED ITINERARY BOARD
            ======================================================== */}
        {activeTab === 'builder' && (
          <div className="space-y-8">
            {/* Trip Parameters Bar (Dates, Travelers, Destination) */}
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                  Primary Destination
                </label>
                <select
                  value={trip.destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setActiveCity(getCanonicalCity(e.target.value));
                  }}
                  className="auth-form__input py-2 text-xs"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                  Start Date (Optional)
                </label>
                <input
                  type="date"
                  value={trip.startDate}
                  onChange={(e) => setDates(e.target.value, trip.endDate)}
                  className="auth-form__input py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={trip.endDate}
                  onChange={(e) => setDates(trip.startDate, e.target.value)}
                  className="auth-form__input py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                  Travelers ({trip.travelers})
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, trip.travelers - 1))}
                    className="btn btn--secondary w-8 h-8 p-0 flex items-center justify-center text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="font-mono text-sm font-bold text-white w-6 text-center">
                    {trip.travelers.toString().padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers(trip.travelers + 1)}
                    className="btn btn--secondary w-8 h-8 p-0 flex items-center justify-center text-sm font-bold"
                  >
                    +
                  </button>
                  <span className="text-xs text-[var(--text-muted)] ml-2">Expedition Group</span>
                </div>
              </div>
            </div>

            {/* ── CITY HUBS / CITY TABS (DIVIDE PLACES ACCORDING TO CITIES) ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <MapPin size={13} />
                  <span>Choose City Hub / Destination Space:</span>
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Items you add while exploring automatically populate that city&apos;s workspace.
                </span>
              </div>

              <div className="city-hubs-bar">
                <button
                  type="button"
                  onClick={() => setActiveCity('All')}
                  className={`city-hub-btn ${activeCity === 'All' ? 'city-hub-btn--active' : ''}`}
                >
                  <Compass size={14} />
                  <span>All Cities ({allTripItems.length})</span>
                </button>

                {availableCities.map((city) => {
                  const itemsInCity = cityGroups[city] || [];
                  const isActive = activeCity === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setActiveCity(city)}
                      className={`city-hub-btn ${isActive ? 'city-hub-btn--active' : ''}`}
                    >
                      <MapPin size={13} className={isActive ? 'text-cyan-400' : 'text-white/60'} />
                      <span>{city} ({itemsInCity.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── DEDICATED CITY WORKSPACE FOR THE SELECTED CITY ── */}
            {activeCity !== 'All' && (
              <div className="city-workspace-hero">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                  style={{ backgroundImage: `url(${currentCityMeta.image})` }}
                />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {currentCityMeta.region} · {currentCityMeta.days}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Dedicated City Space
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-white">
                        {activeCity} Expedition Workspace
                      </h2>
                      <p className="text-xs md:text-sm text-white/70 max-w-2xl mt-1">
                        {currentCityMeta.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
                      <div className="text-right px-4 py-2 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-[10px] text-white/50 uppercase block">City Subtotal</span>
                        <span className="text-base font-bold text-cyan-400 font-mono">{formatPrice(citySubtotal)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCityFinalizeModal(true)}
                        className="btn btn--primary btn--sm inline-flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={14} />
                        <span>Finalize {activeCity} Plan</span>
                      </button>
                    </div>
                  </div>

                  {/* Readiness & City Blueprint Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                      cityStays.length > 0 ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/60'
                    }`}>
                      <Hotel size={20} className={cityStays.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider block">Lodging Status</span>
                        <span className="text-xs font-semibold text-white">
                          {cityStays.length > 0 ? `${cityStays.length} Stay Selected` : 'No stay added yet'}
                        </span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                      cityAdventures.length > 0 ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/60'
                    }`}>
                      <Waves size={20} className={cityAdventures.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider block">Adventures Status</span>
                        <span className="text-xs font-semibold text-white">
                          {cityAdventures.length > 0 ? `${cityAdventures.length} Adventures Selected` : 'No adventure added yet'}
                        </span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                      cityExperiences.length > 0 ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/60'
                    }`}>
                      <Sparkles size={20} className={cityExperiences.length > 0 ? 'text-emerald-400' : 'text-white/40'} />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider block">Culture & Wellness</span>
                        <span className="text-xs font-semibold text-white">
                          {cityExperiences.length > 0 ? `${cityExperiences.length} Experience Selected` : 'No experience added yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {currentCityItems.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] mb-4">
                  <MapPin size={32} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
                  No experiences selected for {activeCity} yet
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
                  Whenever you explore {activeCity} on the site, click &quot;+ Add to Trip&quot; to organize it directly into this space.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    href={`/destination/${activeCity.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn btn--primary inline-flex items-center gap-2"
                  >
                    <Compass size={16} /> Explore {activeCity} Guide
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('discover')}
                    className="btn btn--secondary inline-flex items-center gap-2"
                  >
                    <span>Browse All Experiences</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── CITY INVENTORY: CATEGORIZED SECTION (STAYS, ADVENTURES, EXPERIENCES) ── */}
            {currentCityItems.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                    Selected Experiences in {activeCity} ({currentCityItems.length})
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">
                    Assign these items to days below to build your schedule.
                  </span>
                </div>

                <div className="city-workspace-grid">
                  {/* Column 1: Stays */}
                  <div className="city-category-col">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Hotel size={16} className="text-cyan-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">Lodging & Stays</h4>
                      </div>
                      <span className="badge text-[10px]">{cityStays.length}</span>
                    </div>

                    {cityStays.length === 0 ? (
                      <div className="py-6 text-center text-xs text-white/40">
                        No stay added in {activeCity}. Pick one from recommendations below.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cityStays.map((item) => (
                          <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2.5 mb-2">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                                <span className="text-[11px] text-cyan-400 font-mono font-semibold">{item.price}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromTrip(item.id)}
                                className="text-white/40 hover:text-rose-400 p-1"
                                title="Remove"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                              <span className="text-[10px] text-white/50">Assign:</span>
                              {trip.days.map((d) => (
                                <button
                                  key={d.dayNumber}
                                  type="button"
                                  onClick={() => assignToDay(item.id, d.dayNumber)}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10"
                                >
                                  Day {d.dayNumber}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Column 2: Adventures */}
                  <div className="city-category-col">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Waves size={16} className="text-cyan-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">Outdoor Adventures</h4>
                      </div>
                      <span className="badge text-[10px]">{cityAdventures.length}</span>
                    </div>

                    {cityAdventures.length === 0 ? (
                      <div className="py-6 text-center text-xs text-white/40">
                        No adventures added yet for {activeCity}.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cityAdventures.map((item) => (
                          <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2.5 mb-2">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                                <span className="text-[11px] text-cyan-400 font-mono font-semibold">{item.price}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromTrip(item.id)}
                                className="text-white/40 hover:text-rose-400 p-1"
                                title="Remove"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                              <span className="text-[10px] text-white/50">Assign:</span>
                              {trip.days.map((d) => (
                                <button
                                  key={d.dayNumber}
                                  type="button"
                                  onClick={() => assignToDay(item.id, d.dayNumber)}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10"
                                >
                                  Day {d.dayNumber}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Column 3: Culture & Experiences */}
                  <div className="city-category-col">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-cyan-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">Culture & Wellness</h4>
                      </div>
                      <span className="badge text-[10px]">{cityExperiences.length}</span>
                    </div>

                    {cityExperiences.length === 0 ? (
                      <div className="py-6 text-center text-xs text-white/40">
                        No cultural experiences added yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cityExperiences.map((item) => (
                          <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2.5 mb-2">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                                <span className="text-[11px] text-cyan-400 font-mono font-semibold">{item.price}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromTrip(item.id)}
                                className="text-white/40 hover:text-rose-400 p-1"
                                title="Remove"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                              <span className="text-[10px] text-white/50">Assign:</span>
                              {trip.days.map((d) => (
                                <button
                                  key={d.dayNumber}
                                  type="button"
                                  onClick={() => assignToDay(item.id, d.dayNumber)}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10"
                                >
                                  Day {d.dayNumber}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── SMART RECOMMENDATIONS FOR THIS CITY ── */}
            {cityRecommendations.length > 0 && (
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="badge mb-1">Curated Additions</span>
                    <h3 className="text-base font-bold uppercase tracking-wider text-white">
                      Complete Your {activeCity} Trip
                    </h3>
                  </div>
                  <Link
                    href={`/destination/${activeCity.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All {activeCity} Offerings</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cityRecommendations.map((rec) => (
                    <div key={rec.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-2.5">
                          <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 badge text-[9px] uppercase">{rec.itemType}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{rec.name}</h4>
                        <div className="flex items-center justify-between text-[11px] text-white/60 mt-1 mb-3">
                          <span className="text-cyan-400 font-mono font-semibold">{rec.price}</span>
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star size={10} className="fill-amber-400" /> {rec.rating}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToTrip(rec, rec.itemType)}
                        className="w-full py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus size={13} />
                        <span>+ Add to {activeCity} Plan</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAY-BY-DAY ITINERARY SCHEDULE */}
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                    Day-by-Day Expedition Schedule ({activeCity})
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Sequence your {activeCity} adventures and stays into daily itineraries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addDay}
                  className="btn btn--secondary btn--sm inline-flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Another Day
                </button>
              </div>

              {trip.days.map((day) => {
                // Filter day items for active city (or all if 'All')
                const dayCityItems = activeCity === 'All'
                  ? day.items
                  : day.items.filter((it) => getCanonicalCity(it.location) === activeCity);

                const daySubtotal = dayCityItems.reduce((acc, curr) => {
                  return acc + (curr.type === 'stay' ? curr.numericPrice : curr.numericPrice * trip.travelers);
                }, 0);

                return (
                  <div
                    key={day.dayNumber}
                    className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] transition-all"
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[var(--color-accent-dim)] border border-[var(--color-accent)] flex items-center justify-center font-bold text-xs text-[var(--color-accent)]">
                          0{day.dayNumber}
                        </span>
                        <div>
                          <h4 className="font-bold text-base text-white">
                            {getDayDateLabel(day.dayNumber)}
                          </h4>
                          <span className="text-xs text-[var(--text-muted)]">
                            {dayCityItems.length} {dayCityItems.length === 1 ? 'experience' : 'experiences'} in {activeCity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[var(--color-accent)]">
                          Day Subtotal: {formatPrice(daySubtotal)}
                        </span>
                        {trip.days.length > 1 && day.items.length === 0 && (
                          <button
                            type="button"
                            onClick={() => removeDay(day.dayNumber)}
                            className="text-xs text-rose-400 hover:text-rose-300 p-1 transition-all"
                            title="Remove empty day"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Day Items List */}
                    {dayCityItems.length === 0 ? (
                      <div className="py-8 text-center border border-dashed border-[var(--border-color)] rounded-xl">
                        <p className="text-xs text-[var(--text-muted)] mb-2">
                          No activities assigned to this day in {activeCity} yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {dayCityItems.map((item, idx) => (
                          <div
                            key={`${item.id}-${idx}`}
                            className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[var(--color-accent)]/40 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="badge text-[9px] uppercase px-1.5 py-0.5">
                                    {item.type}
                                  </span>
                                  <span className="text-xs font-bold text-white line-clamp-1">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1">
                                  <span>{item.location}</span>
                                  <span>·</span>
                                  <span>{item.duration}</span>
                                  <span>·</span>
                                  <span className="text-[var(--color-accent)] font-semibold">{item.price}</span>
                                </div>
                              </div>
                            </div>

                            {/* Item Controls */}
                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              <select
                                value={day.dayNumber}
                                onChange={(e) => {
                                  const target = parseInt(e.target.value, 10);
                                  if (target !== day.dayNumber) {
                                    moveToDay(item.id, day.dayNumber, target);
                                  }
                                }}
                                className="auth-form__input py-1 px-2 text-xs w-auto bg-[#0a101d]"
                              >
                                {trip.days.map((d) => (
                                  <option key={d.dayNumber} value={d.dayNumber}>
                                    Move to Day {d.dayNumber}
                                  </option>
                                ))}
                              </select>

                              <button
                                type="button"
                                onClick={() => unassignFromDay(item.id, day.dayNumber)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white text-xs transition-all"
                              >
                                Unassign
                              </button>

                              <button
                                type="button"
                                onClick={() => removeFromTrip(item.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-900/50 text-[var(--text-muted)] hover:text-rose-400 text-xs transition-all"
                              >
                                <Trash2 size={13} />
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
        )}

        {/* ========================================================
            TAB 2: DISCOVER & ADD EXPERIENCES
            ======================================================== */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rafting, stays, Kasol..."
                    className="auth-form__input pl-9 text-xs"
                  />
                </div>
                <div>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="auth-form__input text-xs"
                  >
                    <option value="All">All Indian Destinations</option>
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="auth-form__input text-xs"
                  >
                    <option value="relevance">Sort: Recommended</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((item) => {
                const inTrip = isInTrip(item.id);
                const city = getCanonicalCity(item.location);
                return (
                  <div key={item.id} className="card--poster flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#071026]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="card__overlay"></div>
                      <div className="card__top-meta">
                        <span className="badge">{city}</span>
                        <span className="label label--accent">{item.duration}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-xs text-white/60 line-clamp-2 mb-3">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                        <span className="text-sm font-bold text-cyan-400 font-mono">{item.price}</span>
                        <button
                          type="button"
                          onClick={() => addToTrip(item, item.itemType)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                            inTrip
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-black'
                          }`}
                        >
                          <Plus size={13} />
                          <span>{inTrip ? 'In Trip ✓' : `+ Add to ${city} Plan`}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ITEMIZED BUDGET BREAKDOWN
            ======================================================== */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-4">
                Total Expedition Cost: {formatPrice(grandTotal)}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 uppercase">
                      <th className="py-2.5">Item</th>
                      <th className="py-2.5">City</th>
                      <th className="py-2.5">Type</th>
                      <th className="py-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allTripItems.map((item) => (
                      <tr key={item.id} className="text-white/80">
                        <td className="py-3 font-semibold text-white">{item.name}</td>
                        <td className="py-3 text-cyan-400">{getCanonicalCity(item.location)}</td>
                        <td className="py-3 capitalize">{item.type}</td>
                        <td className="py-3 text-right font-mono text-white">
                          {formatPrice(item.type === 'stay' ? item.numericPrice : item.numericPrice * trip.travelers)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          CITY FINALIZE MODAL (REVIEW & FINALIZE FOR ACTIVE CITY)
          ======================================================== */}
      {showCityFinalizeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-cyan-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  Finalize {activeCity} Expedition
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCityFinalizeModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block mb-1">
                  Destination Summary
                </span>
                <h4 className="text-base font-bold text-white">{activeCity} ({currentCityMeta.region})</h4>
                <p className="text-xs text-white/70 mt-1">{currentCityMeta.description}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2">
                  Scheduled Experiences ({currentCityItems.length})
                </span>
                <div className="space-y-2">
                  {currentCityItems.map((item) => (
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
                  <span className="text-[10px] text-white/50 uppercase block">Estimated {activeCity} Total</span>
                  <span className="text-xs text-white/70">Includes {trip.travelers} Travelers & GST</span>
                </div>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {formatPrice(citySubtotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCityFinalizeModal(false)}
                className="btn btn--secondary btn--sm"
              >
                Back to Workspace
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCityFinalizeModal(false);
                  setShowBookModal(true);
                }}
                className="btn btn--primary btn--sm inline-flex items-center gap-1.5"
              >
                <span>Confirm & Proceed to Booking</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-[var(--color-accent)]/40 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="badge">SAVE TRIP</span>
              <button type="button" onClick={() => setShowSaveModal(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2">Save Expedition</h3>
            <p className="text-xs text-white/70 mb-4">Your itinerary is saved to your browser session and account.</p>
            <input
              type="text"
              value={trip.title}
              onChange={(e) => setTripTitle(e.target.value)}
              className="auth-form__input text-xs mb-4"
              placeholder="Trip Name"
            />
            {saveStatus && <p className="text-xs text-emerald-400 mb-4">{saveStatus}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowSaveModal(false)} className="btn btn--secondary btn--sm">Close</button>
              <button type="button" onClick={handleSaveTrip} className="btn btn--primary btn--sm">Save Trip</button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-[var(--color-accent)]/40 rounded-3xl p-6 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="badge">EXPEDITION CHECKOUT</span>
              <button type="button" onClick={() => setShowBookModal(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2">Review & Book Expedition</h3>
            <div className="space-y-2 mb-6">
              {allTripItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{item.name}</span>
                    <span className="text-[11px] text-cyan-400">{getCanonicalCity(item.location)} · {item.price}</span>
                  </div>
                  <span className="badge text-[10px] text-cyan-400">Ready</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex justify-between items-center mb-6">
              <span className="text-xs text-white/70">Grand Total ({trip.travelers} Travelers + GST):</span>
              <span className="text-xl font-bold font-mono text-cyan-400">{formatPrice(grandTotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <button type="button" onClick={() => setShowBookModal(false)} className="btn btn--secondary btn--sm">Back</button>
              <Link href={`/booking?type=adventure&id=rafting&travelers=${trip.travelers}`} className="btn btn--primary btn--sm inline-flex items-center gap-1.5">
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
          <span className="text-sm font-semibold tracking-wider uppercase">Loading Expedition Architect...</span>
        </div>
      </div>
    }>
      <TripBuilderContent />
    </Suspense>
  );
}
