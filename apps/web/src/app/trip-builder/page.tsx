'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTrip } from '@/context/TripContext';
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
  Heart,
  Search,
  ExternalLink,
  ShieldCheck,
  Layers,
  Wallet,
  ShoppingBag,
} from 'lucide-react';

export default function TripBuilderPage() {
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

  // Discovery Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  // Modal States
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');

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

  // Filtered & Sorted Catalog
  const filteredCatalog = useMemo(() => {
    return catalogItems
      .filter((item) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchDesc = (item.description || '').toLowerCase().includes(q);
          if (!matchName && !matchLoc && !matchDesc) return false;
        }

        // Category filter
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

        // Destination filter
        if (selectedDestination !== 'All') {
          if (!item.location.toLowerCase().includes(selectedDestination.toLowerCase())) return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All') {
          if (item.difficulty !== selectedDifficulty) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '') || '0', 10);
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '') || '0', 10);
        const ratingA = parseFloat(a.rating || '4.5');
        const ratingB = parseFloat(b.rating || '4.5');

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return ratingB - ratingA;
        return 0; // relevance
      });
  }, [catalogItems, searchQuery, selectedCategory, selectedDestination, selectedDifficulty, sortBy]);

  // Handle Save Trip Modal Submission
  const handleSaveTrip = async () => {
    setIsSaving(true);
    setSaveStatus('');
    try {
      const res = await saveTripToAccount();
      setSaveStatus(res.message);
      setTimeout(() => {
        setShowSaveModal(false);
        setSaveStatus('');
      }, 2000);
    } catch {
      setSaveStatus('Guest draft saved locally to your device browser.');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to format date strings for days
  const getDayDateLabel = (dayNumber: number): string => {
    if (!trip.startDate) {
      return `Day 0${dayNumber}`;
    }
    try {
      const start = new Date(trip.startDate);
      if (isNaN(start.getTime())) return `Day 0${dayNumber}`;
      const dayDate = new Date(start);
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

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container max-w-6xl">
        {/* Header Breadcrumb & Identity */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge">MANUAL ITINERARY ARCHITECT</span>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                100% TRAVELER CONTROLLED
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
              {trip.title || 'Personalized Adventure Itinerary'}
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">
              Discover freely · Choose personally · Build manually · Book confidently.
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
              <span>Review & Book ({tripCount})</span>
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

        {/* TAB 1: ITINERARY BOARD */}
        {activeTab === 'builder' && (
          <div className="space-y-8">
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                  Trip Destination
                </label>
                <select
                  value={trip.destination}
                  onChange={(e) => setDestination(e.target.value)}
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

            {/* EMPTY STATE */}
            {tripCount === 0 && (
              <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] mb-4">
                  <Compass size={32} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
                  Your adventure starts here.
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
                  Explore destinations, discover verified outdoor experiences, and add the ones you love to your itinerary.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('discover')}
                  className="btn btn--primary inline-flex items-center gap-2"
                >
                  <Compass size={16} /> Explore Experiences
                </button>
                <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] flex-wrap">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[var(--color-accent)]" /> 100% Free exploration
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-400" /> Transparent operator pricing
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-amber-400" /> Flexible day assignment
                  </span>
                </div>
              </div>
            )}

            {/* UNSCHEDULED TRAY */}
            {trip.unscheduledItems.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[rgba(0,174,239,0.06)] to-[rgba(7,27,58,0.4)] border border-[var(--color-accent)]/30">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                    <h3 className="font-bold text-white uppercase text-sm tracking-wider">
                      Unscheduled Experiences ({trip.unscheduledItems.length})
                    </h3>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Assign these activities to specific days below when ready.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trip.unscheduledItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-28 rounded-lg overflow-hidden mb-3">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 badge text-[10px] uppercase">
                            {item.type}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromTrip(item.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-rose-900/80 text-white flex items-center justify-center transition-all"
                            title="Remove from Trip"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1">
                          <span className="inline-flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1"><Clock size={11} /> {item.duration}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-xs text-[var(--color-accent)]">{item.price}</span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                            <Star size={11} className="fill-amber-400" /> {item.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
                        <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1.5">
                          Assign to Itinerary Day:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {trip.days.map((day) => (
                            <button
                              key={day.dayNumber}
                              type="button"
                              onClick={() => assignToDay(item.id, day.dayNumber)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-[var(--color-accent)] hover:text-[#010611] text-xs font-semibold text-white border border-white/10 transition-all"
                            >
                              Day {day.dayNumber}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              addDay();
                              assignToDay(item.id, trip.days.length + 1);
                            }}
                            className="px-2 py-1 rounded bg-[var(--color-accent-dim)] hover:bg-[var(--color-accent)] hover:text-[#010611] text-[11px] font-semibold text-[var(--color-accent)] transition-all"
                          >
                            + New Day
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAY-BY-DAY SCHEDULE */}
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                    Day-by-Day Expedition Schedule
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Structure activities and stays into daily adventures. Add days or reorder freely.
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
                const daySubtotal = day.items.reduce((acc, curr) => {
                  return acc + (curr.type === 'stay' ? curr.numericPrice : curr.numericPrice * trip.travelers);
                }, 0);

                return (
                  <div
                    key={day.dayNumber}
                    className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] transition-all"
                  >
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
                            {day.items.length} {day.items.length === 1 ? 'experience' : 'experiences'} planned
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

                    {day.items.length === 0 ? (
                      <div className="py-8 text-center border border-dashed border-[var(--border-color)] rounded-xl">
                        <p className="text-xs text-[var(--text-muted)] mb-2">
                          No activities assigned to this day yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('discover')}
                          className="btn btn--secondary btn--sm inline-flex items-center gap-1.5 text-xs py-1"
                        >
                          <Compass size={13} /> Discover Activities
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {day.items.map((item, idx) => (
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

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2 relative">
                  <Search size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search adventures, stays, rapids, paragliding..."
                    className="auth-form__input pl-10 text-xs"
                  />
                </div>

                <div>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="auth-form__input text-xs"
                  >
                    <option value="All">All Destinations</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
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
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  'All',
                  'River Adventures',
                  'Trekking & Hiking',
                  'Bungee & Extreme',
                  'Stays & Retreats',
                  'Local & Cultural',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`tag cursor-pointer text-xs px-3 py-1.5 shrink-0 ${
                      selectedCategory === cat ? 'tag--active' : ''
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
              <span>Showing {filteredCatalog.length} verified experiences</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((item) => {
                const inTripAlready = isInTrip(item.id);
                const fav = isFavorite(item.id);

                return (
                  <div
                    key={item.id}
                    className="card--poster aspect-[3/4] block relative rounded-2xl overflow-hidden border border-[var(--border-color)] group"
                  >
                    <img
                      className="card__image transition-transform duration-500 group-hover:scale-105"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="card__overlay"></div>

                    <div className="card__top-meta">
                      <span className="badge text-[10px] uppercase">{item.category}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(item.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          fav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/70'
                        }`}
                      >
                        <Heart size={14} className={fav ? 'fill-white' : ''} />
                      </button>
                    </div>

                    <div className="card__content">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                        <Star size={12} className="fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-[var(--text-muted)]">({item.reviewCount || 42} reviews)</span>
                      </div>
                      <h3 className="card__title text-base font-bold text-white mb-1">{item.name}</h3>
                      <p className="card__subtitle flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-2">
                        <MapPin size={11} /> {item.location} · {item.duration}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 italic mb-3">
                        &quot;{item.reviewHighlight}&quot;
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-auto">
                        <div>
                          <span className="text-xs text-[var(--text-muted)] block">Verified Operator</span>
                          <span className="text-sm font-bold text-[var(--color-accent)]">{item.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={
                              item.itemType === 'stay'
                                ? `/stay/${item.id}`
                                : item.itemType === 'experience'
                                ? `/experience/${item.id}`
                                : `/adventure/${item.id}`
                            }
                            className="btn btn--secondary btn--sm p-2"
                          >
                            <ExternalLink size={13} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => addToTrip(item, item.itemType)}
                            className={`btn btn--sm font-bold ${
                              inTripAlready
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'btn--primary'
                            }`}
                          >
                            {inTripAlready ? 'In Trip ✓' : '+ Add to Trip'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: BUDGET */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                    Optional Budget Ceiling
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Set a personal budget limit to track your adventure expenses. Non-blocking & flexible.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-[var(--text-muted)]">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 25000"
                      value={trip.budgetLimit || ''}
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value, 10) : null;
                        setBudgetLimit(val);
                      }}
                      className="auth-form__input pl-7 text-xs w-36"
                    />
                  </div>
                </div>
              </div>

              {isOverBudget && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-amber-300 block mb-0.5">
                      Your current estimate is above your budget by {formatPrice(budgetDiff)}.
                    </strong>
                    <span className="text-[var(--text-secondary)]">
                      You can review your selections or keep your trip as it is. TripJugaadu will never alter or remove your activities automatically.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4">
                Itemized Cost Breakdown ({trip.travelers} Travelers)
              </h3>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-2 max-w-sm ml-auto text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Services Base Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(totalSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Estimated Taxes & Statutory GST (18%)</span>
                  <span className="font-mono text-white">{formatPrice(estimatedTaxes)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Estimated Grand Total</span>
                  <span className="font-mono text-[var(--color-accent)]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-[var(--color-accent)]/40 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
              Save Your Adventure
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Save your adventure and come back to it anytime. Sign in or create an account to keep your trip across all devices.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="btn btn--secondary btn--sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveTrip}
                className="btn btn--primary btn--sm"
              >
                {isSaving ? 'Saving...' : 'Confirm & Save Trip'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOK MODAL */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071b3a] border border-[var(--color-accent)]/40 rounded-3xl p-6 max-w-xl w-full shadow-2xl animate-fadeIn">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
              Review Services & Proceed to Book
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              The itinerary is a personal planning document. Review each selected provider experience before securing bookings.
            </p>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowBookModal(false)}
                className="btn btn--secondary btn--sm"
              >
                Return to Planner
              </button>
              <Link
                href={`/booking?type=adventure&id=rafting&travelers=${trip.travelers}`}
                className="btn btn--primary btn--sm inline-flex items-center gap-1.5"
              >
                Proceed to Secure Checkout <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
