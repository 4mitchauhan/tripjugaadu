'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EXPERIENCES } from '@/lib/data';
import { useTrip } from '@/context/TripContext';
import { MapPin, Clock, Compass, Users, ArrowRight, Backpack, Heart } from 'lucide-react';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'local-food';

  const experience = EXPERIENCES.find((e) => e.id.toLowerCase() === id.toLowerCase());
  const { addToTrip, isInTrip, toggleFavorite, isFavorite } = useTrip();

  const inTrip = experience ? isInTrip(experience.id) : false;
  const fav = experience ? isFavorite(experience.id) : false;

  if (!experience) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="container max-w-lg">
          <span className="badge mb-3">Experience Not Found</span>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-white mb-4">Experience Not Found</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            We could not find an experience matching &quot;{id}&quot;. Please explore our curated cultural experiences.
          </p>
          <Link href="/experiences" className="btn btn--primary inline-flex items-center gap-2">
            View All Experiences <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    const query = new URLSearchParams({
      type: 'experience',
      id: experience.id,
    });
    router.push(`/booking?${query.toString()}`);
  };

  return (
    <div>
      <section className="adventure-hero" style={{ height: '65vh' }}>
        <div className="adventure-hero__bg">
          <img src={experience.image} alt={experience.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="label label--accent inline-flex items-center gap-1.5">
            <MapPin size={12} /> {experience.location}
          </span>
          <h1 style={{ fontSize: 'var(--display-xl)' }}>{experience.name}</h1>
          <div className="adventure-hero__meta">
            <span className="flex items-center gap-1.5"><Clock size={14} /> {experience.duration}</span>
            <span className="flex items-center gap-1.5"><Compass size={14} /> Local Cultural Guide</span>
            <span className="flex items-center gap-1.5"><Users size={14} /> Small Group (Max 8)</span>
          </div>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            <button
              onClick={handleJoin}
              className="btn btn--primary btn--lg inline-flex items-center gap-2"
            >
              Join This Experience <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => addToTrip(experience, 'experience')}
              className={`btn btn--lg inline-flex items-center gap-2 ${
                inTrip
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'btn--secondary'
              }`}
            >
              <Backpack size={16} /> {inTrip ? 'In Trip ✓' : '+ Add to Trip'}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(experience.id)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                fav ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={fav ? 'Saved in Favorites' : 'Add to Favorites'}
            >
              <Heart size={18} className={fav ? 'fill-white' : ''} />
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-3">Curated Perspective</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">What Makes This Special</h2>
            <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-6">
              {experience.description}
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Every detail is led by local specialists who grew up in {experience.location}. You gain access to hidden family workshops, authentic recipes, and sacred heritage locations rarely accessible through commercial package travel.
            </p>

            <div className="mt-10 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="font-bold text-white">Add to Trip Jugaadu Itinerary</h4>
                <p className="text-xs text-[var(--text-muted)] mt-1">Easily slots into your custom Indian travel schedule</p>
              </div>
              <button
                type="button"
                onClick={() => addToTrip(experience, 'experience')}
                className={`btn inline-flex items-center gap-1.5 ${
                  inTrip ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'btn--secondary'
                }`}
              >
                <Backpack size={14} /> {inTrip ? 'In Trip ✓' : '+ Add to Trip'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
