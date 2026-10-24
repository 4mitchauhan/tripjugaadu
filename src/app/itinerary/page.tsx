'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ITINERARY, DESTINATIONS, ADVENTURES, STAYS } from '@/lib/data';
import { useTrip } from '@/context/TripContext';
import { Calendar, Users, ArrowRight, ArrowLeft, MapPin, Backpack } from 'lucide-react';

const ItineraryScene = dynamic(() => import('@/components/3d/ItineraryScene'), {
  ssr: false,
});

function ItineraryContent() {
  const searchParams = useSearchParams();
  const { trip } = useTrip();

  const destKey = searchParams?.get('dest') || trip.destination || 'rishikesh';
  const matchedDest = DESTINATIONS.find(d => d.id.toLowerCase() === destKey.toLowerCase() || d.name.toLowerCase() === destKey.toLowerCase()) || DESTINATIONS[0];

  const adults = parseInt(searchParams?.get('adults') || trip.travelers.toString() || '2', 10);
  const totalTravelers = adults;

  const destName = matchedDest.name;
  const heroImage = matchedDest.image;
  const daysString = trip.startDate && trip.endDate ? `${trip.startDate} – ${trip.endDate}` : (matchedDest.days || ITINERARY.days);

  // Check if trip has manual days with items
  const hasManualItems = trip.days.some(d => d.items.length > 0);

  // Destination-specific fallback activities/stays
  const matchingAdventures = ADVENTURES.filter(a => a.location.toLowerCase().includes(matchedDest.name.toLowerCase()));
  const matchingStay = STAYS.find(s => s.location.toLowerCase().includes(matchedDest.name.toLowerCase())) || STAYS[0];

  const schedule = hasManualItems
    ? trip.days.map(d => ({
        day: d.dayNumber,
        label: d.label || `Day 0${d.dayNumber}`,
        items: d.items.length > 0
          ? d.items.map(item => ({
              name: item.name,
              time: item.timeSlot || '09:00 AM',
              duration: item.duration,
              price: item.price,
              status: 'confirmed'
            }))
          : [
              { name: `Free exploration & local dining in ${destName}`, time: 'All Day', duration: 'Flexible', price: 'Self', status: 'confirmed' }
            ]
      }))
    : [
        {
          day: 1,
          label: `Day 01 — Arrival & ${matchingStay.name}`,
          items: [
            { name: `Check-in at ${matchingStay.name}`, time: '02:00 PM', duration: 'Check-in', price: matchingStay.price, status: 'confirmed' },
            { name: `Evening Heritage Walk & Local Dinner`, time: '06:00 PM', duration: '2 Hours', price: 'Included', status: 'confirmed' }
          ]
        },
        {
          day: 2,
          label: `Day 02 — ${matchingAdventures[0]?.name || 'Guided Mountain Exploration'}`,
          items: [
            { name: matchingAdventures[0]?.name || 'Signature Adventure Expedition', time: '08:30 AM', duration: matchingAdventures[0]?.duration || '4 Hours', price: matchingAdventures[0]?.price || '₹3,999', status: 'confirmed' },
            { name: 'Traditional Lunch & Mountain Vista Viewpoint', time: '01:30 PM', duration: '2 Hours', price: '₹850', status: 'pending' },
            { name: 'Bonfire & Stargazing Session', time: '08:00 PM', duration: '2 Hours', price: 'Included', status: 'confirmed' }
          ]
        },
        {
          day: 3,
          label: `Day 03 — ${matchingAdventures[1]?.name || 'Cultural Immersion & Departure'}`,
          items: [
            { name: matchingAdventures[1]?.name || 'Sunrise Scenic Trail & Photography', time: '06:30 AM', duration: '2 Hours', price: matchingAdventures[1]?.price || 'Included', status: 'confirmed' },
            { name: 'Artisan Souvenirs & Departure Transfer', time: '12:00 PM', duration: 'Check-out', price: '—', status: 'confirmed' }
          ]
        }
      ];

  return (
    <div>
      {/* Destination Hero Header */}
      <section className="relative h-[340px] overflow-hidden">
        <img
          src={heroImage}
          alt={destName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#010611]/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <span className="badge mb-2">Curated Trip Plan</span>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">{destName}</h1>
          <span className="label label--accent text-sm mt-2 inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1"><Calendar size={13} /> {daysString}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} /> {totalTravelers.toString().padStart(2, '0')} Traveler{totalTravelers > 1 ? 's' : ''}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><MapPin size={13} /> {matchedDest.region}</span>
          </span>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="section pt-6 pb-24">
        <div className="container max-w-3xl">
          {/* 3D Stylized Trail Map Elevation Visualization */}
          <ItineraryScene destination={destName} daysCount={schedule.length} />

          <div className="timeline">
            {schedule.map((day) => (
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
              <Link
                href={`/booking?type=adventure&id=${matchingAdventures[0]?.id || 'rafting'}&travelers=${totalTravelers}&date=${daysString}`}
                className="btn btn--primary btn--lg inline-flex items-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link href="/trip-builder" className="btn btn--secondary btn--lg inline-flex items-center gap-1.5">
                <ArrowLeft size={14} /> Edit Trip Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading your custom itinerary...</div>}>
      <ItineraryContent />
    </Suspense>
  );
}
