'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import { Search, Star, ArrowRight, RotateCcw } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();

  const queryQ = searchParams?.get('q') || '';
  const queryCategory = searchParams?.get('category') || 'All';
  const queryBudget = searchParams?.get('budget');
  const initialBudget = queryBudget ? parseInt(queryBudget, 10) : 50000;

  const [searchTerm, setSearchTerm] = useState(queryQ || 'Rishikesh');
  const [category, setCategory] = useState<string>(queryCategory);
  const [maxPrice, setMaxPrice] = useState<number>(initialBudget);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevant');

  useEffect(() => {
    if (queryQ) setSearchTerm(queryQ);
    if (queryCategory) setCategory(queryCategory);
    if (queryBudget) setMaxPrice(parseInt(queryBudget, 10));
  }, [queryQ, queryCategory, queryBudget]);

  // Build unified item pool
  const allItems = [
    ...DESTINATIONS.map(d => ({
      id: d.id,
      name: d.name,
      location: d.region,
      type: 'Destination',
      category: d.category,
      difficulty: 'All Levels',
      duration: d.days,
      price: 'Explore',
      numericPrice: 0,
      rating: 4.9,
      image: d.image,
      href: `/destination/${d.id}`
    })),
    ...ADVENTURES.map(a => {
      const numericPrice = parseInt(a.price.replace(/[^\d]/g, ''), 10) || 4000;
      return {
        id: a.id,
        name: a.name,
        location: a.location,
        type: 'Adventure',
        category: 'Adventures',
        difficulty: a.difficulty,
        duration: a.duration,
        price: a.price,
        numericPrice,
        rating: 4.8,
        image: a.image,
        href: `/adventure/${a.id}`
      };
    }),
    ...STAYS.map(s => {
      const numericPrice = parseInt(s.price.replace(/[^\d]/g, ''), 10) || 5000;
      return {
        id: s.id,
        name: s.name,
        location: s.location,
        type: 'Stay',
        category: 'Stays',
        difficulty: 'Comfort',
        duration: 'Nightly',
        price: s.price,
        numericPrice,
        rating: parseFloat(s.rating) || 4.7,
        image: s.image,
        href: `/stay/${s.id}`
      };
    }),
    ...EXPERIENCES.map(e => ({
      id: e.id,
      name: e.name,
      location: e.location,
      type: 'Experience',
      category: 'Experiences',
      difficulty: 'All Levels',
      duration: e.duration,
      price: '₹2,499',
      numericPrice: 2499,
      rating: 4.9,
      image: e.image,
      href: `/experience/${e.id}`
    }))
  ];

  // Filtering
  const filtered = allItems.filter(item => {
    // Search keyword
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchType = item.type.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchType) return false;
    }

    // Category
    if (category !== 'All') {
      if (category === 'Adventures' && item.type !== 'Adventure') return false;
      if (category === 'Destinations' && item.type !== 'Destination') return false;
      if (category === 'Stays' && item.type !== 'Stay') return false;
      if (category === 'Experiences' && item.type !== 'Experience') return false;
    }

    // Price
    if (item.numericPrice > maxPrice) return false;

    // Difficulty
    if (selectedDifficulty.length > 0) {
      if (!selectedDifficulty.includes(item.difficulty)) return false;
    }

    // Rating
    if (item.rating < minRating) return false;

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.numericPrice - b.numericPrice;
    if (sortBy === 'priceDesc') return b.numericPrice - a.numericPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // 'relevant'
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setMaxPrice(50000);
    setSelectedDifficulty([]);
    setMinRating(0);
    setSortBy('relevant');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        {/* Search Header Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 md:p-5 flex items-center gap-4 mb-8 flex-wrap">
          <Search size={20} strokeWidth={1.8} className="text-[var(--color-accent)] shrink-0" />
          <input
            type="text"
            className="bg-transparent border-none text-white font-medium focus:outline-none flex-1 min-w-[150px]"
            placeholder="Search destination, stay, adventure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-[var(--text-muted)] hidden sm:inline">·</span>
          <span className="label hidden sm:inline">{searchParams?.get('dates') || 'Any Dates'}</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">·</span>
          <span className="label hidden sm:inline">{searchParams?.get('travelers') ? `${searchParams.get('travelers')} Travelers` : '02 Travelers'}</span>
          <button
            onClick={handleResetFilters}
            className="label label--accent cursor-pointer hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw size={12} /> Reset Filters
          </button>
        </div>

        <div className="search-results">
          {/* Filters Sidebar */}
          <aside className="search-filters">
            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-group__title">Category</h4>
              {['All', 'Adventures', 'Destinations', 'Stays', 'Experiences'].map((cat) => (
                <label key={cat} className="filter-option cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-group__title">Max Price (₹{maxPrice.toLocaleString()})</h4>
              <div className="py-2">
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)]"
                />
                <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                  <span>₹1,000</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="filter-group">
              <h4 className="filter-group__title">Adventure Difficulty</h4>
              {['Easy', 'Moderate', 'Hard', 'Extreme'].map((diff) => (
                <label key={diff} className="filter-option cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDifficulty.includes(diff)}
                    onChange={() => {
                      setSelectedDifficulty(prev =>
                        prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
                      );
                    }}
                  />
                  <span>{diff}</span>
                </label>
              ))}
            </div>

            {/* Rating */}
            <div className="filter-group">
              <h4 className="filter-group__title">Minimum Rating</h4>
              {[4.5, 4.0, 3.5].map((r) => (
                <label key={r} className="filter-option cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r}
                    onChange={() => setMinRating(minRating === r ? 0 : r)}
                  />
                  <span className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 text-amber-400 inline" /> {r}+ Stars
                  </span>
                </label>
              ))}
            </div>
          </aside>

          {/* Results Grid */}
          <div className="search-results__main">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Showing <strong className="text-white">{sorted.length}</strong> verified expeditions & stays
              </p>
              <select
                className="bg-[var(--bg-card)] border border-[var(--border-color)] text-white px-3 py-2 rounded-lg text-xs focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant">Most Relevant</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <p className="text-lg text-[var(--text-secondary)]">No travel results match your selected filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="btn btn--secondary mt-4"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="search-results__grid">
                {sorted.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    className="card--poster aspect-[3/4] block"
                  >
                    <img className="card__image" src={item.image} alt={item.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="badge">{item.type}</span>
                      <span className="label label--accent">{item.duration}</span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{item.name}</h3>
                      <p className="card__subtitle">{item.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-[var(--color-accent)]">{item.price}</span>
                        <span className="card__cta flex items-center gap-1">Explore <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
