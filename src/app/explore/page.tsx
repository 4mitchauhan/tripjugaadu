'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';
import { Compass, MapPin, MountainSnow, Hotel, Sparkles, ArrowRight, Search, Star } from 'lucide-react';

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All' | 'Destinations' | 'Adventures' | 'Stays' | 'Experiences'>('All');

  const [searchLocation, setSearchLocation] = useState('');
  const [searchDuration, setSearchDuration] = useState('');

  const tabIcons: Record<string, any> = {
    All: Compass,
    Destinations: MapPin,
    Adventures: MountainSnow,
    Stays: Hotel,
    Experiences: Sparkles,
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set('q', searchLocation);
    if (activeTab !== 'All') params.set('category', activeTab);
    if (searchDuration) params.set('duration', searchDuration);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="section pt-6">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-3">Gateway to India</span>
            <h1 className="section__title">Explore India</h1>
            <p className="section__subtitle">
              Discover breathtaking destinations, thrilling adventures, serene stays, and authentic cultural experiences across the subcontinent.
            </p>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-panel mb-8 max-w-4xl mx-auto">
            <div className="search-panel__field">
              <label htmlFor="explore-loc" className="search-panel__label flex items-center gap-1">
                <MapPin size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Location
              </label>
              <select
                id="explore-loc"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
                style={{ appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="" style={{ background: '#0a101d', color: '#fff' }}>All India</option>
                <option value="Rishikesh" style={{ background: '#0a101d', color: '#fff' }}>Rishikesh</option>
                <option value="Manali" style={{ background: '#0a101d', color: '#fff' }}>Manali</option>
                <option value="Ladakh" style={{ background: '#0a101d', color: '#fff' }}>Ladakh</option>
                <option value="Goa" style={{ background: '#0a101d', color: '#fff' }}>Goa</option>
                <option value="Kasol" style={{ background: '#0a101d', color: '#fff' }}>Kasol</option>
              </select>
            </div>
            <div className="search-panel__field">
              <label htmlFor="explore-cat" className="search-panel__label flex items-center gap-1">
                <Compass size={12} strokeWidth={1.8} className="text-[var(--color-accent)] inline mr-0.5" /> Category
              </label>
              <select
                id="explore-cat"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
                style={{ appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="All" style={{ background: '#0a101d', color: '#fff' }}>All Categories</option>
                <option value="Destinations" style={{ background: '#0a101d', color: '#fff' }}>Destinations</option>
                <option value="Adventures" style={{ background: '#0a101d', color: '#fff' }}>Adventures</option>
                <option value="Stays" style={{ background: '#0a101d', color: '#fff' }}>Stays</option>
                <option value="Experiences" style={{ background: '#0a101d', color: '#fff' }}>Experiences</option>
              </select>
            </div>
            <div className="search-panel__field">
              <label htmlFor="explore-dur" className="search-panel__label">Duration</label>
              <select
                id="explore-dur"
                value={searchDuration}
                onChange={(e) => setSearchDuration(e.target.value)}
                className="search-panel__value bg-transparent border-none outline-none cursor-pointer w-full text-white"
                style={{ appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="" style={{ background: '#0a101d', color: '#fff' }}>Anytime</option>
                <option value="1-3 Days" style={{ background: '#0a101d', color: '#fff' }}>1–3 Days</option>
                <option value="4-7 Days" style={{ background: '#0a101d', color: '#fff' }}>4–7 Days</option>
                <option value="7+ Days" style={{ background: '#0a101d', color: '#fff' }}>7+ Days</option>
              </select>
            </div>
            <button type="submit" className="search-panel__btn flex items-center gap-1.5" aria-label="Search items">
              <Search size={14} strokeWidth={2} />
              <span>Search</span>
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </form>

          {/* Category Filter Tabs */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center">
            {(['All', 'Destinations', 'Adventures', 'Stays', 'Experiences'] as const).map((tab) => {
              const IconComp = tabIcons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tag cursor-pointer flex items-center gap-1.5 ${activeTab === tab ? 'tag--active' : ''}`}
                >
                  <IconComp size={14} strokeWidth={1.8} />
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* DESTINATIONS SECTION */}
          {(activeTab === 'All' || activeTab === 'Destinations') && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Featured Destinations</h2>
                  <p className="text-sm text-[var(--text-secondary)]">From high Himalayan passes to coastal sanctuaries</p>
                </div>
                <Link href="/destinations" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1">
                  View All ({DESTINATIONS.length}) <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>

              <div className="dest-grid">
                {DESTINATIONS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/destination/${d.id}`}
                    className={`card--poster ${
                      d.size === 'featured' ? 'dest-grid__item--featured' :
                      d.size === 'wide' ? 'dest-grid__item--wide' :
                      d.size === 'medium' ? 'dest-grid__item--medium' :
                      'dest-grid__item--small'
                    }`}
                  >
                    <img className="card__image" src={d.image} alt={d.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="label">{d.category}</span>
                      <span className="label label--accent">{d.days}</span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{d.name}</h3>
                      <p className="card__subtitle">{d.region}</p>
                      <span className="card__cta flex items-center gap-1">Explore Destination <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ADVENTURES SECTION */}
          {(activeTab === 'All' || activeTab === 'Adventures') && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Trending Adventures</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Push your boundaries with certified outdoor operators</p>
                </div>
                <Link href="/adventures" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1">
                  View All ({ADVENTURES.length}) <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ADVENTURES.map((a) => (
                  <Link
                    key={a.id}
                    href={`/adventure/${a.id}`}
                    className="card--poster aspect-[3/4] block"
                  >
                    <img className="card__image" src={a.image} alt={a.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="badge">{a.difficulty}</span>
                      <span className="label label--accent">{a.duration}</span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{a.name}</h3>
                      <p className="card__subtitle">{a.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-[var(--color-accent)]">{a.price}</span>
                        <span className="card__cta flex items-center gap-1">Details <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* STAYS SECTION */}
          {(activeTab === 'All' || activeTab === 'Stays') && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Handpicked Stays</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Riverside lodges, alpine retreats, and heritage villas</p>
                </div>
                <Link href="/stays" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1">
                  View All ({STAYS.length}) <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STAYS.map((s) => (
                  <Link
                    key={s.id}
                    href={`/stay/${s.id}`}
                    className="card--poster aspect-[16/10] block"
                  >
                    <img className="card__image" src={s.image} alt={s.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="label">{s.amenities.slice(0, 3).join(' · ')}</span>
                      <span className="label label--accent flex items-center gap-1">
                        <Star size={11} strokeWidth={1.8} className="fill-amber-400 text-amber-400 inline" /> {s.rating}
                      </span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{s.name}</h3>
                      <p className="card__subtitle">{s.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-[var(--color-accent)]">{s.price}</span>
                        <span className="card__cta flex items-center gap-1">View Stay <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCES SECTION */}
          {(activeTab === 'All' || activeTab === 'Experiences') && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Immersive Experiences</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Food trails, spiritual journeys, and indigenous arts</p>
                </div>
                <Link href="/experiences" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline flex items-center gap-1">
                  View All ({EXPERIENCES.length}) <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERIENCES.map((e) => (
                  <Link
                    key={e.id}
                    href={`/experience/${e.id}`}
                    className="card--poster aspect-[4/3] block"
                  >
                    <img className="card__image" src={e.image} alt={e.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="label">{e.duration}</span>
                      <span className="label label--accent">{e.location}</span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{e.name}</h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">{e.description}</p>
                      <span className="card__cta flex items-center gap-1 mt-2">Experience <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Journey Builder Prompt */}
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-deep)] border border-[var(--border-color)] text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 uppercase tracking-wide">Ready to design your custom Indian journey?</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
              Pick your preferred destinations, adventure sports, and heritage stays. Our interactive Trip Jugaadu planner builds your tailored day-by-day itinerary.
            </p>
            <Link href="/trip-builder" className="btn btn--primary btn--lg inline-flex items-center gap-1.5">
              <span>Launch Trip Builder</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
