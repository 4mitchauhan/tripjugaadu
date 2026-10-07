'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PackingItem {
  id: string;
  name: string;
  category: 'Clothing' | 'Footwear' | 'Documents' | 'Gear' | 'Medical';
  checked: boolean;
  required: boolean;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trips' | 'packing' | 'wishlist'>('dashboard');

  // Initial Packing Items for Rishikesh Expedition
  const [packingList, setPackingList] = useState<PackingItem[]>([
    { id: 'p1', name: 'Quick-dry synthetic t-shirts & shorts', category: 'Clothing', checked: true, required: true },
    { id: 'p2', name: 'Fleece jacket / light windbreaker', category: 'Clothing', checked: true, required: true },
    { id: 'p3', name: 'Water-resistant trekking pants', category: 'Clothing', checked: false, required: false },
    { id: 'p4', name: 'Trekking shoes with vibram grip', category: 'Footwear', checked: true, required: true },
    { id: 'p5', name: 'Neoprene booties / water shoes for rafting', category: 'Footwear', checked: false, required: true },
    { id: 'p6', name: 'Govt Original Photo ID (Aadhaar / Passport)', category: 'Documents', checked: true, required: true },
    { id: 'p7', name: 'TripJugaadu Digital Voucher (TJ-RISHI-8921)', category: 'Documents', checked: true, required: true },
    { id: 'p8', name: 'Medical fitness self-declaration (for Bungee)', category: 'Documents', checked: false, required: true },
    { id: 'p9', name: 'Waterproof phone dry bag (10L)', category: 'Gear', checked: true, required: true },
    { id: 'p10', name: 'GoPro / Action camera with chest mount', category: 'Gear', checked: false, required: false },
    { id: 'p11', name: 'Personal first aid & altitude sickness pills', category: 'Medical', checked: true, required: true },
    { id: 'p12', name: 'SPF 50+ mineral sunscreen & lip balm', category: 'Medical', checked: false, required: true },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState<'Clothing' | 'Footwear' | 'Documents' | 'Gear' | 'Medical'>('Gear');

  const toggleItem = (id: string) => {
    setPackingList(
      packingList.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setPackingList([
      ...packingList,
      {
        id: `custom-${Date.now()}`,
        name: newItemName.trim(),
        category: newItemCat,
        checked: false,
        required: false,
      },
    ]);
    setNewItemName('');
  };

  const completedCount = packingList.filter(i => i.checked).length;
  const readinessPercent = Math.round((completedCount / packingList.length) * 100);

  const dashCards = [
    { icon: '✈', label: 'My Trips', title: 'Upcoming Trips', subtitle: '1 active, 2 completed', action: () => setActiveTab('trips') },
    { icon: '📋', label: 'Bookings', title: 'Active Vouchers', subtitle: '3 confirmed activities', link: '/confirmation' },
    { icon: '📅', label: 'Itinerary', title: 'Interactive Itinerary', subtitle: '3-day timeline schedule', link: '/itinerary' },
    { icon: '🎒', label: 'Readiness', title: 'Packing Checklist', subtitle: `${readinessPercent}% ready (${completedCount}/${packingList.length} items)`, action: () => setActiveTab('packing') },
    { icon: '♡', label: 'Wishlist', title: 'Saved Stays & Treks', subtitle: '4 items bookmarked', action: () => setActiveTab('wishlist') },
    { icon: '📌', label: 'Operator Portal', title: 'Marketplace Partner', subtitle: 'Switch to Operator View', link: '/provider/dashboard' }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="dashboard__sidebar">
          <div className="p-6 border-b border-[var(--border-color)] mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] font-bold text-lg mb-3">
              A
            </div>
            <span className="font-bold text-white text-base block">Amit Sharma</span>
            <span className="label text-xs mt-1">Verified Traveler · New Delhi</span>
          </div>

          <div
            onClick={() => setActiveTab('dashboard')}
            className={`dashboard__nav-item cursor-pointer ${activeTab === 'dashboard' ? 'dashboard__nav-item--active' : ''}`}
          >
            <span>◆</span> Overview Dashboard
          </div>

          <div
            onClick={() => setActiveTab('trips')}
            className={`dashboard__nav-item cursor-pointer ${activeTab === 'trips' ? 'dashboard__nav-item--active' : ''}`}
          >
            <span>✈</span> My Trips & Timeline
          </div>

          <div
            onClick={() => setActiveTab('packing')}
            className={`dashboard__nav-item cursor-pointer ${activeTab === 'packing' ? 'dashboard__nav-item--active' : ''}`}
          >
            <span>🎒</span> Travel Readiness & Packing
          </div>

          <div
            onClick={() => setActiveTab('wishlist')}
            className={`dashboard__nav-item cursor-pointer ${activeTab === 'wishlist' ? 'dashboard__nav-item--active' : ''}`}
          >
            <span>♡</span> Saved Wishlist
          </div>

          <Link href="/confirmation" className="dashboard__nav-item">
            <span>📋</span> Active Vouchers
          </Link>

          <Link href="/trip-builder" className="dashboard__nav-item">
            <span>🛠</span> Trip Builder
          </Link>

          <Link href="/provider/dashboard" className="dashboard__nav-item" style={{ color: 'var(--color-accent)' }}>
            <span>🏢</span> Operator Portal
          </Link>

          <Link href="/admin" className="dashboard__nav-item" style={{ color: '#ffc107' }}>
            <span>⚙</span> Admin Console
          </Link>

          <Link href="/" className="dashboard__nav-item mt-auto pt-6 border-t border-[var(--border-color)]">
            <span>←</span> Back to Public Site
          </Link>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard__content p-6 md:p-10 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div>
                  <span className="badge mb-2">Traveler Command Center</span>
                  <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">Your Next Adventure</h1>
                </div>
                <Link href="/trip-builder" className="btn btn--primary">
                  + Plan New Journey
                </Link>
              </div>

              {/* Featured Trip Card */}
              <div className="dashboard__featured reveal relative rounded-3xl overflow-hidden mb-10 border border-[var(--border-color)]">
                <img
                  className="dashboard__featured-img w-full h-[280px] md:h-[340px] object-cover"
                  src="https://images.unsplash.com/photo-1600089769887-f0890642a730?w=1200&q=80"
                  alt="Rishikesh"
                />
                <div className="dashboard__featured-overlay absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#010611]/60 to-transparent"></div>
                <div className="dashboard__featured-content absolute bottom-0 left-0 right-0 p-8">
                  <span className="badge mb-2">Upcoming Expedition</span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-white mb-2">
                    Rishikesh · 12–15 Oct 2026
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Riverside Luxury Retreat · White Water Rafting · Bungee Jump
                  </p>

                  <div className="dashboard__featured-readiness flex items-center gap-4 max-w-md">
                    <div className="readiness-bar flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="readiness-bar__fill h-full bg-[var(--color-accent)] transition-all duration-300"
                        style={{ width: `${readinessPercent}%` }}
                      ></div>
                    </div>
                    <span className="label label--accent text-xs">
                      {readinessPercent}% Ready ({completedCount}/{packingList.length} items packed)
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Access Cards */}
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Quick Overview</h3>
                <div className="dashboard__cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashCards.map((card, idx) => (
                    card.link ? (
                      <Link
                        key={idx}
                        href={card.link}
                        className="card--info reveal p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--color-accent)] transition-all block cursor-pointer"
                      >
                        <span className="card__label">{card.label}</span>
                        <div className="card__icon text-2xl my-2 text-[var(--color-accent)]">{card.icon}</div>
                        <h4 className="card__title font-bold text-white text-base">{card.title}</h4>
                        <p className="card__desc text-xs text-[var(--text-secondary)] mt-1">{card.subtitle}</p>
                      </Link>
                    ) : (
                      <div
                        key={idx}
                        onClick={card.action}
                        className="card--info reveal p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--color-accent)] transition-all block cursor-pointer"
                      >
                        <span className="card__label">{card.label}</span>
                        <div className="card__icon text-2xl my-2 text-[var(--color-accent)]">{card.icon}</div>
                        <h4 className="card__title font-bold text-white text-base">{card.title}</h4>
                        <p className="card__desc text-xs text-[var(--text-secondary)] mt-1">{card.subtitle}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: MY TRIPS */}
          {activeTab === 'trips' && (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                  <span className="badge mb-2">Trips Ledger</span>
                  <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">Your Expeditions</h1>
                </div>
                <Link href="/trip-builder" className="btn btn--primary btn--sm">
                  + New Itinerary
                </Link>
              </div>

              <div className="space-y-6">
                {/* Active Trip */}
                <div className="card--info p-6 border-l-4 border-l-[var(--color-accent)]">
                  <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                    <div>
                      <span className="badge text-[10px] bg-green-500/20 text-green-400 mb-2 inline-block">CONFIRMED UPCOMING</span>
                      <h3 className="text-xl font-bold text-white">Ganges Adrenaline & Serenity (4 Days)</h3>
                      <p className="text-xs text-[var(--text-secondary)]">Destination: Rishikesh, Uttarakhand · Dates: 12 Oct – 15 Oct 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[var(--color-accent)]">₹15,996</div>
                      <div className="text-xs text-green-400">Paid in Full</div>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/itinerary" className="btn btn--secondary btn--sm">
                      View Day-by-Day Itinerary &rarr;
                    </Link>
                    <Link href="/confirmation" className="btn btn--ghost btn--sm">
                      View Booking Voucher
                    </Link>
                    <button onClick={() => setActiveTab('packing')} className="btn btn--ghost btn--sm">
                      Open Packing Checklist
                    </button>
                  </div>
                </div>

                {/* Past Trip */}
                <div className="card--info p-6 opacity-75">
                  <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                    <div>
                      <span className="badge text-[10px] bg-gray-500/20 text-gray-400 mb-2 inline-block">COMPLETED</span>
                      <h3 className="text-xl font-bold text-white">Hampta Pass High Altitude Crossing</h3>
                      <p className="text-xs text-[var(--text-secondary)]">Destination: Manali to Spiti · Completed June 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">₹18,500</div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn--secondary btn--sm">Write Operator Review</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PACKING & READINESS CHECKLIST */}
          {activeTab === 'packing' && (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                  <span className="badge mb-2">Know Before You Go (KBYG)</span>
                  <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">
                    Expedition Packing Checklist
                  </h1>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Customized for: <strong>Rishikesh Rafting & Bungee Jump</strong> · Uttarakhand (Grade IV Waters)
                  </p>
                </div>

                {/* Live Readiness Gauge */}
                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--color-accent)] rounded-2xl text-center min-w-[200px]">
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Trip Readiness</div>
                  <div className="text-3xl font-bold text-[var(--color-accent)]">{readinessPercent}%</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-1">
                    {completedCount} of {packingList.length} items verified
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8">
                <div 
                  className="h-full bg-[var(--color-accent)] transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                ></div>
              </div>

              {/* Categories */}
              {(['Clothing', 'Footwear', 'Documents', 'Gear', 'Medical'] as const).map(cat => {
                const catItems = packingList.filter(i => i.category === cat);
                if (catItems.length === 0) return null;

                return (
                  <div key={cat} className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 flex items-center gap-2">
                      <span>•</span> {cat} ({catItems.filter(i => i.checked).length}/{catItems.length})
                    </h3>
                    <div className="space-y-2">
                      {catItems.map(item => (
                        <label 
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer transition-all"
                        >
                          <input 
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItem(item.id)}
                            className="w-4 h-4 rounded text-[var(--color-accent)] accent-[var(--color-accent)] cursor-pointer"
                          />
                          <span className={`text-sm flex-1 ${item.checked ? 'line-through text-[var(--text-muted)]' : 'text-white'}`}>
                            {item.name}
                          </span>
                          {item.required && (
                            <span className="text-[10px] uppercase font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                              Required
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Add Custom Item Form */}
              <form onSubmit={handleAddItem} className="mt-8 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] flex gap-3 flex-wrap">
                <input 
                  type="text"
                  placeholder="Add custom packing item (e.g. Energy bars, Extra camera battery)"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="flex-1 min-w-[200px] p-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-sm text-white"
                />
                <select 
                  value={newItemCat} 
                  onChange={e => setNewItemCat(e.target.value as any)}
                  className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-sm text-white"
                >
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Documents">Documents</option>
                  <option value="Gear">Gear</option>
                  <option value="Medical">Medical</option>
                </select>
                <button type="submit" className="btn btn--primary btn--sm">
                  + Add Item
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="badge mb-2">Saved Escapes</span>
                  <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">Your Wishlist</h1>
                </div>
                <Link href="/explore" className="btn btn--secondary btn--sm">
                  Browse More &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Mohan Chatti Cliff Bungee Jump',
                    loc: 'Rishikesh, Uttarakhand',
                    price: '₹3,750',
                    img: 'https://images.unsplash.com/photo-1521334884684-d80222895322?w=600&q=80',
                    link: '/adventure/rishikesh-bungee-jump'
                  },
                  {
                    title: 'Solang Valley High Tandem Paragliding',
                    loc: 'Manali, Himachal Pradesh',
                    price: '₹3,200',
                    img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80',
                    link: '/adventure/manali-paragliding'
                  },
                  {
                    title: 'Zanskar River High Ice Chaddar Trek',
                    loc: 'Leh, Ladakh',
                    price: '₹42,000',
                    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
                    link: '/adventure/zanskar-chadar-trek'
                  },
                  {
                    title: 'Wildernest Nature Resort Eco-Cottage',
                    loc: 'Goa Hinterlands',
                    price: '₹7,500',
                    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
                    link: '/stay/wildernest-goa'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="card--info p-0 overflow-hidden flex flex-col justify-between">
                    <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] mb-3">📍 {item.loc}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-[var(--border-color)]">
                        <span className="font-bold text-[var(--color-accent)]">{item.price}</span>
                        <Link href={item.link} className="btn btn--primary btn--sm">
                          Book Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
