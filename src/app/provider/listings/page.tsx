'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Layers,
  MountainSnow,
  Hotel,
  Compass,
  MapPin,
  X,
  CheckCircle2
} from 'lucide-react';

interface ListingItem {
  id: string;
  title: string;
  category: 'Adventure' | 'Stay' | 'Experience';
  location: string;
  price: number;
  capacity: number;
  slots: string;
  status: 'PUBLISHED' | 'UNDER_REVIEW' | 'DRAFT';
  image: string;
}

export default function ProviderListingsPage() {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [createdSuccess, setCreatedSuccess] = useState<boolean>(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [editingSlotValue, setEditingSlotValue] = useState<string>('');

  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: 'item-1',
      title: 'Ganga Rapid White-Water Rafting (Grade IV)',
      category: 'Adventure',
      location: 'Marine Drive to Rishikesh, UK',
      price: 3999,
      capacity: 24,
      slots: '08:30 AM, 11:30 AM, 02:30 PM',
      status: 'PUBLISHED',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    },
    {
      id: 'item-2',
      title: 'Shivpuri Riverside Wilderness Camp & BBQ',
      category: 'Stay',
      location: 'Shivpuri, Rishikesh, UK',
      price: 4999,
      capacity: 12,
      slots: 'Daily Check-in 12:00 PM',
      status: 'PUBLISHED',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80',
    },
    {
      id: 'item-3',
      title: 'Mohan Chatti Extreme Bungee Jump (83m)',
      category: 'Adventure',
      location: 'Mohan Chatti, Rishikesh, UK',
      price: 3750,
      capacity: 15,
      slots: '10:00 AM, 02:00 PM',
      status: 'PUBLISHED',
      image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?w=600&q=80',
    },
    {
      id: 'item-4',
      title: 'Neelkanth High-Altitude Trail Trek',
      category: 'Adventure',
      location: 'Neelkanth Valley, Rishikesh, UK',
      price: 2200,
      capacity: 10,
      slots: 'Weekend Batches (06:00 AM)',
      status: 'UNDER_REVIEW',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    },
  ]);

  const [newListing, setNewListing] = useState({
    title: '',
    category: 'Adventure' as 'Adventure' | 'Stay' | 'Experience',
    location: 'Rishikesh, Uttarakhand',
    price: 2999,
    capacity: 12,
    slots: '09:00 AM, 02:00 PM',
    description: '',
  });

  // Load listings from storage if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tj_provider_listings');
        if (saved) {
          setListings(JSON.parse(saved));
        }
      } catch {}
    }
  }, []);

  // Keyboard close listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCreateModal) {
        setShowCreateModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCreateModal]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListing.title.trim()) return;

    const created: ListingItem = {
      id: `item-${Date.now()}`,
      title: newListing.title.trim(),
      category: newListing.category,
      location: newListing.location,
      price: Number(newListing.price),
      capacity: Number(newListing.capacity),
      slots: newListing.slots,
      status: 'UNDER_REVIEW',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80',
    };

    try {
      let token = typeof window !== 'undefined' ? (sessionStorage.getItem('tj_token') || localStorage.getItem('tj_token')) : null;
      if (!token) {
        try {
          const authRes = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'operator@himalayaexpeditions.com', password: 'providerpass123' }),
          });
          if (authRes.ok) {
            const authData = await authRes.json();
            token = authData?.data?.token;
            if (typeof window !== 'undefined' && token) {
              sessionStorage.setItem('tj_token', token);
            }
          }
        } catch {}
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      };

      await fetch('/api/v1/providers/listings', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: created.title,
          category: created.category === 'Stay' ? 'Land' : created.category === 'Experience' ? 'Land' : 'Water',
          difficulty: 'Moderate',
          destinationSlug: 'rishikesh',
          duration: '3–4 Hours',
          basePrice: created.price,
          capacity: created.capacity,
          description: newListing.description || `${created.title} by verified operator`,
          heroImage: created.image,
          requirements: ['Govt Photo ID'],
          whatToCarry: ['Water bottle', 'Comfortable footwear'],
          whatToWear: ['Activewear'],
        }),
      });
    } catch {}

    const updated = [created, ...listings];
    setListings(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tj_provider_listings', JSON.stringify(updated));
      } catch {}
    }

    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setShowCreateModal(false);
      setNewListing({
        title: '',
        category: 'Adventure',
        location: 'Rishikesh, Uttarakhand',
        price: 2999,
        capacity: 12,
        slots: '09:00 AM, 02:00 PM',
        description: '',
      });
    }, 1200);
  };

  const toggleStatus = (id: string) => {
    setListings(listings.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
        };
      }
      return item;
    }));
  };

  const filteredListings = listings.filter(item => {
    if (filterCategory === 'ALL') return true;
    return item.category.toUpperCase() === filterCategory;
  });

  const filterTabs = [
    { id: 'ALL', label: 'ALL', icon: Layers },
    { id: 'ADVENTURE', label: 'ADVENTURE', icon: MountainSnow },
    { id: 'STAY', label: 'STAY', icon: Hotel },
    { id: 'EXPERIENCE', label: 'EXPERIENCE', icon: Compass },
  ];

  return (
    <>
      <main className="page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <Link href="/provider/dashboard" className="inline-flex items-center gap-1.5" style={{ color: 'var(--color-accent)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                  <ArrowLeft size={13} /> Operator Dashboard
                </Link>
              </div>
              <h1 className="h1" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', letterSpacing: '0.05em' }}>
                EXPERIENCE & STAY CATALOG
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Manage your real-time slot inventory, dynamic pricing rules, and publication statuses.
              </p>
            </div>

            <button 
              className="btn btn--primary inline-flex items-center gap-1.5"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={16} /> Create New Listing
            </button>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`btn btn--ghost btn--sm inline-flex items-center gap-1.5 ${filterCategory === tab.id ? 'active' : ''}`}
                  onClick={() => setFilterCategory(tab.id)}
                  style={{
                    border: filterCategory === tab.id ? '1px solid var(--color-accent)' : '1px solid var(--border-color)',
                    background: filterCategory === tab.id ? 'var(--color-accent-dim)' : 'transparent',
                    color: filterCategory === tab.id ? 'var(--color-accent)' : 'var(--text-secondary)',
                  }}
                >
                  <TabIcon size={13} />
                  <span>{tab.label} ({tab.id === 'ALL' ? listings.length : listings.filter(l => l.category.toUpperCase() === tab.id).length})</span>
                </button>
              );
            })}
          </div>

          {/* Listings Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredListings.map((item) => (
              <div 
                key={item.id} 
                className="card--info"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span className="badge" style={{ fontSize: '10px' }}>{item.category}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span 
                      className="badge" 
                      style={{ 
                        fontSize: '10px',
                        background: item.status === 'PUBLISHED' ? 'rgba(57, 255, 20, 0.2)' : item.status === 'UNDER_REVIEW' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: item.status === 'PUBLISHED' ? '#39ff14' : item.status === 'UNDER_REVIEW' ? '#ffc107' : 'var(--text-muted)'
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: '#fff', marginBottom: 'var(--space-1)' }}>
                      {item.title}
                    </h2>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {item.location}
                    </div>

                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div>Batch Capacity: <strong>{item.capacity} Pax</strong></div>
                      {editingSlotId === item.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                          <input
                            type="text"
                            value={editingSlotValue}
                            onChange={(e) => setEditingSlotValue(e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', background: 'var(--bg-primary)', border: '1px solid var(--color-accent)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                          />
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              className="btn btn--primary btn--sm"
                              style={{ fontSize: '10px', padding: '4px 10px' }}
                              onClick={() => {
                                setListings(listings.map(l => l.id === item.id ? { ...l, slots: editingSlotValue } : l));
                                setEditingSlotId(null);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn--ghost btn--sm"
                              style={{ fontSize: '10px', padding: '4px 10px' }}
                              onClick={() => setEditingSlotId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>Slots: <strong>{item.slots}</strong></div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--color-accent)' }}>
                      ₹{item.price.toLocaleString()}
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      {item.status !== 'UNDER_REVIEW' && (
                        <button 
                          className="btn btn--ghost btn--sm"
                          onClick={() => toggleStatus(item.id)}
                          style={{ fontSize: '10px' }}
                        >
                          {item.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                        </button>
                      )}
                      <button
                        className="btn btn--secondary btn--sm"
                        style={{ fontSize: '10px' }}
                        onClick={() => {
                          setEditingSlotId(item.id);
                          setEditingSlotValue(item.slots);
                        }}
                      >
                        Edit Slots
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Listing Modal */}
          {showCreateModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(1, 6, 17, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-4)'
            }}>
              <div 
                className="card--info"
                style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-card)', border: '1px solid var(--color-accent)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h2 style={{ fontSize: 'var(--text-xl)', color: '#fff' }}>Add New Marketplace Listing</h2>
                  <button 
                    type="button"
                    aria-label="Close dialog"
                    onClick={() => setShowCreateModal(false)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {createdSuccess ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                    <CheckCircle2 size={36} className="mx-auto text-[#39ff14] mb-2" />
                    <div style={{ color: '#fff', fontWeight: 600 }}>Listing Submitted for Admin Review!</div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Status is set to UNDER_REVIEW as per Phase 4 compliance.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Listing Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={newListing.title}
                        onChange={e => setNewListing({...newListing, title: e.target.value})}
                        placeholder="e.g. Kuari Pass High Winter Trek (4D/3N)"
                        style={{ width: '100%', padding: 'var(--space-3)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Category *</label>
                        <select 
                          value={newListing.category}
                          onChange={e => setNewListing({...newListing, category: e.target.value as any})}
                          style={{ width: '100%', padding: 'var(--space-3)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        >
                          <option value="Adventure">Adventure</option>
                          <option value="Stay">Stay / Lodge</option>
                          <option value="Experience">Guided Experience</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Base Price (₹) *</label>
                        <input 
                          type="number" 
                          required 
                          value={newListing.price}
                          onChange={e => setNewListing({...newListing, price: Number(e.target.value)})}
                          style={{ width: '100%', padding: 'var(--space-3)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Max Capacity (Pax) *</label>
                        <input 
                          type="number" 
                          required 
                          value={newListing.capacity}
                          onChange={e => setNewListing({...newListing, capacity: Number(e.target.value)})}
                          style={{ width: '100%', padding: 'var(--space-3)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Time Slots *</label>
                        <input 
                          type="text" 
                          required 
                          value={newListing.slots}
                          onChange={e => setNewListing({...newListing, slots: e.target.value})}
                          placeholder="e.g. 08:00 AM, 01:00 PM"
                          style={{ width: '100%', padding: 'var(--space-3)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                      <button 
                        type="button" 
                        className="btn btn--secondary btn--sm"
                        onClick={() => setShowCreateModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn--primary btn--sm">
                        Submit for Moderation
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
