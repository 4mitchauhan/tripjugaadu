'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'listings' | 'payouts'>('reservations');
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);

  // Realistic mock data matching backend schema & seed data
  const providerStats = {
    businessName: 'Ganga White Water Expeditions',
    location: 'Rishikesh, Uttarakhand',
    verified: true,
    rating: 4.92,
    totalReviews: 124,
    monthRevenue: '₹2,48,500',
    upcomingReservations: 16,
    activeListingsCount: 4,
  };

  const [reservations, setReservations] = useState([
    {
      id: 'res-101',
      guestName: 'Arjun Verma',
      serviceName: 'Ganga Rapid White-Water Rafting (Grade IV)',
      date: 'Tomorrow, 08:30 AM',
      travelers: 4,
      amount: '₹15,996',
      status: 'CONFIRMED',
      paymentStatus: 'CAPTURED',
      phone: '+91 98112 34567',
    },
    {
      id: 'res-102',
      guestName: 'Priya Sharma',
      serviceName: 'Riverside Jungle Camp & Bonfire',
      date: '12 Oct 2026',
      travelers: 2,
      amount: '₹9,998',
      status: 'CONFIRMED',
      paymentStatus: 'CAPTURED',
      phone: '+91 98223 45678',
    },
    {
      id: 'res-103',
      guestName: 'Rohan Deshmukh',
      serviceName: 'Mohan Chatti Cliff Bungee Jump (83m)',
      date: '15 Oct 2026',
      travelers: 2,
      amount: '₹7,500',
      status: 'CONFIRMED',
      paymentStatus: 'CAPTURED',
      phone: '+91 99334 56789',
    },
    {
      id: 'res-104',
      guestName: 'Kavita Menon',
      serviceName: 'Ganga Sunrise Guided Kayaking & Ganga Aarti',
      date: '18 Oct 2026',
      travelers: 3,
      amount: '₹4,500',
      status: 'CONFIRMED',
      paymentStatus: 'CAPTURED',
      phone: '+91 97445 67890',
    },
  ]);

  const listings = [
    {
      id: 'list-1',
      title: 'Ganga Rapid White-Water Rafting (Grade IV)',
      category: 'Adventure',
      price: '₹3,999 / person',
      status: 'PUBLISHED',
      capacity: '24 guests / slot',
      slots: '08:30 AM, 11:30 AM, 02:30 PM',
      rating: 4.9,
    },
    {
      id: 'list-2',
      title: 'Shivpuri Riverside Wilderness Camp & BBQ',
      category: 'Stay',
      price: '₹4,999 / night',
      status: 'PUBLISHED',
      capacity: '12 Swiss Tents',
      slots: 'Daily Check-in 12:00 PM',
      rating: 4.8,
    },
    {
      id: 'list-3',
      title: 'Mohan Chatti Extreme Bungee Jump (83m)',
      category: 'Adventure',
      price: '₹3,750 / person',
      status: 'PUBLISHED',
      capacity: '15 jumpers / day',
      slots: '10:00 AM, 02:00 PM',
      rating: 5.0,
    },
    {
      id: 'list-4',
      title: 'Neelkanth High-Altitude Trail Trek',
      category: 'Adventure',
      price: '₹2,200 / person',
      status: 'UNDER_REVIEW',
      capacity: '10 hikers',
      slots: 'Weekend Batches',
      rating: 'New',
    },
  ];

  const handleCheckIn = (resId: string) => {
    if (!checkedInIds.includes(resId)) {
      setCheckedInIds([...checkedInIds, resId]);
    }
  };

  return (
    <>
      <Navigation />
      <main className="page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
          
          {/* Header Profile Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                <span className="badge" style={{ background: 'rgba(0, 174, 239, 0.15)', color: 'var(--color-accent)' }}>OPERATOR PORTAL</span>
                <span className="badge" style={{ background: 'rgba(57, 255, 20, 0.15)', color: '#39ff14' }}>
                  ✓ VERIFIED OPERATOR
                </span>
              </div>
              <h1 className="h1" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', letterSpacing: '0.05em' }}>
                {providerStats.businessName}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                📍 {providerStats.location} • Operator Rating: <strong>{providerStats.rating} ★</strong> ({providerStats.totalReviews} verified reviews)
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link href="/provider/listings" className="btn btn--primary">
                + Manage Listings
              </Link>
              <Link href="/provider/register" className="btn btn--secondary">
                KYC Profile
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
            <div className="card--info">
              <span className="card__label">Monthly Net Volume</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-md)', color: '#fff', margin: 'var(--space-2) 0' }}>
                {providerStats.monthRevenue}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#39ff14' }}>
                ↑ +18.4% compared to last month
              </div>
            </div>

            <div className="card--info">
              <span className="card__label">Upcoming Guests</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-md)', color: '#fff', margin: 'var(--space-2) 0' }}>
                {providerStats.upcomingReservations}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                Across 4 active adventure batches
              </div>
            </div>

            <div className="card--info">
              <span className="card__label">Active Listings</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-md)', color: '#fff', margin: 'var(--space-2) 0' }}>
                {providerStats.activeListingsCount}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                3 Published • 1 Under Review
              </div>
            </div>

            <div className="card--info">
              <span className="card__label">Payout Cycle</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-md)', color: '#fff', margin: 'var(--space-2) 0' }}>
                T+1 IMPS
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Auto-settlement to HDFC **1234
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', marginBottom: 'var(--space-6)' }}>
            <button 
              className={`btn btn--ghost ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
              style={{ borderBottom: activeTab === 'reservations' ? '2px solid var(--color-accent)' : 'none', borderRadius: 0, color: activeTab === 'reservations' ? 'var(--color-accent)' : 'var(--text-secondary)' }}
            >
              Live Reservations ({reservations.length})
            </button>
            <button 
              className={`btn btn--ghost ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
              style={{ borderBottom: activeTab === 'listings' ? '2px solid var(--color-accent)' : 'none', borderRadius: 0, color: activeTab === 'listings' ? 'var(--color-accent)' : 'var(--text-secondary)' }}
            >
              My Listings ({listings.length})
            </button>
            <button 
              className={`btn btn--ghost ${activeTab === 'payouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('payouts')}
              style={{ borderBottom: activeTab === 'payouts' ? '2px solid var(--color-accent)' : 'none', borderRadius: 0, color: activeTab === 'payouts' ? 'var(--color-accent)' : 'var(--text-secondary)' }}
            >
              Settlement & Payouts
            </button>
          </div>

          {/* TAB 1: Live Reservations */}
          {activeTab === 'reservations' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Confirmed Traveler Arrivals & Check-ins
                </h2>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Auto-synced with Razorpay payment confirmation
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {reservations.map((res) => {
                  const isCheckedIn = checkedInIds.includes(res.id);

                  return (
                    <div 
                      key={res.id} 
                      className="card--info"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-6)' }}
                    >
                      <div style={{ minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                          <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: '#fff' }}>{res.guestName}</span>
                          <span className="badge" style={{ fontSize: '10px', background: 'rgba(0, 174, 239, 0.1)', color: 'var(--color-accent)' }}>
                            {res.travelers} Guests
                          </span>
                        </div>
                        <div style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                          {res.serviceName}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginTop: '2px' }}>
                          Slot: {res.date} • Contact: {res.phone}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: '#fff' }}>
                          {res.amount}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: '#39ff14' }}>
                          ✓ Razorpay Paid
                        </div>
                      </div>

                      <div>
                        {isCheckedIn ? (
                          <span className="badge" style={{ background: 'rgba(57, 255, 20, 0.2)', color: '#39ff14', padding: 'var(--space-2) var(--space-4)' }}>
                            ✓ CHECKED IN
                          </span>
                        ) : (
                          <button 
                            className="btn btn--primary btn--sm"
                            onClick={() => handleCheckIn(res.id)}
                          >
                            Verify & Check In
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Listings Snapshot */}
          {activeTab === 'listings' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
              {listings.map((item) => (
                <div key={item.id} className="card--info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <span className="badge" style={{ fontSize: '10px' }}>{item.category}</span>
                      <span 
                        className="badge" 
                        style={{ 
                          fontSize: '10px', 
                          background: item.status === 'PUBLISHED' ? 'rgba(57, 255, 20, 0.15)' : 'rgba(255, 193, 7, 0.15)',
                          color: item.status === 'PUBLISHED' ? '#39ff14' : '#ffc107'
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: '#fff', marginBottom: 'var(--space-2)' }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                      Capacity: {item.capacity}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      Active Slots: {item.slots}
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                      {item.price}
                    </div>
                    <Link href="/provider/listings" className="btn btn--ghost btn--sm">
                      Edit Slots &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Settlements & Payouts */}
          {activeTab === 'payouts' && (
            <div className="card--info">
              <h2 style={{ fontSize: 'var(--text-lg)', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
                Bank Payout History & Ledger
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                Direct bank settlement to HDFC Bank (A/C: **********4920, IFSC: HDFC0001234). 5% platform commission deducted automatically at order capture.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)' }}>
                  <div>
                    <strong>Settlement #SET-2026-9041</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Processed via IMPS on 04 Oct 2026</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#39ff14' }}>+ ₹62,450.00</div>
                    <span className="badge" style={{ fontSize: '10px' }}>SUCCESS</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)' }}>
                  <div>
                    <strong>Settlement #SET-2026-8912</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Processed via IMPS on 27 Sep 2026</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#39ff14' }}>+ ₹84,120.00</div>
                    <span className="badge" style={{ fontSize: '10px' }}>SUCCESS</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
