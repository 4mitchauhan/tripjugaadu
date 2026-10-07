'use client';

import Link from 'next/link';
import { ITINERARY } from '@/lib/data';

export default function ItineraryPage() {
  return (
    <div>
      {/* Destination Hero Header */}
      <section className="relative h-[340px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600089769887-f0890642a730?w=1920&q=80"
          alt="Rishikesh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#010611]/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <span className="badge mb-2">Curated Trip Plan</span>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">{ITINERARY.destination}</h1>
          <span className="label label--accent text-sm mt-2 inline-block">
            {ITINERARY.days} / {ITINERARY.nights} · 02 Travelers
          </span>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="section pt-10 pb-24">
        <div className="container max-w-3xl">
          <div className="timeline">
            {ITINERARY.schedule.map((day) => (
              <div key={day.day} className="timeline__day reveal">
                <div className="timeline__day-marker"></div>
                <div className="timeline__day-label">{day.label}</div>

                <div className="space-y-4">
                  {day.items.map((item, idx) => (
                    <div key={idx} className="timeline__item">
                      <div className="timeline__item-info">
                        <div className="timeline__item-name">{item.name}</div>
                        <div className="timeline__item-detail">
                          {item.time} {item.duration ? `· ${item.duration}` : ''} {item.price ? `· ${item.price}` : ''}
                        </div>
                      </div>

                      <div className={`timeline__item-status timeline__item-status--${item.status}`}>
                        <span className="dot"></span>
                        {item.status === 'confirmed' ? 'Reserved' : 'Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Summary Box */}
          <div className="mt-16 p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center reveal">
            <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Lock in this Complete Journey</h3>
            <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-6">
              Review your reserved stay and verified adventure activities. Instant confirmation with 24-hr free cancellation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/booking" className="btn btn--primary btn--lg">
                Proceed to Checkout <span className="btn-arrow">→</span>
              </Link>
              <Link href="/trip-builder" className="btn btn--secondary btn--lg">
                Edit Trip Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
