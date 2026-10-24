'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ADVENTURES } from '@/lib/data';
import { useTrip } from '@/context/TripContext';
import {
  MapPin,
  Clock,
  MountainSnow,
  CreditCard,
  ArrowRight,
  Compass,
  CheckCircle2,
  Backpack,
  Shirt,
  Info,
  Check,
  Calendar,
  Users,
  Heart
} from 'lucide-react';

const AdventureShowcase = dynamic(() => import('@/components/3d/AdventureShowcase'), {
  ssr: false,
});

export default function AdventureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'rafting';
  
  const adventure = ADVENTURES.find((a) => a.id.toLowerCase() === id.toLowerCase());
  const { addToTrip, isInTrip, toggleFavorite, isFavorite } = useTrip();

  const inTrip = adventure ? isInTrip(adventure.id) : false;
  const fav = adventure ? isFavorite(adventure.id) : false;

  const [selectedDate, setSelectedDate] = useState('13 Oct 2026');
  const [selectedTravelers, setSelectedTravelers] = useState(2);
  const [selectedTime, setSelectedTime] = useState('8:00 AM – 12:00 PM');

  const handleBookNow = () => {
    if (!adventure) return;
    const query = new URLSearchParams({
      type: 'adventure',
      id: adventure.id,
      date: selectedDate,
      travelers: selectedTravelers.toString(),
      time: selectedTime,
    });
    router.push(`/booking?${query.toString()}`);
  };

  if (!adventure) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="container max-w-lg">
          <span className="badge mb-3">Expedition Not Found</span>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-white mb-4">Adventure Not Found</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            We could not find an adventure matching &quot;{id}&quot;. Please explore our verified expeditions.
          </p>
          <Link href="/adventures" className="btn btn--primary inline-flex items-center gap-2">
            View All Adventures <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="adventure-hero" style={{ height: '70vh' }}>
        <div className="adventure-hero__bg">
          <img src={adventure.image} alt={adventure.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div>
            <span className="label label--accent flex items-center gap-1.5 w-fit">
              <MapPin size={13} /> {adventure.location}
            </span>
            <h1 style={{ fontSize: 'var(--display-xl)' }}>{adventure.name}</h1>
            <div className="adventure-hero__meta">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {adventure.duration}</span>
              <span className="flex items-center gap-1.5"><MountainSnow size={14} /> {adventure.difficulty}</span>
              <span className="flex items-center gap-1.5"><CreditCard size={14} /> {adventure.price} / person</span>
            </div>
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <button
                onClick={handleBookNow}
                className="btn btn--primary btn--lg inline-flex items-center gap-2"
              >
                Book Now <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => addToTrip(adventure, 'adventure')}
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
                onClick={() => toggleFavorite(adventure.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  fav ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title={fav ? 'Saved in Favorites' : 'Add to Favorites'}
              >
                <Heart size={18} className={fav ? 'fill-white' : ''} />
              </button>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-center shrink-0">
            <AdventureShowcase difficulty={adventure.difficulty} location={adventure.location} />
            <span className="badge mt-1" style={{ fontSize: '10px' }}>3D Expedition Orientation</span>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="section">
        <div className="container">
          <div className="adventure-detail__body">
            {/* Left Content Column */}
            <div className="adventure-detail__main">
              {/* Overview */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title flex items-center gap-2">
                  <Compass size={20} className="text-[var(--color-accent)]" /> Overview
                </h3>
                <div className="detail-section__text">
                  <p>{adventure.description}</p>
                  <p className="mt-4">
                    This expedition pairs unmatched adrenaline with scenic immersion in {adventure.location}. Suitable for both beginners and experienced enthusiasts, all trips are led by certified wilderness instructors who ensure safety and technical briefing before departure.
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[var(--color-accent)]" /> Activity Requirements
                </h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Minimum age: 14 years (under 18 requires guardian consent)</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Moderate physical agility and fitness required</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>No prior technical experience needed — comprehensive briefing provided</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>No serious heart ailments, neck/back surgery history, or advanced pregnancy</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Government photo ID mandatory at reporting desk</span>
                  </div>
                </div>
              </div>

              {/* What to Carry */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title flex items-center gap-2">
                  <Backpack size={20} className="text-[var(--color-accent)]" /> What to Carry
                </h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Personal waterproof phone case with safety lanyard</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Complete change of dry clothes and compact microfiber towel</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>High-SPF water-resistant sunscreen and lip balm</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Prescription glasses strap / retainer cord</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Reusable metal or BPA-free water bottle</span>
                  </div>
                </div>
              </div>

              {/* What to Wear */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title flex items-center gap-2">
                  <Shirt size={20} className="text-[var(--color-accent)]" /> What to Wear
                </h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Quick-dry synthetic activewear, track pants, or swim rash guards</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Sturdy water shoes, trail runners, or strapped sandals (no loose flip-flops)</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Avoid heavy cotton denims that retain water and weight</span>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title flex items-center gap-2">
                  <Info size={20} className="text-[var(--color-accent)]" /> Important Information & Policies
                </h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>International CE/UIAA certified safety gear (helmets, harnesses, life-vests) provided</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Escort safety kayaks and certified rescue personnel accompany all river routes</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Full refund or reschedule provided in case of severe adverse weather cancellations</span>
                  </div>
                  <div className="detail-section__list-item flex items-start gap-2.5">
                    <Check size={15} className="text-[var(--status-success)] shrink-0 mt-1" />
                    <span>Exact basecamp GPS coordinates and guide contact shared 24 hours prior</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar */}
            <div className="adventure-detail__booking">
              <div className="booking-panel sticky top-28">
                <div className="booking-panel__price">
                  {adventure.price} <span className="text-sm font-normal text-[var(--text-secondary)]">/ person</span>
                </div>

                <div className="booking-panel__field mt-4">
                  <label className="booking-panel__label flex items-center gap-1.5">
                    <Calendar size={13} className="text-[var(--color-accent)]" /> Select Date
                  </label>
                  <select
                    className="booking-panel__select"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option>12 Oct 2026</option>
                    <option>13 Oct 2026</option>
                    <option>14 Oct 2026</option>
                    <option>15 Oct 2026</option>
                  </select>
                </div>

                <div className="booking-panel__field mt-3">
                  <label className="booking-panel__label flex items-center gap-1.5">
                    <Users size={13} className="text-[var(--color-accent)]" /> Travelers
                  </label>
                  <select
                    className="booking-panel__select"
                    value={selectedTravelers}
                    onChange={(e) => setSelectedTravelers(Number(e.target.value))}
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People</option>
                    <option value={3}>3 People</option>
                    <option value={4}>4 People</option>
                  </select>
                </div>

                <div className="booking-panel__field mt-3">
                  <label className="booking-panel__label flex items-center gap-1.5">
                    <Clock size={13} className="text-[var(--color-accent)]" /> Time Slot
                  </label>
                  <select
                    className="booking-panel__select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option>8:00 AM – 12:00 PM (Morning Slot)</option>
                    <option>1:00 PM – 5:00 PM (Afternoon Slot)</option>
                  </select>
                </div>

                <button
                  onClick={handleBookNow}
                  className="btn btn--primary btn--lg btn--full mt-6 inline-flex items-center justify-center gap-2"
                >
                  Book Activity <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => addToTrip(adventure, 'adventure')}
                  className={`btn btn--lg btn--full mt-3 inline-flex items-center justify-center gap-2 ${
                    inTrip
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'btn--secondary'
                  }`}
                >
                  <Backpack size={16} /> {inTrip ? 'In Trip ✓' : '+ Add to Trip Planner'}
                </button>

                <p className="text-xs text-[var(--text-muted)] text-center mt-3 flex items-center justify-center gap-1.5">
                  <Check size={13} className="text-[var(--status-success)]" /> Free cancellation up to 24 hours before activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
