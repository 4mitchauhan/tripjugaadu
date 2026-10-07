'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ADVENTURES } from '@/lib/data';

export default function AdventureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'rafting';
  
  const adventure = ADVENTURES.find((a) => a.id.toLowerCase() === id.toLowerCase()) || ADVENTURES[0];

  const [selectedDate, setSelectedDate] = useState('13 Oct 2026');
  const [selectedTravelers, setSelectedTravelers] = useState(2);
  const [selectedTime, setSelectedTime] = useState('8:00 AM – 12:00 PM');

  const handleBookNow = () => {
    router.push('/booking');
  };

  return (
    <div>
      {/* Hero */}
      <section className="adventure-hero" style={{ height: '70vh' }}>
        <div className="adventure-hero__bg">
          <img src={adventure.image} alt={adventure.name} />
        </div>
        <div className="adventure-hero__overlay"></div>
        <div className="adventure-hero__content" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="label label--accent">{adventure.location}</span>
          <h1 style={{ fontSize: 'var(--display-xl)' }}>{adventure.name}</h1>
          <div className="adventure-hero__meta">
            <span>{adventure.duration}</span>
            <span>{adventure.difficulty}</span>
            <span>{adventure.price} / person</span>
          </div>
          <button
            onClick={handleBookNow}
            className="btn btn--primary btn--lg mt-6"
          >
            Book Now <span className="btn-arrow">→</span>
          </button>
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
                <h3 className="detail-section__title">Overview</h3>
                <div className="detail-section__text">
                  <p>{adventure.description}</p>
                  <p className="mt-4">
                    This expedition pairs unmatched adrenaline with scenic immersion in {adventure.location}. Suitable for both beginners and experienced enthusiasts, all trips are led by certified wilderness instructors who ensure safety and technical briefing before departure.
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title">Activity Requirements</h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item">Minimum age: 14 years (under 18 requires guardian consent)</div>
                  <div className="detail-section__list-item">Moderate physical agility and fitness required</div>
                  <div className="detail-section__list-item">No prior technical experience needed — comprehensive briefing provided</div>
                  <div className="detail-section__list-item">No serious heart ailments, neck/back surgery history, or advanced pregnancy</div>
                  <div className="detail-section__list-item">Government photo ID mandatory at reporting desk</div>
                </div>
              </div>

              {/* What to Carry */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title">What to Carry</h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item">Personal waterproof phone case with safety lanyard</div>
                  <div className="detail-section__list-item">Complete change of dry clothes and compact microfiber towel</div>
                  <div className="detail-section__list-item">High-SPF water-resistant sunscreen and lip balm</div>
                  <div className="detail-section__list-item">Prescription glasses strap / retainer cord</div>
                  <div className="detail-section__list-item">Reusable metal or BPA-free water bottle</div>
                </div>
              </div>

              {/* What to Wear */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title">What to Wear</h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item">Quick-dry synthetic activewear, track pants, or swim rash guards</div>
                  <div className="detail-section__list-item">Sturdy water shoes, trail runners, or strapped sandals (no loose flip-flops)</div>
                  <div className="detail-section__list-item">Avoid heavy cotton denims that retain water and weight</div>
                </div>
              </div>

              {/* Important Information */}
              <div className="detail-section reveal">
                <h3 className="detail-section__title">Important Information & Policies</h3>
                <div className="detail-section__list">
                  <div className="detail-section__list-item">International CE/UIAA certified safety gear (helmets, harnesses, life-vests) provided</div>
                  <div className="detail-section__list-item">Escort safety kayaks and certified rescue personnel accompany all river routes</div>
                  <div className="detail-section__list-item">Full refund or reschedule provided in case of severe adverse weather cancellations</div>
                  <div className="detail-section__list-item">Exact basecamp GPS coordinates and guide contact shared 24 hours prior</div>
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
                  <label className="booking-panel__label">Select Date</label>
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
                  <label className="booking-panel__label">Travelers</label>
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
                  <label className="booking-panel__label">Time Slot</label>
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
                  className="btn btn--primary btn--lg btn--full mt-6"
                >
                  Book Activity <span className="btn-arrow">→</span>
                </button>

                <p className="text-xs text-[var(--text-muted)] text-center mt-3">
                  ✓ Free cancellation up to 24 hours before activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
