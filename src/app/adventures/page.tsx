'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ADVENTURES } from '@/lib/data';
import {
  Compass,
  Waves,
  Wind,
  MountainSnow,
  Flame,
  Footprints,
  ArrowRight,
  MapPin
} from 'lucide-react';

export default function AdventuresPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Water' | 'Air' | 'Land' | 'Extreme' | 'Easy'>('All');

  const filterConfig = [
    { id: 'All' as const, label: 'All', icon: Compass },
    { id: 'Water' as const, label: 'Water', icon: Waves },
    { id: 'Air' as const, label: 'Air', icon: Wind },
    { id: 'Land' as const, label: 'Land', icon: MountainSnow },
    { id: 'Extreme' as const, label: 'Extreme', icon: Flame },
    { id: 'Easy' as const, label: 'Easy', icon: Footprints },
  ];

  const filteredAdventures = ADVENTURES.filter((a) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Extreme') return a.difficulty === 'Extreme';
    if (activeFilter === 'Easy') return a.difficulty.includes('Easy');
    if (activeFilter === 'Water') return a.name.toLowerCase().includes('rafting') || a.name.toLowerCase().includes('scuba');
    if (activeFilter === 'Air') return a.name.toLowerCase().includes('paragliding') || a.name.toLowerCase().includes('bungee') || a.name.toLowerCase().includes('zipline');
    if (activeFilter === 'Land') return a.name.toLowerCase().includes('trekking') || a.name.toLowerCase().includes('camping');
    return true;
  });

  return (
    <div className="pt-24 pb-20">
      <section className="section pt-6">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-3">Certified Expeditions</span>
            <h1 className="section__title">Outdoor Adventures</h1>
            <p className="section__subtitle">
              White water rafting, high-altitude alpine treks, 83m bungee drops, and tandem paragliding across India’s wildest terrains.
            </p>
          </div>

          {/* Filter Tags */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center mt-6">
            {filterConfig.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`tag cursor-pointer inline-flex items-center gap-1.5 ${activeFilter === item.id ? 'tag--active' : ''}`}
                >
                  <IconComp size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdventures.map((a) => (
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
                  <p className="card__subtitle flex items-center gap-1">
                    <MapPin size={12} /> {a.location}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">{a.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-semibold text-[var(--color-accent)]">{a.price}</span>
                    <span className="card__cta flex items-center gap-1">Book Adventure <ArrowRight size={14} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
