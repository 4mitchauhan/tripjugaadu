'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { STAYS } from '@/lib/data';

export default function StayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'riverside-retreat';

  const stay = STAYS.find((s) => s.id.toLowerCase() === id.toLowerCase()) || STAYS[0];

  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-15');
  const [guests, setGuests] = useState(2);

  const handleReserve = () => {
    router.push('/booking');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6">
          <Link href="/stays" className="text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wider hover:underline">
            ← Back to Stays
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <span className="badge mb-2">{stay.location}</span>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider">{stay.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="label label--accent text-base px-3 py-1">★ {stay.rating} Rating</span>
              <span className="text-xl font-bold text-[var(--color-accent)]">{stay.price}</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden mb-12">
          <div className="md:col-span-2 h-[380px] md:h-[480px]">
            <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-4 h-[380px] md:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
              alt="Room interior"
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80"
              alt="Property vista"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Details & Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4">About the Property</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Tucked into the most picturesque pocket of {stay.location}, this property blends regional Indian craftsmanship with modern luxury. Designed for travelers seeking tranquility after intense days of trekking, rafting, or exploring.
              </p>
            </div>

            {/* Amenities */}
            <div className="p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Included Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stay.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Options */}
            <div className="p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Selected Room Category</h2>
              <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-white">Deluxe Balcony Suite (Mountain/River Facing)</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">1 King Bed · En-suite bathroom · Panoramic terrace</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[var(--color-accent)]">{stay.price}</div>
                  <span className="text-xs text-[var(--accent-green)]">Instant Confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div>
            <div className="booking-panel sticky top-28">
              <div className="booking-panel__price">
                {stay.price}
              </div>

              <div className="booking-panel__field mt-4">
                <label className="booking-panel__label">Check-in Date</label>
                <input
                  type="date"
                  className="auth-form__input py-2 text-sm"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="booking-panel__field mt-3">
                <label className="booking-panel__label">Check-out Date</label>
                <input
                  type="date"
                  className="auth-form__input py-2 text-sm"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="booking-panel__field mt-3">
                <label className="booking-panel__label">Guests</label>
                <select
                  className="booking-panel__select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <button
                onClick={handleReserve}
                className="btn btn--primary btn--lg btn--full mt-6"
              >
                Reserve Stay <span className="btn-arrow">→</span>
              </button>

              <p className="text-xs text-[var(--text-muted)] text-center mt-3">
                ✓ Free cancellation up to 48 hours before check-in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
