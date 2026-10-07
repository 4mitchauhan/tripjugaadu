'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('Rishikesh');
  const [category, setCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevant');
  const [aiParsedIntent, setAiParsedIntent] = useState<any>(null);

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
        category: 'Adventure',
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
        category: 'Stay',
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
      category: 'Experience',
      difficulty: 'Cultural',
      duration: e.duration,
      price: '₹1,500',
      numericPrice: 1500,
      rating: 4.8,
      image: e.image,
      href: `/experience/${e.id}`
    }))
  ];

  // Filtering
  const filtered = allItems.filter(item => {
    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match = item.name.toLowerCase().includes(q) ||
                    item.location.toLowerCase().includes(q) ||
                    item.type.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category
    if (category !== 'All') {
      if (category === 'Destinations' && item.type !== 'Destination') return false;
      if (category === 'Adventures' && item.type !== 'Adventure') return false;
      if (category === 'Stays' && item.type !== 'Stay') return false;
      if (category === 'Experiences' && item.type !== 'Experience') return false;
    }

    // Price
    if (item.numericPrice > 0 && item.numericPrice > maxPrice) return false;

    // Rating
    if (minRating > 0 && item.rating < minRating) return false;

    // Difficulty
    if (selectedDifficulty.length > 0 && item.type === 'Adventure') {
      const hasDiff = selectedDifficulty.some(d => item.difficulty.toLowerCase().includes(d.toLowerCase()));
      if (!hasDiff) return false;
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.numericPrice - b.numericPrice;
    if (sortBy === 'priceDesc') return b.numericPrice - a.numericPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleDifficulty = (diff: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        {/* Search Header Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 md:p-5 flex items-center gap-4 mb-8 flex-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="bg-transparent border-none text-white font-medium focus:outline-none flex-1 min-w-[150px]"
            placeholder="Search destination, stay, adventure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-[var(--text-muted)] hidden sm:inline">·</span>
          <span className="label hidden sm:inline">12–15 Oct</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">·</span>
          <span className="label hidden sm:inline">02 Travelers</span>
          <button
            onClick={() => {
              setSearchTerm('');
              setAiParsedIntent(null);
            }}
            className="label label--accent cursor-pointer hover:underline"
          >
            Clear Search
          </button>
        </div>

        {/* AI Intent Discovery Bar */}
        <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-3) var(--space-4)', background: 'rgba(0, 174, 239, 0.05)', border: '1px solid rgba(0, 174, 239, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ AI Natural Language Search:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                'Adventurous weekend near Delhi under 15000',
                'Riverside camping in Rishikesh',
                'Moderate treks in Himachal for 3 days',
              ].map((querySample, idx) => (
                <button
                  key={idx}
                  onClick={async () => {
                    setSearchTerm(querySample);
                    try {
                      const res = await fetch('http://localhost:4000/api/v1/ai/search', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query: querySample }),
                      });
                      if (res.ok) {
                        const json = await res.json();
                        setAiParsedIntent(json.parsedIntent);
                        if (json.parsedIntent.destination) {
                          setSearchTerm(json.parsedIntent.destination);
                        }
                        if (json.parsedIntent.budgetMax) {
                          setMaxPrice(json.parsedIntent.budgetMax);
                        }
                      }
                    } catch {
                      setSearchTerm('Rishikesh');
                    }
                  }}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    background: 'rgba(7, 27, 58, 0.6)',
                    border: '1px solid rgba(0, 174, 239, 0.3)',
                    borderRadius: '9999px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  "{querySample}"
                </button>
              ))}
            </div>
          </div>

          {aiParsedIntent && (
            <div style={{ fontSize: '11px', color: '#39ff14', background: 'rgba(57, 255, 20, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
              ✓ Parsed: {aiParsedIntent.destination} • Max ₹{aiParsedIntent.budgetMax?.toLocaleString()} • {aiParsedIntent.durationDays} Days
            </div>
          )}
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
                    onChange={() => toggleDifficulty(diff)}
                  />
                  <span>{diff}</span>
                </label>
              ))}
            </div>

            {/* Rating */}
            <div className="filter-group">
              <h4 className="filter-group__title">Minimum Rating</h4>
              {[
                { label: 'Any Rating', val: 0 },
                { label: '★ 4.5+ Rating', val: 4.5 },
                { label: '★ 4.0+ Rating', val: 4.0 },
              ].map((r) => (
                <label key={r.val} className="filter-option cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Results Grid */}
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <span className="label text-sm text-[var(--text-secondary)]">
                {sorted.length} {sorted.length === 1 ? 'Result' : 'Results'} Found
              </span>

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
                  onClick={() => {
                    setSearchTerm('');
                    setCategory('All');
                    setMaxPrice(50000);
                    setSelectedDifficulty([]);
                    setMinRating(0);
                  }}
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
                        <span className="card__cta">Explore <span className="btn-arrow">→</span></span>
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
