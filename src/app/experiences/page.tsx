import Link from 'next/link';
import { EXPERIENCES } from '@/lib/data';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export default function ExperiencesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="section pt-6">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-3">Culture & Heritage</span>
            <h1 className="section__title">Immersive Experiences</h1>
            <p className="section__subtitle">
              Step beyond conventional tourism with culinary crawls in ancient river cities, artisan workshops, and Himalayan astrophotography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {EXPERIENCES.map((e) => (
              <Link
                key={e.id}
                href={`/experience/${e.id}`}
                className="card--poster aspect-[4/3] block"
              >
                <img className="card__image" src={e.image} alt={e.name} loading="lazy" />
                <div className="card__overlay"></div>
                <div className="card__top-meta">
                  <span className="label flex items-center gap-1">
                    <Clock size={11} /> {e.duration}
                  </span>
                  <span className="label label--accent flex items-center gap-1">
                    <MapPin size={11} /> {e.location}
                  </span>
                </div>
                <div className="card__content">
                  <h3 className="card__title">{e.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">{e.description}</p>
                  <span className="card__cta mt-3 flex items-center gap-1">Discover Experience <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
