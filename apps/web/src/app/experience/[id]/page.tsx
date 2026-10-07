'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EXPERIENCES } from '@/lib/data';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'local-food';

  const experience = EXPERIENCES.find((e) => e.id.toLowerCase() === id.toLowerCase()) || EXPERIENCES[0];

  return (
    <div>
      <section className="adventure-hero" style={{ height: '65vh' }}>
        <div className="adventure-hero__bg">
          <img src={experience.image} alt={experience.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="label label--accent">{experience.location}</span>
          <h1 style={{ fontSize: 'var(--display-xl)' }}>{experience.name}</h1>
          <div className="adventure-hero__meta">
            <span>{experience.duration}</span>
            <span>Local Cultural Guide</span>
            <span>Small Group (Max 8)</span>
          </div>
          <button
            onClick={() => router.push('/booking')}
            className="btn btn--primary btn--lg mt-6"
          >
            Join This Experience <span className="btn-arrow">→</span>
          </button>
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
              <Link href="/trip-builder" className="btn btn--secondary">
                Build into Trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
