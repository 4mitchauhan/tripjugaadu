import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS, KBYG_ITEMS } from '@/lib/data';

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({
    id: d.id,
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dest = DESTINATIONS.find((d) => d.id.toLowerCase() === id.toLowerCase()) || DESTINATIONS[0];
  
  if (!dest) {
    notFound();
  }

  // Filter adventures & stays in this location
  const relatedAdventures = ADVENTURES.filter(
    (a) => a.location.toLowerCase().includes(dest.name.toLowerCase()) || dest.name.toLowerCase().includes(a.location.toLowerCase())
  );
  const displayAdventures = relatedAdventures.length > 0 ? relatedAdventures : ADVENTURES.slice(0, 3);

  const relatedStays = STAYS.filter(
    (s) => s.location.toLowerCase().includes(dest.name.toLowerCase()) || dest.name.toLowerCase().includes(s.location.toLowerCase())
  );
  const displayStays = relatedStays.length > 0 ? relatedStays : STAYS.slice(0, 2);

  return (
    <div>
      {/* Cinematic Hero */}
      <section className="adventure-hero" style={{ height: '70vh' }}>
        <div className="adventure-hero__bg">
          <img src={dest.image} alt={dest.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="label label--accent">{dest.region}</span>
          <h1 style={{ fontSize: 'var(--display-hero)' }}>{dest.name}</h1>
          <div className="adventure-hero__meta">
            <span>{dest.days}</span>
            <span>{dest.category}</span>
            <span>Best Season: Sep – Jun</span>
          </div>
        </div>
      </section>

      {/* Overview & About */}
      <section className="section">
        <div className="container">
          <div className="reveal max-w-3xl">
            <span className="badge mb-3">Destination Blueprint</span>
            <h2 className="text-3xl font-bold uppercase tracking-wider mb-4">About {dest.name}</h2>
            <p className="text-lg text-[var(--text-primary)] leading-relaxed">{dest.description}</p>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Experience the distinctive union of adrenaline and tranquility. Whether traversing steep granite ridges, navigating sacred whitewater rapids, or settling into secluded mountain chalets, {dest.name} delivers an authentic and unforgettable journey.
            </p>
          </div>
        </div>
      </section>

      {/* Adventures in this destination */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-2">Activities</span>
            <h2 className="section__title">Adventures in {dest.name}</h2>
            <p className="section__subtitle">Curated outdoor expeditions led by verified local instructors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAdventures.map((a) => (
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
                    <span className="card__cta">Book Adventure <span className="btn-arrow">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stays in this destination */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-2">Hospitality</span>
            <h2 className="section__title">Where to Stay in {dest.name}</h2>
            <p className="section__subtitle">Immersive accommodations selected for scenic immersion and character.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayStays.map((s) => (
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
                    <span className="card__cta">Reserve Stay <span className="btn-arrow">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Know Before You Go */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="section__header reveal">
            <span className="badge mb-2">Trip Preparation</span>
            <h2 className="section__title">Know Before You Go</h2>
            <p className="section__subtitle">Essential travel intelligence, gear guidance, and requirements for {dest.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KBYG_ITEMS.map((item, idx) => (
              <div key={idx} className="card--info reveal">
                <span className="card__label">{item.label}</span>
                <div className="card__icon text-2xl">{item.icon}</div>
                <h4 className="card__title font-semibold text-white mt-2 mb-1">{item.title}</h4>
                <p className="card__desc text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-deep)] text-center">
        <div className="container reveal">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">
            Ready for your {dest.name} Expedition?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Build your personalized trip with our step-by-step itinerary builder or view pre-crafted itineraries.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/trip-builder" className="btn btn--primary btn--lg">
              Build My Journey <span className="btn-arrow">→</span>
            </Link>
            <Link href="/itinerary" className="btn btn--secondary btn--lg">
              View Sample Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
