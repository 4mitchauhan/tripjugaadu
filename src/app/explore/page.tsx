'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import { useTrip } from '@/context/TripContext';
import {
  Compass,
  MapPin,
  MountainSnow,
  Hotel,
  Sparkles,
  ArrowRight,
  Search,
  Star,
  SlidersHorizontal,
  Heart,
  X,
  RotateCcw,
  Clock,
  Waves,
  TreePine,
  Tent,
  Wind,
  Landmark,
  Coffee,
  Sparkle,
  Plus,
  Check,
  ChevronRight,
  Sliders
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
  durationTier: 'day' | 'short' | 'multi' | 'week';
  price: string;
  numericPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  href: string;
  tags: string[];
  isFeatured?: boolean;
}

// Build authoritative unified catalog from existing real data
const UNIFIED_CATALOG: CatalogItem[] = [
  ...DESTINATIONS.map((d): CatalogItem => ({
    id: d.id,
    name: d.name,
    location: d.name,
    region: d.region,
    type: 'Destination',
    category: d.category,
    duration: d.days,
    durationTier: d.days.includes('07') ? 'week' : d.days.includes('04') ? 'multi' : 'short',
    price: 'Explore',
    numericPrice: 0,
    rating: 4.9,
    reviews: d.id === 'rishikesh' ? 184 : d.id === 'ladakh' ? 210 : 142,
    image: d.image,
    description: d.description,
    href: `/destination/${d.id}`,
    tags: [d.name, d.region, 'Destination', ...(d.category.split(' / '))],
    isFeatured: d.id === 'rishikesh' || d.id === 'ladakh',
  })),
  ...ADVENTURES.map((a): CatalogItem => {
    const numericPrice = parseInt(a.price.replace(/[^\d]/g, ''), 10) || 3999;
    const isDay = a.duration.toLowerCase().includes('hour') || a.duration.toLowerCase().includes('min');
    const isMulti = a.duration.toLowerCase().includes('day');
    return {
      id: a.id,
      name: a.name,
      location: a.location,
      region: a.location === 'Rishikesh' ? 'Uttarakhand' : a.location === 'Bir Billing' || a.location === 'Manali' || a.location === 'Kasol' ? 'Himachal Pradesh' : 'Goa',
      type: 'Adventure',
      category: a.id === 'rafting' || a.id === 'scuba' ? 'Water Adventures' :
                a.id === 'trekking' ? 'Trekking & Hiking' :
                a.id === 'bungee' || a.id === 'paragliding' ? 'Air & Extreme' :
                a.id === 'camping' ? 'Camping & Stays' : 'Extreme Adrenaline',
      difficulty: a.difficulty,
      duration: a.duration,
      durationTier: isDay ? 'day' : isMulti ? 'multi' : 'short',
      price: a.price,
      numericPrice,
      rating: a.id === 'rafting' ? 4.9 : a.id === 'bungee' ? 4.9 : 4.8,
      reviews: a.id === 'rafting' ? 230 : a.id === 'paragliding' ? 190 : 120,
      image: a.image,
      description: a.description,
      href: `/adventure/${a.id}`,
      tags: [a.location, a.difficulty, 'Adventure', a.name],
      isFeatured: a.id === 'rafting' || a.id === 'trekking' || a.id === 'bungee',
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
      durationTier: 'short',
      price: s.price,
      numericPrice,
      rating: parseFloat(s.rating) || 4.7,
      reviews: 95,
      image: s.image,
      description: `${s.amenities.join(' · ')}. Premier verified property with exceptional Himalayan or coastal hospitality.`,
      href: `/stay/${s.id}`,
      tags: [s.location, 'Stay', ...s.amenities],
      isFeatured: s.id === 'riverside-retreat' || s.id === 'heritage-villa',
    };
  }),
  ...EXPERIENCES.map((e): CatalogItem => {
    const numericPrice = e.id === 'local-food' ? 1499 : e.id === 'culture' ? 2200 : e.id === 'wellness' ? 4500 : e.id === 'photography' ? 9500 : 2800;
    const isDay = e.duration.toLowerCase().includes('hour') || e.duration.toLowerCase().includes('half') || e.duration.toLowerCase().includes('full');
    return {
      id: e.id,
      name: e.name,
      location: e.location,
      region: e.location,
      type: 'Experience',
      category: e.id === 'wellness' ? 'Wellness & Solitude' :
                e.id === 'photography' ? 'High Altitude & Skies' :
                e.id === 'nature' ? 'Nature & Trails' : 'Cultural & Culinary',
      difficulty: 'All Levels',
      duration: e.duration,
      durationTier: isDay ? 'day' : 'multi',
      price: `₹${numericPrice.toLocaleString('en-IN')}`,
      numericPrice,
      rating: e.id === 'photography' ? 5.0 : 4.9,
      reviews: 86,
      image: e.image,
      description: e.description,
      href: `/experience/${e.id}`,
      tags: [e.location, 'Experience', e.name],
      isFeatured: e.id === 'local-food' || e.id === 'wellness' || e.id === 'photography',
    };
  }),
];

// Curated collections with real data items
const CURATED_COLLECTIONS = [
  {
    id: 'uttarakhand-gems',
    title: 'Hidden Gems of Uttarakhand & Parvati',
    subtitle: 'From thunderous Himalayan rapids and cliffside bungee jumps to peaceful riverside camping.',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200&q=80',
    itemIds: ['rafting', 'bungee', 'camping', 'riverside-retreat', 'wellness'],
  },
  {
    id: 'himalayan-expeditions',
    title: 'High Himalayan Peaks & Trails',
    subtitle: 'Trek across glacial alpine passes, fly over emerald valleys, and photograph starlit galaxies.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
    itemIds: ['trekking', 'paragliding', 'photography', 'mountain-lodge', 'ladakh'],
  },
  {
    id: 'heritage-solitude',
    title: 'Riverside Solitude & Heritage Retreats',
    subtitle: 'Unwind at tranquil ayurvedic riverside resorts, historic Goan villas, and artisanal tea hills.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    itemIds: ['heritage-villa', 'riverside-retreat', 'nature', 'culture', 'local-food'],
  },
];

// Quick interest categories with icons and counts
const INTEREST_CATEGORIES = [
  { id: 'water', label: 'Water Adventures', icon: Waves, query: 'Water', count: 3, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
  { id: 'trekking', label: 'Trekking & Hiking', icon: TreePine, query: 'Trekking', count: 3, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
  { id: 'camping', label: 'Camping & Stays', icon: Tent, query: 'Camping', count: 5, image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600&q=80' },
  { id: 'air', label: 'Air & Extreme', icon: Wind, query: 'Extreme', count: 3, image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80' },
  { id: 'culture', label: 'Cultural & Culinary', icon: Landmark, query: 'Culture', count: 4, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80' },
  { id: 'wellness', label: 'Wellness & Solitude', icon: Sparkle, query: 'Wellness', count: 2, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80' },
  { id: 'high-altitude', label: 'High Altitude Skies', icon: MountainSnow, query: 'Ladakh', count: 3, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80' },
  { id: 'weekend', label: 'Weekend Escapes', icon: Coffee, query: 'Rishikesh', count: 6, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleFavorite, isFavorite, addToTrip } = useTrip();

  // Search & Filter States initialized from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('q') || '');
  const [selectedType, setSelectedType] = useState<string>(searchParams?.get('type') || 'All');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams?.get('location') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(searchParams?.get('difficulty') || 'All');
  const [selectedDuration, setSelectedDuration] = useState<string>(searchParams?.get('duration') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(parseInt(searchParams?.get('maxPrice') || '15000', 10));
  const [sortBy, setSortBy] = useState<string>(searchParams?.get('sort') || 'recommended');

  // UI state
  const [activeCollectionId, setActiveCollectionId] = useState<string>(CURATED_COLLECTIONS[0].id);
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  // Sync state to URL without full refresh
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedType !== 'All') params.set('type', selectedType);
    if (selectedLocation !== 'All') params.set('location', selectedLocation);
    if (selectedDifficulty !== 'All') params.set('difficulty', selectedDifficulty);
    if (selectedDuration !== 'All') params.set('duration', selectedDuration);
    if (maxPrice < 15000) params.set('maxPrice', String(maxPrice));
    if (sortBy !== 'recommended') params.set('sort', sortBy);

    const queryString = params.toString();
    const targetUrl = queryString ? `/explore?${queryString}` : '/explore';
    window.history.replaceState(null, '', targetUrl);
  }, [searchTerm, selectedType, selectedLocation, selectedDifficulty, selectedDuration, maxPrice, sortBy]);

  // Handle hero quick search submit
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick chip click handler
  const handleChipClick = (query: string, typeFilter: string = 'All') => {
    setSearchTerm(query);
    if (typeFilter !== 'All') setSelectedType(typeFilter);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return UNIFIED_CATALOG.filter((item) => {
      // 1. Text Search Filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesDesc && !matchesTags && !matchesCat) {
          return false;
        }
      }

      // 2. Type Filter (All, Destinations, Adventures, Stays, Experiences)
      if (selectedType !== 'All') {
        if (selectedType === 'Destinations' && item.type !== 'Destination') return false;
        if (selectedType === 'Adventures' && item.type !== 'Adventure') return false;
        if (selectedType === 'Stays' && item.type !== 'Stay') return false;
        if (selectedType === 'Experiences' && item.type !== 'Experience') return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'All') {
        const itemLoc = (item.location + ' ' + (item.region || '')).toLowerCase();
        if (!itemLoc.includes(selectedLocation.toLowerCase())) return false;
      }

      // 4. Difficulty Filter
      if (selectedDifficulty !== 'All') {
        if (item.difficulty && item.difficulty !== selectedDifficulty && item.difficulty !== 'All Levels') {
          return false;
        }
      }

      // 5. Duration Filter
      if (selectedDuration !== 'All') {
        if (selectedDuration === 'day' && item.durationTier !== 'day') return false;
        if (selectedDuration === 'short' && item.durationTier !== 'short') return false;
        if (selectedDuration === 'multi' && item.durationTier !== 'multi') return false;
        if (selectedDuration === 'week' && item.durationTier !== 'week') return false;
      }

      // 6. Max Price Filter (Destinations always pass since they are gateways)
      if (item.numericPrice > 0 && maxPrice < 15000 && item.numericPrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.numericPrice - b.numericPrice;
      }
      if (sortBy === 'price-desc') {
        return b.numericPrice - a.numericPrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviews - a.reviews;
      }
      // 'recommended'
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  }, [searchTerm, selectedType, selectedLocation, selectedDifficulty, selectedDuration, maxPrice, sortBy]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedDifficulty('All');
    setSelectedDuration('All');
    setMaxPrice(15000);
    setSortBy('recommended');
    setVisibleCount(9);
  }, []);

  // Count active non-default filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedType !== 'All') count++;
    if (selectedLocation !== 'All') count++;
    if (selectedDifficulty !== 'All') count++;
    if (selectedDuration !== 'All') count++;
    if (maxPrice < 15000) count++;
    if (sortBy !== 'recommended') count++;
    return count;
  }, [searchTerm, selectedType, selectedLocation, selectedDifficulty, selectedDuration, maxPrice, sortBy]);

  // Wishlist toggle handler with toast
  const handleWishlistToggle = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(itemId);
  };

  // Add to trip handler
  const handleAddToTrip = (e: React.MouseEvent, item: CatalogItem) => {
    e.preventDefault();
    e.stopPropagation();
    addToTrip(
      {
        id: item.id,
        name: item.name,
        location: item.location,
        price: item.price,
        image: item.image,
        duration: item.duration,
        category: item.category,
      },
      item.type.toLowerCase() as any
    );
    setAddedItemFeedback(item.id);
    setTimeout(() => {
      setAddedItemFeedback((prev) => (prev === item.id ? null : prev));
    }, 2000);
  };

  const activeCollection = CURATED_COLLECTIONS.find((c) => c.id === activeCollectionId) || CURATED_COLLECTIONS[0];
  const activeCollectionItems = UNIFIED_CATALOG.filter((item) => activeCollection.itemIds.includes(item.id));

  return (
    <div className="pt-20 pb-24 overflow-x-hidden">
      {/* ── SECTION A: IMMERSIVE EXPLORE HERO ── */}
      <section className="explore-hero-wrapper relative text-center">
        <div className="explore-hero-backdrop" aria-hidden="true" />
        <div className="explore-hero-grid-pattern" aria-hidden="true" />

        <div className="container relative z-10 px-4">
          <div className="explore-hero__badge mb-4">
            <Sparkles size={14} className="text-[var(--color-accent)] animate-pulse" />
            <span>Gateway to the Subcontinent · Discovery & Expeditions</span>
          </div>

          <h1 className="explore-hero__title">
            Your Next Adventure <span className="text-[var(--color-accent)]">Starts Here</span>
          </h1>

          <p className="explore-hero__subtitle">
            Discover sacred river rapids, high-altitude passes, tranquil mountain eco-lodges, and vibrant heritage trails across India. Browse by mood, region, or expedition tier.
          </p>

          {/* Functional Hero Search Panel */}
          <form onSubmit={handleHeroSearch} className="explore-search-bar" role="search" aria-label="Explore Search">
            <div className="explore-search-input-wrap">
              <Search size={18} strokeWidth={2} className="text-[var(--color-accent)] shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search rafting, treks, stays, Kasol, Ladakh..."
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
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-sm cursor-pointer"
                style={{ appearance: 'none' }}
                aria-label="Filter by location"
              >
                <option value="All" style={{ background: '#071B3A', color: '#fff' }}>All Regions</option>
                <option value="Rishikesh" style={{ background: '#071B3A', color: '#fff' }}>Rishikesh (Uttarakhand)</option>
                <option value="Manali" style={{ background: '#071B3A', color: '#fff' }}>Manali (Himachal)</option>
                <option value="Ladakh" style={{ background: '#071B3A', color: '#fff' }}>Ladakh (Himalayas)</option>
                <option value="Goa" style={{ background: '#071B3A', color: '#fff' }}>Goa (Coastal)</option>
                <option value="Kasol" style={{ background: '#071B3A', color: '#fff' }}>Kasol (Parvati Valley)</option>
                <option value="Mussoorie" style={{ background: '#071B3A', color: '#fff' }}>Mussoorie (Queen of Hills)</option>
                <option value="Bir Billing" style={{ background: '#071B3A', color: '#fff' }}>Bir Billing (Air Sports)</option>
              </select>
            </div>

            <div className="explore-search-select-wrap">
              <Compass size={16} strokeWidth={2} className="text-[var(--color-accent)] shrink-0" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-sm cursor-pointer"
                style={{ appearance: 'none' }}
                aria-label="Filter by category"
              >
                <option value="All" style={{ background: '#071B3A', color: '#fff' }}>All Categories</option>
                <option value="Destinations" style={{ background: '#071B3A', color: '#fff' }}>Destinations</option>
                <option value="Adventures" style={{ background: '#071B3A', color: '#fff' }}>Adventures</option>
                <option value="Stays" style={{ background: '#071B3A', color: '#fff' }}>Handpicked Stays</option>
                <option value="Experiences" style={{ background: '#071B3A', color: '#fff' }}>Experiences</option>
              </select>
            </div>

            <button type="submit" className="btn btn--primary text-xs uppercase px-6 py-3 rounded-lg flex items-center justify-center gap-2">
              <span>Explore</span>
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </form>

          {/* Quick Discovery Chips */}
          <div className="explore-chips-container">
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mr-1">Trending:</span>
            {[
              { label: '🌊 Ganges Rafting', query: 'Rafting', type: 'Adventures' },
              { label: '🏔️ Himalayan Treks', query: 'Trekking', type: 'Adventures' },
              { label: '🏡 Riverside Stays', query: 'Riverside', type: 'Stays' },
              { label: '⛺ Parvati Camping', query: 'Camping', type: 'Adventures' },
              { label: '🪂 Paragliding Bir', query: 'Paragliding', type: 'Adventures' },
              { label: '💎 Hidden Valley Gems', query: 'Kasol', type: 'Destinations' },
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip.query, chip.type)}
                className="explore-chip"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION B: EXPLORE DESTINATIONS (Editorial Asymmetrical Layout) ── */}
      <section className="section py-16" id="destinations">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <MapPin size={13} strokeWidth={2} />
                <span>Iconic Landscapes</span>
              </span>
              <h2 className="explore-section-title">Where Will You Go Next?</h2>
              <p className="explore-section-subtitle">
                From glacial Himalayan heights to sacred river confluences and bohemian coastlines.
              </p>
            </div>
            <Link href="/destinations" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1.5">
              <span>View All Destinations ({DESTINATIONS.length})</span>
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <div className="dest-editorial-grid">
            {/* Featured Hero Card: Rishikesh */}
            <div className="dest-editorial-featured">
              <Link href="/destination/rishikesh" className="card--poster h-full block group relative">
                <img
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80"
                  alt="Rishikesh"
                  className="card__image"
                  loading="lazy"
                />
                <div className="card__overlay" />
                <div className="card__top-meta">
                  <span className="label label--accent">Featured Expedition</span>
                  <span className="label">03 Days · Uttarakhand</span>
                </div>
                <div className="card__content">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-400 flex items-center text-xs font-semibold gap-1">
                      <Star size={13} className="fill-amber-400" /> 4.9 (184 verified reviews)
                    </span>
                  </div>
                  <h3 className="card__title text-3xl md:text-5xl">Rishikesh</h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 max-w-xl mb-4">
                    The adventure capital of India, nestled in the foothills of the Himalayas along the sacred turquoise waters of the Ganges.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['White Water Rafting', '83m Fixed Bungee', 'Riverside Yoga', 'Ganga Aarti'].map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="card__cta text-sm font-semibold text-[var(--foreground-accent-high-contrast)] flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>Explore Full Destination Guide</span>
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Side Column: Ladakh & Manali */}
            <div className="dest-editorial-side-col">
              <div className="dest-editorial-side-card">
                <Link href="/destination/ladakh" className="card--poster h-full block group relative">
                  <img
                    src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80"
                    alt="Ladakh"
                    className="card__image"
                    loading="lazy"
                  />
                  <div className="card__overlay" />
                  <div className="card__top-meta">
                    <span className="label">07 Days</span>
                    <span className="label label--accent">Himalayas</span>
                  </div>
                  <div className="card__content">
                    <h3 className="card__title text-2xl md:text-3xl">Ladakh</h3>
                    <p className="card__subtitle">High Passes & Starlit Skies</p>
                    <span className="card__cta text-xs">Explore Destination <ArrowRight size={12} strokeWidth={2} /></span>
                  </div>
                </Link>
              </div>

              <div className="dest-editorial-side-card">
                <Link href="/destination/manali" className="card--poster h-full block group relative">
                  <img
                    src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
                    alt="Manali"
                    className="card__image"
                    loading="lazy"
                  />
                  <div className="card__overlay" />
                  <div className="card__top-meta">
                    <span className="label">04 Days</span>
                    <span className="label label--accent">Himachal Pradesh</span>
                  </div>
                  <div className="card__content">
                    <h3 className="card__title text-2xl md:text-3xl">Manali</h3>
                    <p className="card__subtitle">Pine Valleys & Alpine Treks</p>
                    <span className="card__cta text-xs">Explore Destination <ArrowRight size={12} strokeWidth={2} /></span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Bottom Row: Goa, Kasol, Mussoorie */}
            {[
              { d: DESTINATIONS[3], subtitle: 'Portuguese Heritage & Golden Shores' },
              { d: DESTINATIONS[4], subtitle: 'Parvati Valley Mountain Magic' },
              { d: DESTINATIONS[5], subtitle: 'Queen of the Hills & Misty Trails' },
            ].map(({ d, subtitle }) => (
              <div key={d.id} className="dest-editorial-bottom-card">
                <Link href={`/destination/${d.id}`} className="card--poster h-full block group relative">
                  <img src={d.image} alt={d.name} className="card__image" loading="lazy" />
                  <div className="card__overlay" />
                  <div className="card__top-meta">
                    <span className="label">{d.category}</span>
                    <span className="label label--accent">{d.days}</span>
                  </div>
                  <div className="card__content">
                    <h3 className="card__title text-2xl">{d.name}</h3>
                    <p className="card__subtitle">{subtitle}</p>
                    <span className="card__cta text-xs">Explore <ArrowRight size={12} strokeWidth={2} /></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION C: EXPLORE BY INTEREST (Category Discovery) ── */}
      <section className="section py-16 bg-gradient-to-b from-[#010611] via-[#071B3A]/40 to-[#010611]" id="interests">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <Compass size={13} strokeWidth={2} />
                <span>Curated By Activity</span>
              </span>
              <h2 className="explore-section-title">Choose Your Adventure Style</h2>
              <p className="explore-section-subtitle">
                Don't know where to go? Browse curated experience genres tailored to your travel mood.
              </p>
            </div>
            <button
              onClick={() => { setSelectedType('All'); setSearchTerm(''); const el = document.getElementById('catalog'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1.5"
            >
              <span>Browse All Categories</span>
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>

          <div className="interest-grid">
            {INTEREST_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleChipClick(cat.query)}
                  className="interest-card group"
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${cat.label}`}
                >
                  <div
                    className="interest-card__bg"
                    style={{ backgroundImage: `url(${cat.image})` }}
                    aria-hidden="true"
                  />
                  <div className="interest-card__overlay" aria-hidden="true" />
                  
                  <div className="interest-card__content">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                        <IconComp size={20} strokeWidth={2} />
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-[var(--text-secondary)] font-semibold backdrop-blur-sm">
                        {cat.count} Options
                      </span>
                    </div>

                    <h3 className="interest-card__title group-hover:text-[var(--color-accent)] transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <span>Instant Filter</span>
                      <ChevronRight size={12} strokeWidth={2} className="text-[var(--color-accent)]" />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION D: FEATURED ADVENTURES & EXPERIENCES ── */}
      <section className="section py-16" id="featured-adventures">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <Sparkles size={13} strokeWidth={2} />
                <span>Editor's Handpicked</span>
              </span>
              <h2 className="explore-section-title">Signature Indian Expeditions</h2>
              <p className="explore-section-subtitle">
                Verified certified guides, private local operators, and premier high-altitude experiences.
              </p>
            </div>
            <Link href="/adventures" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1.5">
              <span>View All Adventures ({ADVENTURES.length})</span>
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNIFIED_CATALOG.filter((i) => i.isFeatured && (i.type === 'Adventure' || i.type === 'Stay')).slice(0, 6).map((item) => {
              const saved = isFavorite(item.id);
              const isAdded = addedItemFeedback === item.id;
              return (
                <div key={item.id} className="card--poster aspect-[4/5] block group relative">
                  <img src={item.image} alt={item.name} className="card__image" loading="lazy" />
                  <div className="card__overlay" />

                  {/* Top Wishlist and Badges */}
                  <div className="card__top-meta flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="label label--accent">{item.difficulty || item.type}</span>
                      <span className="label flex items-center gap-1">
                        <Clock size={11} strokeWidth={2} /> {item.duration}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleWishlistToggle(e, item.id)}
                      className={`card-wishlist-btn ${saved ? 'card-wishlist-btn--active text-red-500 fill-red-500' : ''}`}
                      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart size={16} className={saved ? 'fill-red-500' : ''} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card__content">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[var(--text-muted)] flex items-center gap-1">
                        <MapPin size={12} strokeWidth={2} className="text-[var(--color-accent)]" />
                        {item.location}
                      </span>
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Star size={12} className="fill-amber-400" /> {item.rating}
                      </span>
                    </div>

                    <h3 className="card__title text-xl md:text-2xl mb-1.5">{item.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div>
                        <span className="text-xs text-[var(--text-muted)] block uppercase font-medium">Starting from</span>
                        <span className="text-base font-bold text-[var(--color-accent)]">{item.price}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddToTrip(e, item)}
                          className="btn btn--secondary btn--sm px-3 py-1.5 rounded text-xs flex items-center gap-1"
                          title="Add directly to your Trip Builder"
                        >
                          {isAdded ? <Check size={12} className="text-emerald-400" /> : <Plus size={12} />}
                          <span>{isAdded ? 'Added' : 'Trip'}</span>
                        </button>
                        <Link href={item.href} className="btn btn--primary btn--sm px-3 py-1.5 rounded text-xs flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight size={12} strokeWidth={2} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION E: HIDDEN GEMS & CURATED COLLECTIONS ── */}
      <section className="section py-16 bg-[#071B3A]/30 border-y border-white/5" id="collections">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <Sparkle size={13} strokeWidth={2} />
                <span>Off The Beaten Track</span>
              </span>
              <h2 className="explore-section-title">Curated Travel Collections</h2>
              <p className="explore-section-subtitle">
                Themed journeys for explorers looking for tranquil riverbeds, high alpine passes, and heritage serenity.
              </p>
            </div>
          </div>

          {/* Collection Selection Tabs */}
          <div className="collection-tabs" role="tablist">
            {CURATED_COLLECTIONS.map((col) => (
              <button
                key={col.id}
                role="tab"
                aria-selected={activeCollectionId === col.id}
                onClick={() => setActiveCollectionId(col.id)}
                className={`collection-tab-btn ${activeCollectionId === col.id ? 'collection-tab-btn--active' : ''}`}
              >
                {col.title}
              </button>
            ))}
          </div>

          {/* Active Collection Showcase */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[var(--bg-secondary)]/90 to-[var(--bg-primary)] border border-white/10 mb-8">
            <div className="max-w-2xl mb-6">
              <span className="badge mb-2">Featured Editorial Collection</span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-2">
                {activeCollection.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeCollection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {activeCollectionItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="card--poster aspect-[3/4] block group relative"
                >
                  <img src={item.image} alt={item.name} className="card__image" loading="lazy" />
                  <div className="card__overlay" />
                  <div className="card__top-meta">
                    <span className="label label--accent">{item.type}</span>
                    <span className="label">{item.location}</span>
                  </div>
                  <div className="card__content">
                    <h4 className="card__title text-lg md:text-xl mb-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-bold text-[var(--color-accent)]">{item.price}</span>
                      <span className="card__cta text-xs">Explore <ArrowRight size={11} strokeWidth={2} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION F: COMPLETE SEARCHABLE & FILTERABLE CATALOG ── */}
      <section className="section py-16" id="catalog">
        <div className="container px-4">
          <div className="explore-section-header">
            <div>
              <span className="explore-section-eyebrow">
                <Sliders size={13} strokeWidth={2} />
                <span>Interactive Directory</span>
              </span>
              <h2 className="explore-section-title">Complete Expedition Catalog</h2>
              <p className="explore-section-subtitle">
                Filter and compare 20+ verified adventures, handpicked stays, cultural experiences, and destinations across India.
              </p>
            </div>
            <div className="text-sm font-semibold text-[var(--foreground-accent-high-contrast)] flex items-center gap-2">
              <span>Showing {filteredItems.length} of {UNIFIED_CATALOG.length} experiences</span>
            </div>
          </div>

          {/* Catalog Toolbar */}
          <div className="catalog-toolbar">
            {/* Category Filter Pills */}
            <div className="flex gap-2.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
              {(['All', 'Destinations', 'Adventures', 'Stays', 'Experiences'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`tag cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                    selectedType === t
                      ? 'bg-[var(--color-accent)] text-[var(--bg-primary)] font-bold shadow-md shadow-[var(--color-accent)]/20'
                      : 'bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] border border-white/10'
                  }`}
                >
                  {t} ({t === 'All' ? UNIFIED_CATALOG.length : UNIFIED_CATALOG.filter((i) => i.type.startsWith(t.slice(0, 4))).length})
                </button>
              ))}
            </div>

            {/* Search Input, Sort & Filter Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Keyword Search */}
              <div className="md:col-span-6 flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-black/30 border border-white/15 focus-within:border-[var(--color-accent)] transition-colors">
                <Search size={16} strokeWidth={2} className="text-[var(--text-muted)] shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by keyword, location, or activity..."
                  className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-white placeholder:text-[var(--text-muted)] font-medium"
                />
                {searchTerm && (
                  <button type="button" onClick={() => setSearchTerm('')} className="text-[var(--text-muted)] hover:text-white" aria-label="Clear filter search">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="md:col-span-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-black/30 border border-white/15">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs text-white font-medium cursor-pointer"
                  style={{ appearance: 'none' }}
                  aria-label="Sort catalog by"
                >
                  <option value="recommended" style={{ background: '#071B3A', color: '#fff' }}>Recommended</option>
                  <option value="price-asc" style={{ background: '#071B3A', color: '#fff' }}>Price: Low to High</option>
                  <option value="price-desc" style={{ background: '#071B3A', color: '#fff' }}>Price: High to Low</option>
                  <option value="rating" style={{ background: '#071B3A', color: '#fff' }}>Highest Rated</option>
                  <option value="reviews" style={{ background: '#071B3A', color: '#fff' }}>Most Reviewed</option>
                </select>
              </div>

              {/* Filter Toggles */}
              <div className="md:col-span-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`btn flex-1 py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all ${
                    showAdvancedFilters || activeFiltersCount > 0
                      ? 'btn--primary'
                      : 'btn--secondary'
                  }`}
                >
                  <SlidersHorizontal size={13} strokeWidth={2} />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn btn--ghost px-3 py-2.5 rounded-lg text-xs flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
                    title="Reset all filters"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters Expandable Drawer on Desktop */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-200">
                {/* Destination Dropdown */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1.5">
                    Location / Region
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-xs text-white"
                  >
                    <option value="All">All Locations</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Manali">Manali</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Goa">Goa</option>
                    <option value="Kasol">Kasol</option>
                    <option value="Mussoorie">Mussoorie</option>
                    <option value="Bir Billing">Bir Billing</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Munnar">Munnar</option>
                  </select>
                </div>

                {/* Difficulty Dropdown */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-xs text-white"
                  >
                    <option value="All">All Tiers</option>
                    <option value="Easy">Easy</option>
                    <option value="Easy–Moderate">Easy–Moderate</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Moderate–Hard">Moderate–Hard</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>

                {/* Duration Dropdown */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1.5">
                    Duration
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-xs text-white"
                  >
                    <option value="All">Any Duration</option>
                    <option value="day">Day Trip (&lt; 1 Day)</option>
                    <option value="short">1–3 Days</option>
                    <option value="multi">4–7 Days</option>
                    <option value="week">7+ Days</option>
                  </select>
                </div>

                {/* Max Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Max Price:
                    </label>
                    <span className="text-xs font-bold text-[var(--color-accent)]">
                      {maxPrice >= 15000 ? 'Any Budget' : `₹${maxPrice.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                    className="w-full accent-[var(--color-accent)] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Active Filter Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
                <span className="text-[var(--text-muted)] font-medium">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Query: "{searchTerm}"
                    <button type="button" onClick={() => setSearchTerm('')}><X size={12} /></button>
                  </span>
                )}
                {selectedType !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Category: {selectedType}
                    <button type="button" onClick={() => setSelectedType('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedLocation !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Location: {selectedLocation}
                    <button type="button" onClick={() => setSelectedLocation('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedDifficulty !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Tier: {selectedDifficulty}
                    <button type="button" onClick={() => setSelectedDifficulty('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedDuration !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Duration: {selectedDuration}
                    <button type="button" onClick={() => setSelectedDuration('All')}><X size={12} /></button>
                  </span>
                )}
                {maxPrice < 15000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                    Under ₹{maxPrice.toLocaleString('en-IN')}
                    <button type="button" onClick={() => setMaxPrice(15000)}><X size={12} /></button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[var(--text-muted)] hover:text-white underline ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Results Grid */}
          {filteredItems.length > 0 ? (
            <>
              <div className="catalog-card-grid">
                {filteredItems.slice(0, visibleCount).map((item) => {
                  const saved = isFavorite(item.id);
                  const isAdded = addedItemFeedback === item.id;
                  return (
                    <div key={item.id} className="card--poster aspect-[4/5] block group relative">
                      <img src={item.image} alt={item.name} className="card__image" loading="lazy" />
                      <div className="card__overlay" />

                      {/* Top Wishlist and Badges */}
                      <div className="card__top-meta flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="label label--accent">{item.type}</span>
                          {item.difficulty && <span className="label">{item.difficulty}</span>}
                          <span className="label flex items-center gap-1">
                            <Clock size={10} strokeWidth={2} /> {item.duration}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleWishlistToggle(e, item.id)}
                          className={`card-wishlist-btn ${saved ? 'card-wishlist-btn--active text-red-500 fill-red-500' : ''}`}
                          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart size={16} className={saved ? 'fill-red-500' : ''} />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="card__content">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-[var(--text-muted)] flex items-center gap-1">
                            <MapPin size={12} strokeWidth={2} className="text-[var(--color-accent)]" />
                            {item.location}
                          </span>
                          <span className="text-amber-400 flex items-center gap-1 font-semibold">
                            <Star size={12} className="fill-amber-400" /> {item.rating}
                          </span>
                        </div>

                        <h3 className="card__title text-xl md:text-2xl mb-1.5">{item.name}</h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div>
                            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-medium">Pricing</span>
                            <span className="text-sm font-bold text-[var(--color-accent)]">{item.price}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.type !== 'Destination' && (
                              <button
                                type="button"
                                onClick={(e) => handleAddToTrip(e, item)}
                                className="btn btn--secondary btn--sm px-2.5 py-1.5 rounded text-xs flex items-center gap-1"
                                title="Add to Trip Builder"
                              >
                                {isAdded ? <Check size={11} className="text-emerald-400" /> : <Plus size={11} />}
                                <span>{isAdded ? 'Added' : 'Trip'}</span>
                              </button>
                            )}
                            <Link href={item.href} className="btn btn--primary btn--sm px-3 py-1.5 rounded text-xs flex items-center gap-1">
                              <span>Details</span>
                              <ArrowRight size={11} strokeWidth={2} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredItems.length && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="btn btn--secondary btn--lg px-8 py-3.5 rounded-xl inline-flex items-center gap-2"
                  >
                    <span>Load More Experiences ({filteredItems.length - visibleCount} remaining)</span>
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 rounded-2xl bg-black/30 border border-white/10 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/30 mx-auto flex items-center justify-center text-[var(--color-accent)] mb-4">
                <Compass size={28} strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-bold uppercase text-white mb-2">No Matching Expeditions Found</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                We couldn't find any experiences matching your current filter combination. Try broadening your criteria or resetting filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn--primary px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION G: JOURNEY PLANNER CTA ── */}
      <section className="section py-12">
        <div className="container px-4">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-deep)] to-[var(--bg-primary)] border border-[var(--border-color)] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-at-c from-[var(--color-accent)]/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="badge mb-3">Custom Route Architect</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white mb-4">
                Design Your Tailored Indian Journey
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-8">
                Combine high-altitude treks, white-water rapids, and serene heritage retreats into a seamless, day-by-day expedition with live budget and transit calculation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/trip-builder" className="btn btn--primary btn--lg px-8 py-3.5 inline-flex items-center gap-2">
                  <span>Launch Trip Builder</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link href="/itinerary" className="btn btn--secondary btn--lg px-8 py-3.5 inline-flex items-center gap-2">
                  <span>View Sample Itineraries</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">Loading Explore Experiences...</p>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
