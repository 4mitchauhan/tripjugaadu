'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '@/lib/data';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Destinations' | 'Adventures' | 'Stays' | 'Experiences'>('All');

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
          <div className="search-panel mb-8 max-w-4xl mx-auto">
            <div className="search-panel__field">
              <span className="search-panel__label">Location</span>
              <span className="search-panel__value">All India</span>
            </div>
            <div className="search-panel__field">
              <span className="search-panel__label">Category</span>
              <span className="search-panel__value">{activeTab}</span>
            </div>
            <div className="search-panel__field">
              <span className="search-panel__label">Duration</span>
              <span className="search-panel__value">Anytime</span>
            </div>
            <Link href="/search" className="search-panel__btn">
              Search
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center">
            {(['All', 'Destinations', 'Adventures', 'Stays', 'Experiences'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tag cursor-pointer ${activeTab === tab ? 'tag--active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DESTINATIONS SECTION */}
          {(activeTab === 'All' || activeTab === 'Destinations') && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Featured Destinations</h2>
                  <p className="text-sm text-[var(--text-secondary)]">From high Himalayan passes to coastal sanctuaries</p>
                </div>
                <Link href="/destinations" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline">
                  View All ({DESTINATIONS.length}) →
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
                      <span className="card__cta">Explore Destination <span className="btn-arrow">→</span></span>
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
                <Link href="/adventures" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline">
                  View All ({ADVENTURES.length}) →
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
                        <span className="card__cta">Details <span className="btn-arrow">→</span></span>
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
                <Link href="/stays" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline">
                  View All ({STAYS.length}) →
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
                      <span className="label label--accent">★ {s.rating}</span>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{s.name}</h3>
                      <p className="card__subtitle">{s.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-[var(--color-accent)]">{s.price}</span>
                        <span className="card__cta">View Stay <span className="btn-arrow">→</span></span>
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
                <Link href="/experiences" className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase hover:underline">
                  View All ({EXPERIENCES.length}) →
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
                      <span className="card__cta mt-2">Experience <span className="btn-arrow">→</span></span>
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
            <Link href="/trip-builder" className="btn btn--primary btn--lg inline-flex">
              Launch Trip Builder <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
