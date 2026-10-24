import Link from 'next/link';
import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES, KBYG_ITEMS } from '@/lib/data';
import CinematicHeroCanvas from '@/components/CinematicHeroCanvas';
import KbygIcon from '@/components/KbygIcon';
import SearchPanel from '@/components/SearchPanel';
import { ArrowRight, Star, Check, Circle, Search, MapPin, CalendarCheck, User, CreditCard } from 'lucide-react';

function PosterCard({ item, type }: { item: any, type: string }) {
  const href = type === 'destination' ? `/destination/${item.id}` : 
               type === 'adventure' ? `/adventure/${item.id}` : 
               type === 'stay' ? `/stay/${item.id}` :
               `/experience/${item.id}`;
  
  const sizeClass = item.size === 'featured' ? 'dest-grid__item--featured' :
                    item.size === 'wide' ? 'dest-grid__item--wide' :
                    item.size === 'medium' ? 'dest-grid__item--medium' :
                    'dest-grid__item--small';

  return (
    <Link href={href} className={`card--poster ${type === 'destination' ? sizeClass : ''}`}>
      <img className="card__image" src={item.image} alt={item.name} loading="lazy" />
      <div className="card__overlay"></div>
      <div className="card__top-meta">
        <span className="label">{item.category || item.difficulty || ''}</span>
        <span className="label label--accent">{item.days || item.duration || item.region || ''}</span>
      </div>
      <div className="card__content">
        <h4 className="card__title">{item.name}</h4>
        <p className="card__subtitle">{item.region || item.location || ''}</p>
        <span className="card__cta flex items-center gap-1">Explore <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
      </div>
    </Link>
  );
}

function InfoCard({ item }: { item: any }) {
  return (
    <div className="card--info reveal">
      <span className="card__label">{item.label}</span>
      <div className="card__icon flex items-center justify-center">
        <KbygIcon icon={item.icon} size={28} />
      </div>
      <h5 className="card__title" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)' }}>
        {item.title}
      </h5>
      <p className="card__desc">{item.description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO WITH CINEMATIC SCROLL-LINKED SEQUENCE ANIMATION */}
      <div
        className="hero-scroll-container relative w-full"
        style={{ height: '400vh' }}
        id="hero"
      >
        <section
          className="hero sticky top-0 h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          {/* CINEMATIC SCROLL-CONTROLLED 150-FRAME 8K CANVAS */}
          <CinematicHeroCanvas />

          {/* CINEMATIC SUBTLE AMBIENT OVERLAY */}
          <div className="hero__overlay" aria-hidden="true"></div>

          {/* LOCAL TEXT READABILITY LAYER */}
          <div className="hero__readability-layer" aria-hidden="true"></div>

          {/* HERO CONTENT (PRESERVED UNTOUCHED) */}
          <div className="hero__content relative z-10 pointer-events-auto">
            <p className="hero__eyebrow">TripJugaadu Presents</p>
            <h1 className="hero__title">Your Next<br/>Adventure<br/>Starts Here</h1>
            <p className="hero__subtitle">Discover places. Prepare better. Build your journey. Travel smarter across India.</p>
            <div className="hero__actions flex justify-center items-center">
              <Link href="/explore" className="btn btn--primary btn--lg">
                Explore India <ArrowRight size={16} strokeWidth={2} className="inline ml-1" />
              </Link>
            </div>
          </div>
          <div className="hero__search relative z-10 pointer-events-auto">
            <SearchPanel />
          </div>
        </section>
      </div>

      {/* DESTINATIONS */}
      <section className="section" id="destinations">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">Where Will You Go Next?</h2>
            <p className="section__subtitle">Discover India's most breathtaking destinations — from sacred rivers to snow-capped peaks.</p>
          </div>
          <div className="dest-grid">
            {DESTINATIONS.map(d => (
              <PosterCard key={d.id} item={d} type="destination" />
            ))}
          </div>
        </div>
      </section>

      {/* ADVENTURES */}
      <section className="section" id="adventures" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))' }}>
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">Chase the Unexpected</h2>
            <p className="section__subtitle">From raging rapids to soaring skies — push your limits with India's most thrilling adventures.</p>
          </div>
          <div className="adventure-scroll">
            {ADVENTURES.map(a => (
              <PosterCard key={a.id} item={a} type="adventure" />
            ))}
          </div>
        </div>
      </section>

      {/* STAYS */}
      <section className="section" id="stays">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">Stay Somewhere Worth Remembering</h2>
            <p className="section__subtitle">Boutique retreats, mountain lodges, and heritage homes — every night is an experience.</p>
          </div>
          <div className="stays-grid">
            {STAYS.map(s => {
              const sizeClass = s.size === 'large' ? 'stays-grid__item--large' :
                                s.size === 'medium' ? 'stays-grid__item--medium' :
                                'stays-grid__item--small';
              return (
                <div key={s.id} className={sizeClass}>
                  <Link href={`/stay/${s.id}`} className="card--poster" style={{ aspectRatio: s.size === 'large' ? '4/3' : '3/2' }}>
                    <img className="card__image" src={s.image} alt={s.name} loading="lazy" />
                    <div className="card__overlay"></div>
                    <div className="card__top-meta">
                      <span className="label">{s.amenities.slice(0,3).join(' · ')}</span>
                      <span className="label label--accent flex items-center gap-1">
                        <Star size={11} strokeWidth={1.8} className="fill-amber-400 text-amber-400 inline" /> {s.rating}
                      </span>
                    </div>
                    <div className="card__content">
                      <h4 className="card__title">{s.name}</h4>
                      <p className="card__subtitle">{s.location}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>From {s.price}</span>
                        <span className="card__cta flex items-center gap-1">Explore <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="section" id="experiences" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))' }}>
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">Go Beyond the Checklist</h2>
            <p className="section__subtitle">Local food, culture, wellness, and hidden gems — the moments that make a trip unforgettable.</p>
          </div>
          <div className="experience-scroll">
            {EXPERIENCES.map(e => (
              <Link key={e.id} href={`/experience/${e.id}`} className="card--poster">
                <img className="card__image" src={e.image} alt={e.name} loading="lazy" />
                <div className="card__overlay"></div>
                <div className="card__top-meta">
                  <span className={`badge ${e.accent === 'warm' ? 'badge--warm' : e.accent === 'green' ? 'badge--green' : e.accent === 'violet' ? 'badge--violet' : ''}`}>
                    {e.name}
                  </span>
                  <span className="label label--accent">{e.duration}</span>
                </div>
                <div className="card__content">
                  <h4 className="card__title">{e.name}</h4>
                  <p className="card__subtitle">{e.location}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 'var(--space-2) 0' }}>
                    {e.description}
                  </p>
                  <span className="card__cta flex items-center gap-1">Explore <ArrowRight size={13} strokeWidth={2} className="btn-arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KNOW BEFORE YOU GO */}
      <section className="section" id="kbyg">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">Know Before You Go</h2>
            <p className="section__subtitle">Everything you need to feel prepared before your journey.</p>
          </div>
          <div className="kbyg-grid">
            <div className="kbyg-grid__cards">
              {KBYG_ITEMS.map((item, i) => (
                <InfoCard key={i} item={item} />
              ))}
            </div>
            <div className="kbyg-grid__readiness reveal">
              <span className="label label--accent" style={{ marginBottom: 'var(--space-4)' }}>Trip Readiness</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-sm)', marginBottom: 'var(--space-1)' }}>Rishikesh</h4>
              <span className="label" style={{ marginBottom: 'var(--space-5)' }}>03 Days / 02 Nights</span>
              
              <div className="progress-ring" style={{ margin: '0 auto var(--space-5)' }}>
                <svg className="progress-ring__svg" width="120" height="120" viewBox="0 0 120 120">
                  <circle className="progress-ring__bg" cx="60" cy="60" r="52" />
                  <circle className="progress-ring__fill" cx="60" cy="60" r="52" strokeDasharray="326.73" strokeDashoffset="65.35" />
                </svg>
                <span className="progress-ring__text">80%</span>
              </div>
              
              <div style={{ textAlign: 'left', width: '100%' }}>
                {['Stay', 'Adventure', 'Itinerary', 'Packing'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-color)' }}>
                    <Check size={16} strokeWidth={2.5} style={{ color: 'var(--status-success)' }} />
                    <span style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
                  <Circle size={14} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontWeight: 500, color: 'var(--text-muted)' }}>Conditions Check</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
