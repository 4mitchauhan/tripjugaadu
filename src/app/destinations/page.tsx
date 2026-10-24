import Link from 'next/link';
import { DESTINATIONS } from '@/lib/data';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="section pt-6">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-3">Subcontinent Catalog</span>
            <h1 className="section__title">All Destinations</h1>
            <p className="section__subtitle">
              Explore India’s most iconic valleys, sacred riverbeds, coastal havens, and high mountain passes.
            </p>
          </div>

          <div className="dest-grid mt-10">
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
                  <p className="card__subtitle flex items-center gap-1">
                    <MapPin size={12} /> {d.region}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2">{d.description}</p>
                  <span className="card__cta mt-3 flex items-center gap-1">View Destination Guide <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
