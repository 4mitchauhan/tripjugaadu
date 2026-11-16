'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import { useTrip } from '@/context/TripContext';
import {
  Compass,
  MapPin,
  MountainSnow,
  Sparkles,
  ArrowRight,
  Search,
  Star,
  Heart,
  X,
  RotateCcw,
  Clock,
  Waves,
  TreePine,
  Tent,
  Wind,
  Plus,
  Check,
  ChevronRight,
  SlidersHorizontal,
  Navigation as NavIcon
} from 'lucide-react';

export interface CatalogItem {
  id: string;
  name: string;
  location: string;
  region?: string;
  type: 'Destination' | 'Adventure' | 'Stay' | 'Experience';
  category: string;
  difficulty?: string;
  duration: string;
  price: string;
  numericPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  href: string;
  tags: string[];
}

export interface WallPlace {
  id: string;
  name: string;
  region: string;
  vibe: 'Himalayan' | 'Valleys' | 'Coastal' | 'Hidden';
  duration: string;
  rating: number;
  reviews: number;
  rank: string;
  image: string;
  description: string;
  highlights: string[];
  href: string;
}

// ── THE WALL OF MUST-EXPLORE PLACES (9 Iconic Subcontinent Wonders) ──
const MUST_EXPLORE_PLACES: WallPlace[] = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    region: 'Uttarakhand',
    vibe: 'Valleys',
    duration: '03 Days / 02 Nights',
    rating: 4.9,
    reviews: 184,
    rank: '#01 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    description: 'The adventure capital of India, nestled along the turquoise Ganges with white-water rapids and cliffside bungee jumps.',
    highlights: ['🌊 Grade IV Rapids', '🪂 83m Fixed Bungee', '🧘 Sunset Ganga Aarti'],
    href: '/destination/rishikesh',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    region: 'Jammu & Kashmir / Ladakh',
    vibe: 'Himalayan',
    duration: '07 Days / 06 Nights',
    rating: 5.0,
    reviews: 210,
    rank: '#02 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    description: 'The raw rooftop of the world — high alpine mountain passes, starlit galactic skies, and crystalline glacial lakes.',
    highlights: ['🏔️ Khardung La 18,380ft', '🌌 Starlit Milky Way', '🧊 Pangong Tso Lake'],
    href: '/destination/ladakh',
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh',
    vibe: 'Himalayan',
    duration: '04 Days / 03 Nights',
    rating: 4.8,
    reviews: 160,
    rank: '#03 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    description: 'Pine-scented alpine valleys, high-altitude Rohtang passes, and raging river runs beneath jagged snow peaks.',
    highlights: ['🌲 Solang Pine Valley', '⛷️ Rohtang Snow Passes', '🎒 Beas River Trails'],
    href: '/destination/manali',
  },
  {
    id: 'kasol',
    name: 'Kasol & Parvati',
    region: 'Himachal Pradesh',
    vibe: 'Valleys',
    duration: '03 Days / 02 Nights',
    rating: 4.9,
    reviews: 135,
    rank: '#04 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80',
    description: 'A mythic valley of mist, hot sulfur springs, pine forests, and transcendent mountain trails leading to Kheerganga.',
    highlights: ['♨️ Kheerganga Hot Springs', '⛺ Riverside Alpine Camps', '🌿 Tosh & Malana Trails'],
    href: '/destination/kasol',
  },
  {
    id: 'goa',
    name: 'Goa Coastal',
    region: 'Western India',
    vibe: 'Coastal',
    duration: '04 Days / 03 Nights',
    rating: 4.8,
    reviews: 192,
    rank: '#05 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    description: 'Secluded golden beaches, Portuguese colonial architecture, bohemian sunset markets, and crystal coastal scuba.',
    highlights: ['🏖️ Palolem & Cola Bay', '🏛️ Portuguese Baroque', '🏄 Scuba & Water Trails'],
    href: '/destination/goa',
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    region: 'Uttarakhand',
    vibe: 'Coastal',
    duration: '03 Days / 02 Nights',
    rating: 4.7,
    reviews: 110,
    rank: '#06 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    description: 'The historic Queen of Hills — panoramic Himalayan sunsets, the famous winterline horizon, and misty pine trails.',
    highlights: ['🌁 Winterline Horizon', '🌲 Benog Sanctuary', '🏡 Heritage Mountain Homes'],
    href: '/destination/mussoorie',
  },
  {
    id: 'bir-billing',
    name: 'Bir Billing',
    region: 'Himachal Pradesh',
    vibe: 'Himalayan',
    duration: '03 Days / 02 Nights',
    rating: 4.9,
    reviews: 140,
    rank: '#07 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    description: 'World-renowned paragliding capital where you soar above emerald Tibetan monasteries and Dhauladhar cliffs.',
    highlights: ['🪂 2400m Thermal Flights', '🛕 Chokling Monastery', '☕ Organic Tea Gardens'],
    href: '/adventure/paragliding',
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    region: 'Himachal Pradesh',
    vibe: 'Hidden',
    duration: '06 Days / 05 Nights',
    rating: 5.0,
    reviews: 178,
    rank: '#08 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'The Middle Land between Tibet and India — 1000-year-old cliffside monasteries, lunar landscapes, and fossil villages.',
    highlights: ['🏰 1000yr Key Monastery', '🌙 Chandra Taal Crescent', '🚙 High Pass 4x4 Overland'],
    href: '/destination/ladakh',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    region: 'Northeast India',
    vibe: 'Hidden',
    duration: '05 Days / 04 Nights',
    rating: 4.9,
    reviews: 165,
    rank: '#09 MUST EXPLORE',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
    description: 'The Abode of Clouds — living bio-engineered root bridges, thunderous jungle waterfalls, and subterranean caves.',
    highlights: ['🌿 Double Decker Root Bridge', '💧 Nohkalikai Falls', '🛶 Crystal Dawki River'],
    href: '/adventure/trekking',
  },
];

// Unified catalog derived from data.ts
const UNIFIED_CATALOG: CatalogItem[] = [
  ...ADVENTURES.map((a): CatalogItem => {
    const numericPrice = parseInt(a.price.replace(/[^\d]/g, ''), 10) || 3999;
    return {
      id: a.id,
      name: a.name,
      location: a.location,
      region: a.location === 'Rishikesh' ? 'Uttarakhand' : a.location === 'Goa' ? 'Western India' : 'Himachal Pradesh',
      type: 'Adventure',
      category: a.id === 'rafting' || a.id === 'scuba' ? 'Water Sports' :
                a.id === 'trekking' ? 'Trekking & Hiking' :
                a.id === 'bungee' || a.id === 'paragliding' ? 'Air & Extreme' : 'Camping & Outdoors',
      difficulty: a.difficulty,
      duration: a.duration,
      price: a.price,
      numericPrice,
      rating: a.id === 'rafting' ? 4.9 : a.id === 'bungee' ? 4.9 : 4.8,
      reviews: a.id === 'rafting' ? 230 : a.id === 'paragliding' ? 190 : 120,
      image: a.image,
      description: a.description,
      href: `/adventure/${a.id}`,
      tags: [a.location, a.difficulty, 'Adventure'],
    };
  }),
  ...STAYS.map((s): CatalogItem => {
    const numericPrice = parseInt(s.price.replace(/[^\d]/g, ''), 10) || 4999;
    return {
      id: s.id,
      name: s.name,
      location: s.location,
      region: s.location === 'Rishikesh' ? 'Uttarakhand' : s.location === 'Goa' ? 'Western India' : 'Himachal Pradesh',
      type: 'Stay',
      category: 'Boutique & Eco-Stays',
      difficulty: 'Comfort',
      duration: 'Nightly',
      price: s.price,
      numericPrice,
      rating: parseFloat(s.rating) || 4.7,
      reviews: 95,
      image: s.image,
      description: `${s.amenities.join(' · ')}. Premier verified sanctuary with authentic Himalayan or coastal hospitality.`,
      href: `/stay/${s.id}`,
      tags: [s.location, 'Stay', ...s.amenities.slice(0, 2)],
    };
  }),
  ...EXPERIENCES.map((e): CatalogItem => {
    const numericPrice = e.id === 'local-food' ? 1499 : e.id === 'culture' ? 2200 : e.id === 'wellness' ? 4500 : 2800;
    return {
      id: e.id,
      name: e.name,
      location: e.location,
      region: e.location === 'Rishikesh' ? 'Uttarakhand' : 'Himachal Pradesh',
      type: 'Experience',
      category: e.id === 'wellness' ? 'Wellness & Solitude' : 'Cultural & Culinary',
      difficulty: 'All Levels',
      duration: e.duration,
      price: `₹${numericPrice.toLocaleString('en-IN')}`,
      numericPrice,
      rating: 4.9,
      reviews: 86,
      image: e.image,
      description: e.description,
      href: `/experience/${e.id}`,
      tags: [e.location, 'Experience'],
    };
  }),
];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleFavorite, isFavorite, addToTrip, isInTrip } = useTrip();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('q') || '');
  const [selectedType, setSelectedType] = useState<string>(searchParams?.get('type') || 'All');
  const [selectedRegion, setSelectedRegion] = useState<string>(searchParams?.get('region') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(searchParams?.get('difficulty') || 'All');
  const [sortBy, setSortBy] = useState<string>(searchParams?.get('sort') || 'recommended');
  
  // Wall of Places Filter state
  const [wallFilter, setWallFilter] = useState<'All' | 'Himalayan' | 'Valleys' | 'Coastal' | 'Hidden'>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedType !== 'All') params.set('type', selectedType);
    if (selectedRegion !== 'All') params.set('region', selectedRegion);
    if (selectedDifficulty !== 'All') params.set('difficulty', selectedDifficulty);
    if (sortBy !== 'recommended') params.set('sort', sortBy);

    const qs = params.toString();
    const url = qs ? `/explore?${qs}` : '/explore';
    window.history.replaceState(null, '', url);
  }, [searchTerm, selectedType, selectedRegion, selectedDifficulty, sortBy]);

  // Filtered Wall of Places
  const filteredWallPlaces = useMemo(() => {
    if (wallFilter === 'All') return MUST_EXPLORE_PLACES;
    return MUST_EXPLORE_PLACES.filter((p) => p.vibe === wallFilter);
  }, [wallFilter]);

  // Filtered Catalog
  const filteredCatalog = useMemo(() => {
    return UNIFIED_CATALOG.filter((item) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesCat && !matchesDesc) return false;
      }
      if (selectedType !== 'All') {
        if (selectedType === 'Adventures' && item.type !== 'Adventure') return false;
        if (selectedType === 'Stays' && item.type !== 'Stay') return false;
        if (selectedType === 'Experiences' && item.type !== 'Experience') return false;
      }
      if (selectedRegion !== 'All') {
        const matchRegion = (item.region || item.location).toLowerCase();
        if (!matchRegion.includes(selectedRegion.toLowerCase())) return false;
      }
      if (selectedDifficulty !== 'All') {
        if (item.difficulty && item.difficulty !== selectedDifficulty && item.difficulty !== 'All Levels') {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-high') return b.numericPrice - a.numericPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [searchTerm, selectedType, selectedRegion, selectedDifficulty, sortBy]);

  const handleFilterByPlace = (placeName: string) => {
    setSearchTerm(placeName);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddPlaceToTrip = (place: WallPlace) => {
    addToTrip({
      id: `place-${place.id}`,
      name: `${place.name} Exploration`,
      location: place.name,
      price: 'Included',
      numericPrice: 0,
      image: place.image,
      duration: place.duration,
      type: 'adventure',
      category: 'Destination Blueprint',
      rating: place.rating,
      reviews: place.reviews,
    }, 'adventure');
    setAddedItemFeedback(`${place.name} Expedition`);
    setTimeout(() => setAddedItemFeedback(null), 3000);
  };

  const handleAddTrip = (item: CatalogItem) => {
    addToTrip({
      id: item.id,
      title: item.name,
      location: item.location,
      price: item.price,
      image: item.image,
      category: item.type.toLowerCase() as any,
    });
    setAddedItemFeedback(item.name);
    setTimeout(() => setAddedItemFeedback(null), 3000);
  };

  const isAnyFilterActive = searchTerm || selectedType !== 'All' || selectedRegion !== 'All' || selectedDifficulty !== 'All';

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedRegion('All');
    setSelectedDifficulty('All');
    setSortBy('recommended');
  };

  return (
    <div className="pt-20 pb-24 bg-[#010611] text-[#F4F7FA]">
      {/* ── TOAST NOTIFICATION ── */}
      {addedItemFeedback && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-white shadow-2xl backdrop-blur-md animate-bounce">
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">Added <strong className="text-emerald-300">{addedItemFeedback}</strong> to your trip itinerary!</span>
        </div>
      )}

      {/* ── SECTION 1: IMMERSIVE DISCOVERY HERO ── */}
      <section className="explore-hero-wrapper">
        <div className="explore-hero-backdrop" />
        <div className="explore-hero-grid-pattern" />

        <div className="container relative z-10 px-4 text-center max-w-5xl mx-auto">
          <div className="explore-hero__badge">
            <Sparkles size={14} className="text-[var(--color-accent)] animate-pulse" />
            <span>Curated Subcontinent Discovery</span>
          </div>

          <h1 className="explore-hero__title">
            UNLEASH YOUR NEXT EXPEDITION
          </h1>

          <p className="explore-hero__subtitle">
            From thunderous Himalayan rapids and high passes to secluded coastal sanctuaries — travel smarter, explore deeper.
          </p>

          {/* Unified Compact Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const catEl = document.getElementById('catalog');
              if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="explore-search-bar"
          >
            <div className="explore-search-input-wrap">
              <Search size={18} strokeWidth={2} className="text-[var(--color-accent)] shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search places, rafting, treks, Kasol, Ladakh..."
                className="w-full bg-transparent border-none outline-none text-white text-sm font-medium placeholder:text-[var(--text-muted)]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-[var(--text-muted)] hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="explore-search-select-wrap">
              <MapPin size={16} strokeWidth={2} className="text-[var(--color-accent)] shrink-0" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-sm cursor-pointer"
                style={{ appearance: 'none' }}
                aria-label="Filter by region"
              >
                <option value="All" style={{ background: '#071B3A', color: '#fff' }}>All Regions</option>
                <option value="Uttarakhand" style={{ background: '#071B3A', color: '#fff' }}>Uttarakhand</option>
                <option value="Himachal" style={{ background: '#071B3A', color: '#fff' }}>Himachal Pradesh</option>
                <option value="Ladakh" style={{ background: '#071B3A', color: '#fff' }}>Ladakh & Zanskar</option>
                <option value="Goa" style={{ background: '#071B3A', color: '#fff' }}>Coastal Goa</option>
              </select>
            </div>

            <button type="submit" className="btn btn--primary text-xs uppercase px-7 py-3 rounded-lg flex items-center justify-center gap-2">
              <span>Search</span>
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </form>

          {/* Quick Discovery Chips */}
          <div className="explore-chips-container mt-4">
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mr-1">Trending:</span>
            {[
              { label: '🌊 Ganges Rafting', query: 'Rishikesh' },
              { label: '🏔️ High Passes', query: 'Ladakh' },
              { label: '🪂 Paragliding', query: 'Bir Billing' },
              { label: '🌲 Parvati Valleys', query: 'Kasol' },
              { label: '🏖️ Golden Shores', query: 'Goa' },
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleFilterByPlace(chip.query)}
                className="explore-chip"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE WALL OF MUST-EXPLORE PLACES (THE SHOWSTOPPER) ── */}
      <section className="section py-16" id="places-wall">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <MapPin size={13} strokeWidth={2} />
                <span>Must-Explore Places of India</span>
              </span>
              <h2 className="explore-section-title">THE EXPLORER'S WALL</h2>
              <p className="explore-section-subtitle">
                Nine iconic landscapes across the subcontinent that demand to be experienced in this lifetime. Each place hand-selected with verified adventures.
              </p>
            </div>
            <Link
              href="/destinations"
              className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1.5"
            >
              <span>Explore All Destinations ({DESTINATIONS.length})</span>
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          {/* Interactive Wall Filter Pills */}
          <div className="places-wall-filter-bar">
            {[
              { id: 'All', label: 'All Must-Explore (9)' },
              { id: 'Himalayan', label: '🏔️ Himalayan Summits' },
              { id: 'Valleys', label: '🌊 Sacred Rapids & Valleys' },
              { id: 'Coastal', label: '🏖️ Coastal & Heritage' },
              { id: 'Hidden', label: '🌿 Off-the-Grid Hidden' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setWallFilter(tab.id as any)}
                className={`places-wall-filter-btn ${wallFilter === tab.id ? 'places-wall-filter-btn--active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* The Wall Grid: Strict Proportional 16:10 Fitted Cards */}
          <div className="places-wall-grid">
            {filteredWallPlaces.map((place) => {
              const favorited = isFavorite(place.id);
              return (
                <div key={place.id} className="place-wall-card group">
                  <div className="place-wall-card__media">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="place-wall-card__img"
                      loading="lazy"
                    />
                    <div className="place-wall-card__gradient" />

                    {/* Top Row: Rank Badge & Wishlist Heart */}
                    <div className="place-wall-card__top">
                      <span className="place-wall-card__rank">{place.rank}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(place.id);
                        }}
                        className={`card-wishlist-btn ${favorited ? 'card-wishlist-btn--active' : ''}`}
                        aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={16} className={favorited ? 'fill-red-500 text-red-500' : ''} />
                      </button>
                    </div>

                    {/* Bottom Content Body */}
                    <div className="place-wall-card__body">
                      <div className="place-wall-card__location">
                        <MapPin size={11} strokeWidth={2.5} />
                        <span>{place.region} · {place.duration}</span>
                      </div>

                      <h3 className="place-wall-card__title">{place.name}</h3>
                      <p className="place-wall-card__desc">{place.description}</p>

                      {/* Highlights */}
                      <div className="place-wall-card__tags">
                        {place.highlights.map((h, i) => (
                          <span key={i} className="place-wall-card__tag">
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Card Actions */}
                      <div className="place-wall-card__actions">
                        <Link href={place.href} className="place-wall-card__cta">
                          <span>Explore Place</span>
                          <ArrowRight size={13} strokeWidth={2} />
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddPlaceToTrip(place);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              isInTrip(`place-${place.id}`)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black'
                            }`}
                          >
                            <Plus size={12} />
                            <span>{isInTrip(`place-${place.id}`) ? 'In Trip ✓' : '+ Add to Trip Plan'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFilterByPlace(place.name)}
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--color-accent)] font-semibold transition-colors flex items-center gap-1 p-1"
                            title="Filter expeditions in this place"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SIMPLIFIED EXPEDITIONS & STAYS DIRECTORY ── */}
      <section className="section py-16" id="catalog">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <Compass size={13} strokeWidth={2} />
                <span>Unified Catalog</span>
              </span>
              <h2 className="explore-section-title">EXPEDITION & STAYS DIRECTORY</h2>
              <p className="explore-section-subtitle">
                Verified adventures, high alpine treks, boutique lodges, and authentic local experiences.
              </p>
            </div>

            {isAnyFilterActive && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/30 transition-all"
              >
                <RotateCcw size={12} />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Clean Directory Controls */}
          <div className="catalog-toolbar">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'All', label: 'All Catalog' },
                  { id: 'Adventures', label: 'Adventures' },
                  { id: 'Stays', label: 'Stays' },
                  { id: 'Experiences', label: 'Experiences' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      selectedType === type.id
                        ? 'bg-[var(--color-accent)] text-[var(--bg-primary)] shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Right Dropdowns */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-[#030B1C] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
                  aria-label="Filter by Region"
                >
                  <option value="All">All Regions</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Himachal">Himachal Pradesh</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Goa">Goa</option>
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#030B1C] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
                  aria-label="Filter by Difficulty"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Extreme">Extreme</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#030B1C] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
                  aria-label="Sort Results"
                >
                  <option value="recommended">Featured / Recommended</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto">
              <Compass size={40} className="text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No expeditions match your criteria</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Try searching for a different region, or clear your filters to explore everything.
              </p>
              <button type="button" onClick={resetAllFilters} className="btn btn--primary text-xs uppercase px-6 py-2.5 rounded-lg">
                View All Expeditions
              </button>
            </div>
          ) : (
            <div className="catalog-card-grid">
              {filteredCatalog.slice(0, visibleCount).map((item) => {
                const favorited = isFavorite(item.id);
                return (
                  <div key={item.id} className="card--poster flex flex-col group relative overflow-hidden rounded-xl border border-white/10 bg-[#071026] transition-all hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30">
                    {/* Media Container with Fixed 16:10 Aspect Ratio */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071026] via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                          {item.type}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className={`card-wishlist-btn !top-0 !right-0 ${favorited ? 'card-wishlist-btn--active' : ''}`}
                          aria-label={favorited ? 'Remove favorite' : 'Add favorite'}
                        >
                          <Heart size={15} className={favorited ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                      </div>

                      {/* Category Label */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="text-[11px] font-semibold text-white/90 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-white/60 mb-1.5">
                          <span className="flex items-center gap-1 font-medium text-cyan-400">
                            <MapPin size={11} /> {item.location}
                          </span>
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star size={11} className="fill-amber-400" /> {item.rating} ({item.reviews})
                          </span>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          <Link href={item.href}>{item.name}</Link>
                        </h4>

                        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Info & Actions */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-white/50 uppercase tracking-wider block">Price</span>
                          <span className="text-base font-bold text-white font-mono">{item.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddTrip(item)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 transition-all"
                            title="Add to Trip Plan"
                            aria-label="Add to Trip Plan"
                          >
                            <Plus size={15} />
                          </button>
                          <Link
                            href={item.href}
                            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-1"
                          >
                            <span>Explore</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredCatalog.length && (
            <div className="text-center mt-12">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="btn btn--secondary text-xs uppercase px-8 py-3 rounded-full hover:border-cyan-400"
              >
                Load More Expeditions ({filteredCatalog.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: TRIP BUILDER CTA ── */}
      <section className="container px-4 mt-12">
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/80 to-cyan-950/70 border border-cyan-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-950/40">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 block mb-2">
              Build Your Trip
            </span>
            <h3 className="font-display text-3xl md:text-5xl text-white mb-3">
              CRAFT YOUR TAILORED EXPEDITION
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Mix and match high-altitude treks, white-water runs, and boutique mountain retreats to create your own itinerary.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/trip-builder" className="btn btn--primary text-xs uppercase px-7 py-3 rounded-xl flex items-center justify-center gap-2">
              <span>Start Trip Builder</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/itinerary" className="btn btn--secondary text-xs uppercase px-7 py-3 rounded-xl flex items-center justify-center gap-2">
              <span>View Itineraries</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#010611] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Compass className="animate-spin text-[var(--color-accent)]" size={24} />
          <span className="text-sm font-semibold tracking-wider uppercase">Loading Explorer Wall...</span>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
