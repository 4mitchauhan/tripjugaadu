import Link from 'next/link';
import { STAYS } from '@/lib/data';

export default function StaysPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="section pt-6">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-3">Immersive Accommodations</span>
            <h1 className="section__title">Stays & Retreats</h1>
            <p className="section__subtitle">
              Riverside luxury camps, cedar chalets in apple orchards, and restored Portuguese heritage villas across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
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
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-semibold text-[var(--color-accent)]">{s.price}</span>
                    <span className="card__cta">View Property Details <span className="btn-arrow">→</span></span>
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
