'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTrip } from '@/context/TripContext';
import { Destination, Adventure, Stay, KBYG_ITEMS } from '@/lib/data';
import KbygIcon from '@/components/KbygIcon';
import {
  MapPin,
  Star,
  ArrowRight,
  Plus,
  Check,
  Compass,
  Calendar,
  Backpack,
  Hotel,
  ShieldCheck
} from 'lucide-react';

interface DestinationClientProps {
  dest: Destination;
  adventures: Adventure[];
  stays: Stay[];
}

export default function DestinationClient({ dest, adventures, stays }: DestinationClientProps) {
  const { addToTrip, isInTrip, trip } = useTrip();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const destInTrip = isInTrip(`place-${dest.id}`);

  const handleAddDest = () => {
    addToTrip({
      id: `place-${dest.id}`,
      name: `${dest.name} Expedition`,
      location: dest.name,
      price: 'Included',
      numericPrice: 0,
      image: dest.image,
      duration: dest.days,
      type: 'adventure',
      category: 'Destination Hub',
      rating: '4.9',
    }, 'adventure');

    setToastMessage(`Added ${dest.name} to your trip plan!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddAdventure = (adv: Adventure) => {
    addToTrip(adv, 'adventure');
    setToastMessage(`Added ${adv.name} to your ${dest.name} itinerary!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddStay = (stay: Stay) => {
    addToTrip(stay, 'stay');
    setToastMessage(`Added ${stay.name} to your ${dest.name} itinerary!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-white shadow-2xl backdrop-blur-md animate-bounce">
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Cinematic Hero */}
      <section className="adventure-hero" style={{ height: '70vh' }}>
        <div className="adventure-hero__bg">
          <img src={dest.image} alt={dest.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div>
            <span className="label label--accent">{dest.region}</span>
            <h1 style={{ fontSize: 'var(--display-hero)' }}>{dest.name}</h1>
            <div className="adventure-hero__meta">
              <span>{dest.days}</span>
              <span>{dest.category}</span>
              <span>Best Season: Sep – Jun</span>
            </div>
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <button
                type="button"
                onClick={handleAddDest}
                className={`btn btn--lg inline-flex items-center gap-2 ${
                  destInTrip
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'btn--primary'
                }`}
              >
                <Plus size={16} />
                <span>{destInTrip ? 'Destination in Trip ✓' : `+ Add ${dest.name} to Trip Plan`}</span>
              </button>
              <Link
                href={`/trip-builder?city=${encodeURIComponent(dest.name)}`}
                className="btn btn--secondary btn--lg inline-flex items-center gap-2"
              >
                <Compass size={16} />
                <span>Open in Trip Builder</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Quick Trip Architect Status */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <span className="badge mb-3">Destination Blueprint</span>
              <h2 className="text-3xl font-bold uppercase tracking-wider mb-4">About {dest.name}</h2>
              <p className="text-lg text-[var(--text-primary)] leading-relaxed">{dest.description}</p>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Experience the distinctive union of adrenaline and tranquility. Whether traversing steep granite ridges, navigating sacred whitewater rapids, or settling into secluded mountain chalets, {dest.name} delivers an authentic and unforgettable journey.
              </p>
            </div>

            {/* City Trip Builder Space Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-cyan-500/30 shadow-xl shadow-cyan-950/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {dest.name} Trip Hub
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Build Your {dest.name} Leg</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4">
                Select your favorite adventures and stays below. They will automatically be organized into your dedicated {dest.name} workspace in the Trip Builder.
              </p>
              <Link
                href={`/trip-builder?city=${encodeURIComponent(dest.name)}`}
                className="w-full btn btn--primary btn--sm inline-flex items-center justify-center gap-2"
              >
                <span>Review & Finalize in Trip Builder</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Adventures in this destination */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="section__header reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="badge mb-2">Activities in {dest.name}</span>
              <h2 className="section__title">Adventures in {dest.name}</h2>
              <p className="section__subtitle">Curated outdoor expeditions led by verified local instructors.</p>
            </div>
            <Link href="/adventures" className="text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wider hover:underline flex items-center gap-1">
              <span>View All Adventures</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventures.map((a) => {
              const inTrip = isInTrip(a.id);
              return (
                <div key={a.id} className="card--poster flex flex-col justify-between group overflow-hidden rounded-xl border border-white/10 bg-[#071026]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img className="card__image group-hover:scale-105 transition-transform duration-500" src={a.image} alt={a.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="badge">{a.difficulty}</span>
                      <span className="label label--accent">{a.duration}</span>
                    </div>
                  </div>
                  <div className="card__content p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="card__title text-xl font-bold text-white mb-1">{a.name}</h3>
                      <p className="card__subtitle text-xs text-cyan-400 mb-2">{a.location}</p>
                      <p className="text-xs text-white/70 line-clamp-2 mb-4">{a.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-auto">
                      <span className="text-sm font-semibold text-[var(--color-accent)] font-mono">{a.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddAdventure(a)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            inTrip
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-black'
                          }`}
                        >
                          <Plus size={13} />
                          <span>{inTrip ? 'In Trip ✓' : '+ Add to Trip'}</span>
                        </button>
                        <Link href={`/adventure/${a.id}`} className="p-1.5 text-white/70 hover:text-cyan-400 transition-colors" title="View Details">
                          <ArrowRight size={15} />
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

      {/* Stays in this destination */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="badge mb-2">Hospitality in {dest.name}</span>
              <h2 className="section__title">Where to Stay in {dest.name}</h2>
              <p className="section__subtitle">Immersive accommodations selected for scenic immersion and character.</p>
            </div>
            <Link href="/stays" className="text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wider hover:underline flex items-center gap-1">
              <span>View All Stays</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stays.map((s) => {
              const inTrip = isInTrip(s.id);
              return (
                <div key={s.id} className="card--poster flex flex-col justify-between group overflow-hidden rounded-xl border border-white/10 bg-[#071026]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img className="card__image group-hover:scale-105 transition-transform duration-500" src={s.image} alt={s.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="label">{s.amenities.slice(0, 3).join(' · ')}</span>
                      <span className="label label--accent flex items-center gap-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" /> {s.rating}
                      </span>
                    </div>
                  </div>
                  <div className="card__content p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="card__title text-xl font-bold text-white mb-1">{s.name}</h3>
                      <p className="card__subtitle text-xs text-cyan-400 mb-2">{s.location}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-4">
                      <span className="text-sm font-semibold text-[var(--color-accent)] font-mono">{s.price} / night</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddStay(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            inTrip
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-white/10 text-white hover:bg-cyan-500 hover:text-black'
                          }`}
                        >
                          <Plus size={13} />
                          <span>{inTrip ? 'In Trip ✓' : '+ Add Stay'}</span>
                        </button>
                        <Link href={`/stay/${s.id}`} className="p-1.5 text-white/70 hover:text-cyan-400 transition-colors" title="View Property">
                          <ArrowRight size={15} />
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

      {/* Know Before You Go */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-2">Trip Preparation</span>
            <h2 className="section__title">Know Before You Go to {dest.name}</h2>
            <p className="section__subtitle">Essential travel intelligence, gear guidance, and requirements for {dest.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KBYG_ITEMS.map((item, idx) => (
              <div key={idx} className="card--info reveal">
                <span className="card__label">{item.label}</span>
                <div className="card__icon mb-2">
                  <KbygIcon icon={item.icon} size={28} />
                </div>
                <h4 className="card__title font-semibold text-white mt-2 mb-1">{item.title}</h4>
                <p className="card__desc text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA to Trip Builder */}
      <section className="section bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-deep)] text-center">
        <div className="container reveal">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            Ready for your {dest.name} Expedition?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Review your selected adventures, arrange them day by day, and finalize your complete {dest.name} itinerary in the Trip Builder.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={`/trip-builder?city=${encodeURIComponent(dest.name)}`} className="btn btn--primary btn--lg">
              Finalize {dest.name} in Trip Builder <ArrowRight size={16} />
            </Link>
            <Link href="/explore" className="btn btn--secondary btn--lg">
              Explore More Places
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
