'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DESTINATIONS } from '@/lib/data';
import { useLocale } from '@/context/LocaleContext';

export default function TripBuilderPage() {
  const router = useRouter();
  const { formatPrice, t } = useLocale();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDest, setSelectedDest] = useState<string>('rishikesh');
  const [checkIn, setCheckIn] = useState<string>('2026-10-12');
  const [checkOut, setCheckOut] = useState<string>('2026-10-15');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Rafting & Rapids',
    'Mountain Trails',
    'Riverside Cafes'
  ]);
  const [budgetTier, setBudgetTier] = useState<string>('EXPLORER');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiProposal, setAiProposal] = useState<any>(null);

  // Group Collaboration & Bill Splitting State (Phase 6)
  const [collaborators, setCollaborators] = useState<Array<{ name: string; email: string; role: string }>>([
    { name: 'Arjun Verma (You)', email: 'arjun@tripjugaadu.com', role: 'OWNER' },
    { name: 'Pooja Hegde', email: 'pooja@gmail.com', role: 'EDITOR' },
    { name: 'Karan Mehra', email: 'karan@outlook.com', role: 'VIEWER' },
  ]);
  const [newCollabName, setNewCollabName] = useState('');
  const [newCollabEmail, setNewCollabEmail] = useState('');
  const [newCollabRole, setNewCollabRole] = useState('EDITOR');
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({
    rafting: 3,
    bungee: 1,
    camping: 2,
  });

  const handleAddCollaborator = () => {
    if (!newCollabName || !newCollabEmail) return;
    setCollaborators(prev => [...prev, { name: newCollabName, email: newCollabEmail, role: newCollabRole }]);
    setNewCollabName('');
    setNewCollabEmail('');
  };

  const handleVote = (activityKey: string) => {
    setVotes(prev => ({
      ...prev,
      [activityKey]: (prev[activityKey] || 0) + 1,
    }));
  };


  const handleAiAutoPlan = async (customText?: string) => {
    const text = customText || aiPrompt || '3 days in Rishikesh with rafting and river camp under 15000';
    setIsGenerating(true);

    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      if (res.ok) {
        const json = await res.json();
        setAiProposal(json.data);
        if (json.data.destination) {
          setSelectedDest(json.data.destination.toLowerCase());
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  const interestsList = [
    'Rafting & Rapids',
    'Mountain Trails',
    'Bungee & High Drops',
    'Spiritual & Ganga Aarti',
    'Riverside Cafes',
    'Yoga & Sound Healing',
    'Heritage & Monasteries',
    'Local Street Food'
  ];

  const toggleInterest = (item: string) => {
    setSelectedInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleFinish = () => {
    // Navigate to itinerary
    router.push('/itinerary');
  };

  return (
    <div className="pt-24 pb-20">
      <section className="section pt-6 text-center">
        <div className="container max-w-4xl">
          <div className="section__header reveal text-center">
            <span className="badge mb-3">Intelligent Journey Architect</span>
            <h1 className="section__title">Build Your Journey</h1>
            <p className="section__subtitle max-w-xl mx-auto">
              You bring the idea. We build the itinerary, prepare your requirements, and organize certified services.
            </p>
          </div>

          <div className="trip-builder reveal mt-8">
            {/* AI Auto-Plan Intelligence Banner */}
            <div 
              style={{
                marginBottom: 'var(--space-8)',
                padding: 'var(--space-6)',
                background: 'linear-gradient(135deg, rgba(7, 27, 58, 0.7), rgba(1, 6, 17, 0.8))',
                border: '1px solid rgba(0, 174, 239, 0.4)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span className="badge" style={{ background: 'rgba(0, 174, 239, 0.15)', color: 'var(--color-accent)' }}>
                  ⚡ AI EXPEDITION ARCHITECT
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Grounded in Verified Operator Capacity & Schedules
                </span>
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', color: '#fff', marginBottom: 'var(--space-1)', textTransform: 'uppercase' }}>
                Instant Multi-Day Trip Generation
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Describe your dream escape in natural language or pick a sample prompt. The AI will pull real slots, stays, and activities.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                {[
                  '3 days in Rishikesh with rafting and river camp under 15000',
                  'Weekend paragliding & cafe crawl in Manali for 2',
                  'Relaxing cultural & temple journey in Ladakh for 5 days',
                ].map((smp, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiPrompt(smp);
                      handleAiAutoPlan(smp);
                    }}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(0, 174, 239, 0.08)',
                      border: '1px solid rgba(0, 174, 239, 0.25)',
                      color: 'var(--color-accent)',
                      cursor: 'pointer',
                    }}
                  >
                    "{smp}"
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. 3 days in Rishikesh with Grade IV rafting, bungee, and luxury camp under ₹18,000..."
                  style={{
                    flex: 1,
                    minWidth: '260px',
                    padding: 'var(--space-3)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: 'var(--text-xs)',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => handleAiAutoPlan()}
                  disabled={isGenerating}
                  className="btn btn--primary"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {isGenerating ? 'Synthesizing...' : 'Generate with AI →'}
                </button>
              </div>

              {/* Proposal Preview if generated */}
              {aiProposal && (
                <div
                  style={{
                    marginTop: 'var(--space-5)',
                    padding: 'var(--space-4)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <div>
                      <span className="badge" style={{ fontSize: '10px', marginRight: '6px' }}>{aiProposal.travelStyle}</span>
                      <strong style={{ color: '#fff', fontSize: 'var(--text-sm)' }}>{aiProposal.title}</strong>
                    </div>
                    <div style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                      Total: ~₹{aiProposal.totalEstimatedBudget.toLocaleString()}
                    </div>
                  </div>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    {aiProposal.readinessSummary}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    {aiProposal.days.map((d: any) => (
                      <div key={d.dayNumber} style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '11px' }}>
                        <div style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Day {d.dayNumber}: {d.theme}</div>
                        <div style={{ color: '#fff', marginTop: '2px' }}>• {d.morningActivity?.title}</div>
                        <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>• {d.afternoonActivity?.title}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {aiProposal.disclaimer}
                    </span>
                    <button
                      onClick={handleFinish}
                      className="btn btn--primary btn--sm"
                    >
                      Adopt Plan & Open Interactive Itinerary →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Steps Progress */}
            <div className="steps mb-10" id="trip-steps">
              {[
                { num: 1, label: 'Destination' },
                { num: 2, label: 'Dates' },
                { num: 3, label: 'Travelers' },
                { num: 4, label: 'Interests' },
                { num: 5, label: 'Budget' },
              ].map((s) => (
                <div
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`step cursor-pointer ${
                    currentStep === s.num ? 'step--active' : currentStep > s.num ? 'step--completed' : ''
                  }`}
                >
                  <span className="mr-2 opacity-60">0{s.num}</span> {s.label}
                </div>
              ))}
            </div>

            {/* Step 1: Destination Selection */}
            {currentStep === 1 && (
              <div className="step-panel animate-fadeIn">
                <span className="label label--accent mb-4 inline-block">Step 01 — Choose Destination</span>
                <div className="trip-builder__destinations mt-4">
                  {DESTINATIONS.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDest(d.id)}
                      className={`trip-builder__dest-card cursor-pointer transition-all ${
                        selectedDest === d.id ? 'trip-builder__dest-card--active ring-2 ring-[var(--color-accent)]' : ''
                      }`}
                    >
                      <img src={d.image} alt={d.name} loading="lazy" />
                      <div className="name font-bold uppercase">{d.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Dates */}
            {currentStep === 2 && (
              <div className="step-panel animate-fadeIn">
                <span className="label label--accent mb-4 inline-block">Step 02 — Select Travel Dates</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto mt-6 text-left">
                  <div>
                    <label className="auth-form__label">Check-in Date</label>
                    <input
                      type="date"
                      className="auth-form__input"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="auth-form__label">Check-out Date</label>
                    <input
                      type="date"
                      className="auth-form__input"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Travelers */}
            {currentStep === 3 && (
              <div className="step-panel animate-fadeIn">
                <span className="label label--accent mb-4 inline-block">Step 03 — How Many Travelers?</span>
                <div className="flex justify-center gap-12 mt-8">
                  <div className="text-center">
                    <span className="label block mb-3">Adults (12+ yrs)</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="btn btn--secondary w-10 h-10 p-0 flex items-center justify-center font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="font-mono text-2xl font-bold text-white w-8">{adults.toString().padStart(2, '0')}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="btn btn--secondary w-10 h-10 p-0 flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="label block mb-3">Children</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="btn btn--secondary w-10 h-10 p-0 flex items-center justify-center font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="font-mono text-2xl font-bold text-white w-8">{children.toString().padStart(2, '0')}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="btn btn--secondary w-10 h-10 p-0 flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {currentStep === 4 && (
              <div className="step-panel animate-fadeIn">
                <span className="label label--accent mb-4 inline-block">Step 04 — Select Activity Interests</span>
                <p className="text-xs text-[var(--text-secondary)] mb-6">Select the adventure and travel styles you wish to prioritize.</p>
                <div className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
                  {interestsList.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`tag cursor-pointer px-4 py-2 text-sm ${
                        selectedInterests.includes(interest) ? 'tag--active' : ''
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Budget Tier */}
            {currentStep === 5 && (
              <div className="step-panel animate-fadeIn">
                <span className="label label--accent mb-4 inline-block">Step 05 — Estimated Budget Tier</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-6">
                  {[
                    { id: 'BACKPACKER', name: 'Backpacker', range: '₹5K – ₹15K', desc: 'Hostels, shared treks, local buses' },
                    { id: 'EXPLORER', name: 'Explorer', range: '₹15K – ₹35K', desc: 'Boutique stays, private rafting, SUV transfers' },
                    { id: 'LUXURY', name: 'Luxury Sanctuary', range: '₹35K+', desc: '5-star resorts, private guides, all-inclusive' }
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id)}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all text-left ${
                        budgetTier === tier.id
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                          : 'border-[var(--border-color)] bg-[var(--bg-card)]'
                      }`}
                    >
                      <h4 className="font-bold text-white uppercase text-base">{tier.name}</h4>
                      <p className="text-lg font-bold text-[var(--color-accent)] my-2">{tier.range}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{tier.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phase 6: Group Collaboration & Bill Splitting Widget */}
            <div 
              style={{
                marginTop: 'var(--space-8)',
                padding: 'var(--space-6)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(0, 174, 239, 0.3)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>👥 Group Travel Canvas & Bill Splitter</span>
                    <span className="badge" style={{ fontSize: '9px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                      PHASE 6 COLLABORATION
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                    Invite co-travelers, assign permissions, split expenses, and vote on activities.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCollabModal(!showCollabModal)}
                  className="btn btn--secondary btn--sm"
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                >
                  {showCollabModal ? 'Hide Invite Form' : '+ Invite Co-Traveler'}
                </button>
              </div>

              {/* Invite Form */}
              {showCollabModal && (
                <div style={{ padding: '12px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={newCollabName}
                    onChange={(e) => setNewCollabName(e.target.value)}
                    placeholder="Friend's Full Name"
                    style={{ flex: 1, minWidth: '140px', padding: '8px 10px', background: '#0a101d', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                  />
                  <input
                    type="email"
                    value={newCollabEmail}
                    onChange={(e) => setNewCollabEmail(e.target.value)}
                    placeholder="Email address"
                    style={{ flex: 1, minWidth: '160px', padding: '8px 10px', background: '#0a101d', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                  />
                  <select
                    value={newCollabRole}
                    onChange={(e) => setNewCollabRole(e.target.value)}
                    style={{ padding: '8px 10px', background: '#0a101d', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                  >
                    <option value="EDITOR">EDITOR (Can suggest items)</option>
                    <option value="VIEWER">VIEWER (Read-only)</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCollaborator}
                    className="btn btn--primary btn--sm"
                    style={{ padding: '8px 14px', fontSize: '11px' }}
                  >
                    Send Invite
                  </button>
                </div>
              )}

              {/* Collaborators List & Bill Split Calculation */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Active Trip Circle ({collaborators.length} Travelers)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {collaborators.map((c, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#fff' }}>
                        <span>{c.name}</span>
                        <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: c.role === 'OWNER' ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.08)', color: c.role === 'OWNER' ? '#eab308' : '#94a3b8' }}>
                          {c.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Bill Splitter */}
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Automated Split-Bill Calculation
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {formatPrice(Math.round((adults * 15000) / (collaborators.length || 1)))} <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>per traveler</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Total Estimated Group Budget: {formatPrice(adults * 15000)} split across {collaborators.length} members.
                  </div>
                </div>
              </div>

              {/* Group Activity Voting */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Group Activity Voting Consensus:
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { key: 'rafting', name: 'Grade IV Rafting Expedition', badge: 'High Adrenaline' },
                    { key: 'bungee', name: '83m Bungee Jump', badge: 'Extreme' },
                    { key: 'camping', name: 'Riverside Swiss Campfire', badge: 'Relaxed' },
                  ].map((act) => (
                    <div
                      key={act.key}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{act.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--color-accent)' }}>{act.badge}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleVote(act.key)}
                        style={{
                          background: 'rgba(0,174,239,0.2)',
                          border: '1px solid var(--color-accent)',
                          color: '#fff',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                      >
                        👍 {votes[act.key] || 0}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-[var(--border-color)]">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                className={`btn btn--secondary ${currentStep === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                ← Previous Step
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                  className="btn btn--primary"
                >
                  Continue to Next Step <span className="btn-arrow">→</span>
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="btn btn--primary font-bold text-base px-8 shadow-lg shadow-cyan-500/20"
                >
                  Generate My Itinerary <span className="btn-arrow">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
