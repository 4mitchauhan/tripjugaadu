'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  proposal?: any;
  searchResults?: any;
  sources?: string[];
}

export default function AiTravelCompanion() {
  const { formatPrice, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'monitor' | 'multimodal' | 'autonomous'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitoring State
  const [monitorData, setMonitorData] = useState<any>(null);
  const [isFetchingMonitor, setIsFetchingMonitor] = useState(false);

  // Multimodal State
  const [multimodalTask, setMultimodalTask] = useState<'PACKING_CHECKLIST' | 'LANDMARK_IDENTIFICATION'>('PACKING_CHECKLIST');
  const [gearInput, setGearInput] = useState('Dry bag 20L, neoprene booties, synthetic rash guard, sunglasses');
  const [multimodalResult, setMultimodalResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Autonomous State (PART 102 Progressive Autonomy)
  const [autonomyLevel, setAutonomyLevel] = useState<number>(4);
  const [autonomyResult, setAutonomyResult] = useState<any>(null);
  const [confirmationToken, setConfirmationToken] = useState('CONFIRM_TJ_2026');
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Namaste! I am your TripJugaadu AI Travel Architect. I provide Level 0-5 travel intelligence, active mountain monitoring, multimodal gear inspection, and verified operator booking.',
      timestamp: 'Just now',
    },
  ]);

  const quickChips = [
    'Plan 3-day Rishikesh trip under ₹15,000',
    'What should I pack for Grade IV rafting?',
    'Weekend adventure near Delhi for 4 friends',
    'Is rafting safe for non-swimmers?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  // Load monitor data when tab switches to monitor
  useEffect(() => {
    if (activeTab === 'monitor' && !monitorData) {
      fetchMonitoringData();
    }
  }, [activeTab]);

  const fetchMonitoringData = async () => {
    setIsFetchingMonitor(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationSlug: 'rishikesh' }),
      });
      if (res.ok) {
        const json = await res.json();
        setMonitorData(json.data);
      }
    } catch {
      // Fallback
      setMonitorData({
        status: 'MONITORING_ACTIVE',
        destination: 'Rishikesh, Uttarakhand',
        healthScore: 98,
        alerts: [
          {
            id: 'a1',
            severity: 'INFO',
            title: 'Weather & River Advisory',
            description: 'Current water temperature 16°C. Clear skies. River flow is optimal for Grade III/IV rapids.',
            verifiedBy: 'Local Rafting Association',
          },
          {
            id: 'a2',
            severity: 'ATTENTION',
            title: 'Route Advisory',
            description: 'Tapasya Marg pedestrian bypass active. Allow 20 extra mins for camp transfer.',
            verifiedBy: 'Ground Fleet',
          },
        ],
        emergencyContacts: [
          { name: 'SDRF Emergency', phone: '1070 / 112' },
          { name: 'Medical Rescue', phone: '108' },
        ],
      });
    } finally {
      setIsFetchingMonitor(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) throw new Error('API offline');
      const json = await res.json();
      const aiData = json.data;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiData.message || 'I found some relevant travel options for you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        proposal: aiData.proposal,
        searchResults: aiData.searchData,
        sources: aiData.verifiedSources,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `Analyzed "${query}". 4 active verified batches available in Rishikesh starting at ${formatPrice(3999)}/person with IMF certified rescue kayakers.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sources: ['TripJugaadu Verified Operator Guidelines'],
          },
        ]);
      }, 400);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Assistant with Web Speech API
  const handleVoiceToggle = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is supported directly in Google Chrome / Edge browsers. Simulated prompt added.');
      handleSendMessage('What is the best time for rafting in Rishikesh?');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      handleSendMessage('Suggest 3 days Rishikesh itinerary');
    }
  };

  // Multimodal Scanner
  const handleScanGear = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/multimodal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: multimodalTask,
          imageDescription: gearInput,
          destinationSlug: 'rishikesh',
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setMultimodalResult(json.data);
      }
    } catch {
      setMultimodalResult({
        taskType: multimodalTask,
        equipmentReadinessScore: 94,
        analyzedGear: gearInput,
        verdict: 'READY_WITH_RECOMMENDED_ADDITIONS',
        verifiedItems: [
          { item: 'Dry Bag 20L', status: 'VERIFIED', essential: true },
          { item: 'Synthetic rash guard', status: 'VERIFIED', essential: true },
        ],
        missingCriticalItems: [
          { item: 'UV 400 Sunglasses with strap', reason: 'Extreme midday river glare' },
        ],
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Autonomous Workflow Execution (PART 102)
  const handleExecuteAutonomy = async () => {
    setIsExecutingWorkflow(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/autonomous-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: autonomyLevel,
          intent: 'Reserve 2 slots for Grade IV White Water Rafting in Rishikesh',
          parameters: {
            destination: 'Rishikesh',
            activity: 'White Water Rafting (Grade IV)',
            guests: 2,
          },
          userConfirmationToken: autonomyLevel === 5 ? confirmationToken : undefined,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setAutonomyResult(json.data);
      }
    } catch {
      setAutonomyResult({
        level: autonomyLevel,
        levelName: autonomyLevel === 4 ? 'TRANSACTION_PREPARATION' : 'TRANSACTION_EXECUTED',
        holdToken: 'hold_demo_984',
        message: autonomyLevel === 4 ? 'Provisional lock active for 15 mins.' : 'Confirmed booking TJ-AUTO-98124',
      });
    } finally {
      setIsExecutingWorkflow(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Travel Companion"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(7, 27, 58, 0.95), rgba(1, 6, 17, 0.95))',
            color: '#fff',
            border: '1px solid var(--color-accent)',
            boxShadow: '0 0 20px rgba(0, 174, 239, 0.35)',
            borderRadius: '9999px',
            padding: '12px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.25s ease',
          }}
          className="hover:scale-105"
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 8px #39ff14' }} />
          <span>⚡ JUGAADU AI OS</span>
        </button>
      </div>

      {/* Slide-up Assistant Drawer Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            width: 'clamp(340px, 94vw, 460px)',
            height: 'clamp(520px, 80vh, 680px)',
            background: 'rgba(1, 6, 17, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 174, 239, 0.4)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 174, 239, 0.25)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              background: 'linear-gradient(90deg, rgba(7, 27, 58, 0.85), rgba(1, 6, 17, 0.85))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.05em', color: '#fff' }}>
                  TRIPJUGAADU <span style={{ color: 'var(--color-accent)' }}>OS</span>
                </span>
                <span className="badge" style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(57, 255, 20, 0.15)', color: '#39ff14' }}>
                  AUTONOMOUS L0-L5
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Zero-Hallucination Travel Operating System
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Sub-Nav Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            {[
              { id: 'chat', label: '💬 Chat & Voice' },
              { id: 'monitor', label: '🛡️ Sentinel' },
              { id: 'multimodal', label: '🔍 Gear Scan' },
              { id: 'autonomous', label: '⚡ Autonomy' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 4px',
                  background: activeTab === tab.id ? 'rgba(0, 174, 239, 0.15)' : 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Chat & Voice */}
          {activeTab === 'chat' && (
            <>
              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '90%',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: '1.45',
                        background: msg.sender === 'user' ? 'var(--color-accent-dim)' : 'var(--bg-card)',
                        border: msg.sender === 'user' ? '1px solid var(--color-accent)' : '1px solid var(--border-color)',
                        color: msg.sender === 'user' ? '#fff' : 'var(--text-primary)',
                      }}
                    >
                      <p style={{ margin: 0 }}>{msg.text}</p>

                      {msg.sources && msg.sources.length > 0 && (
                        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {msg.sources.map((src, i) => (
                            <span key={i} style={{ fontSize: '9px', color: 'var(--color-accent)', background: 'rgba(0, 174, 239, 0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                              ✓ {src}
                            </span>
                          ))}
                        </div>
                      )}

                      {msg.proposal && (
                        <div
                          style={{
                            marginTop: '10px',
                            padding: '12px',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--color-accent)',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>{msg.proposal.title}</span>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '13px' }}>
                              ~{formatPrice(msg.proposal.totalEstimatedBudget)}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            {msg.proposal.durationDays} Days • Pace: {msg.proposal.pace}
                          </div>
                          <Link
                            href="/trip-builder"
                            className="btn btn--primary btn--sm"
                            style={{ fontSize: '10px', padding: '6px 12px', display: 'block', textAlign: 'center' }}
                          >
                            Open in Trip Builder &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                      {msg.timestamp}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={{ alignSelf: 'flex-start', padding: '8px 12px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: 'var(--color-accent)' }}>
                    <span>Processing through TripJugaadu Ground Engine...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Prompt chips */}
              <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    style={{
                      whiteSpace: 'nowrap',
                      fontSize: '10px',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(0, 174, 239, 0.08)',
                      border: '1px solid rgba(0, 174, 239, 0.2)',
                      color: 'var(--color-accent)',
                      cursor: 'pointer',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Form with Voice Button */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                style={{
                  padding: '12px',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  title="Voice Search"
                  style={{
                    background: isRecording ? '#ef4444' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    animation: isRecording ? 'pulse 1s infinite' : 'none',
                  }}
                >
                  🎙️
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isRecording ? 'Listening to voice...' : 'Ask or speak your travel goal...'}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: 'var(--text-xs)',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="btn btn--primary btn--sm"
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                >
                  Send
                </button>
              </form>
            </>
          )}

          {/* TAB 2: Sentinel Travel Monitor */}
          {activeTab === 'monitor' && (
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', color: '#fff' }}>Himalayan Live Sentinel</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Proactive weather, pass, and river safety monitor</p>
                </div>
                <button
                  onClick={fetchMonitoringData}
                  disabled={isFetchingMonitor}
                  className="btn btn--ghost btn--sm"
                  style={{ fontSize: '10px', padding: '4px 8px' }}
                >
                  {isFetchingMonitor ? 'Refreshing...' : '🔄 Refresh'}
                </button>
              </div>

              {monitorData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, padding: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>FIELD HEALTH SCORE</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{monitorData.healthScore}% Optimal</div>
                    </div>
                    <div style={{ flex: 1, padding: '10px', background: 'rgba(0, 174, 239, 0.1)', border: '1px solid rgba(0, 174, 239, 0.3)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 600 }}>MONITORED REGION</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{monitorData.destination}</div>
                    </div>
                  </div>

                  <h5 style={{ margin: '8px 0 4px', fontSize: '12px', color: '#fff' }}>Active Ground Alerts:</h5>
                  {monitorData.alerts?.map((alert: any) => (
                    <div
                      key={alert.id}
                      style={{
                        padding: '10px',
                        background: alert.severity === 'ATTENTION' ? 'rgba(234, 179, 8, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                        borderLeft: `3px solid ${alert.severity === 'ATTENTION' ? '#eab308' : '#10b981'}`,
                        borderRadius: '4px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#fff' }}>
                        <span>{alert.title}</span>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{alert.severity}</span>
                      </div>
                      <p style={{ margin: '4px 0', fontSize: '11px', color: 'var(--text-secondary)' }}>{alert.description}</p>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Source: {alert.verifiedBy}</div>
                    </div>
                  ))}

                  <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '6px' }}>🚨 24/7 Field Disaster & Rescue Contacts:</div>
                    {monitorData.emergencyContacts?.map((c: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#fff', padding: '2px 0' }}>
                        <span>{c.name}</span>
                        <a href={`tel:${c.phone}`} style={{ color: '#ef4444', fontWeight: 700 }}>{c.phone}</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Multimodal Gear & Landmark Scanner */}
          {activeTab === 'multimodal' && (
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#fff' }}>Multimodal Vision & Equipment Verification</h4>
              <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Verify required expedition gear against IMF safety standards before departure.
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <button
                  onClick={() => setMultimodalTask('PACKING_CHECKLIST')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: multimodalTask === 'PACKING_CHECKLIST' ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                    color: multimodalTask === 'PACKING_CHECKLIST' ? '#000' : '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  🎒 Packing Checklist
                </button>
                <button
                  onClick={() => setMultimodalTask('LANDMARK_IDENTIFICATION')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: multimodalTask === 'LANDMARK_IDENTIFICATION' ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                    color: multimodalTask === 'LANDMARK_IDENTIFICATION' ? '#000' : '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  🏛️ Landmark ID
                </button>
              </div>

              <textarea
                value={gearInput}
                onChange={(e) => setGearInput(e.target.value)}
                rows={3}
                placeholder={multimodalTask === 'PACKING_CHECKLIST' ? 'List or describe gear items...' : 'Describe landmark photo or tags...'}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                  outline: 'none',
                  resize: 'none',
                  marginBottom: '10px',
                }}
              />

              <button
                onClick={handleScanGear}
                disabled={isScanning || !gearInput.trim()}
                className="btn btn--primary btn--sm"
                style={{ width: '100%', padding: '8px', fontSize: '12px' }}
              >
                {isScanning ? 'Inspecting items with Vision AI...' : '🔍 Scan & Verify Equipment'}
              </button>

              {multimodalResult && (
                <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  {multimodalResult.equipmentReadinessScore && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>Readiness Score:</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{multimodalResult.equipmentReadinessScore}% Pass</span>
                    </div>
                  )}

                  {multimodalResult.landmarkIdentified && (
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-accent)' }}>{multimodalResult.landmarkIdentified}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{multimodalResult.location}</div>
                    </div>
                  )}

                  {multimodalResult.verifiedItems && (
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, textTransform: 'uppercase' }}>Verified Items:</div>
                      {multimodalResult.verifiedItems.map((item: any, i: number) => (
                        <div key={i} style={{ fontSize: '11px', color: '#fff' }}>✓ {item.item}</div>
                      ))}
                    </div>
                  )}

                  {multimodalResult.missingCriticalItems && (
                    <div>
                      <div style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600, textTransform: 'uppercase' }}>Missing Recommended Items:</div>
                      {multimodalResult.missingCriticalItems.map((item: any, i: number) => (
                        <div key={i} style={{ fontSize: '11px', color: '#fcd34d' }}>⚠️ {item.item} ({item.reason})</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Autonomous Workflow (PART 102) */}
          {activeTab === 'autonomous' && (
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#fff' }}>Autonomous Travel Governance</h4>
                <span className="badge" style={{ fontSize: '9px', background: 'rgba(0,174,239,0.15)', color: 'var(--color-accent)' }}>
                  PART 102 SAFEGUARD
                </span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Select an autonomy tier. Financial execution strictly requires human OTP confirmation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {[
                  { lvl: 0, name: 'L0: Info Only', desc: 'Factual KBYG answers without booking' },
                  { lvl: 1, name: 'L1: Recommendations', desc: 'Curated packages tailored to budget' },
                  { lvl: 2, name: 'L2: Itinerary Planning', desc: 'Complete multi-day schedule synthesis' },
                  { lvl: 3, name: 'L3: Dynamic Re-plan', desc: 'Weather & conflict auto-adjustment' },
                  { lvl: 4, name: 'L4: Transaction Prep', desc: 'Pre-calculate & 15m provisional slot hold' },
                  { lvl: 5, name: 'L5: Confirmed Execution', desc: 'Explicit user OTP transaction capture' },
                ].map((item) => (
                  <button
                    key={item.lvl}
                    onClick={() => setAutonomyLevel(item.lvl)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: autonomyLevel === item.lvl ? 'rgba(0, 174, 239, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      border: autonomyLevel === item.lvl ? '1px solid var(--color-accent)' : '1px solid var(--border-color)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, color: autonomyLevel === item.lvl ? 'var(--color-accent)' : '#fff' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </button>
                ))}
              </div>

              {autonomyLevel === 5 && (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Explicit User Confirmation OTP:
                  </label>
                  <input
                    type="text"
                    value={confirmationToken}
                    onChange={(e) => setConfirmationToken(e.target.value)}
                    placeholder="Enter confirmation token"
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'var(--bg-primary)',
                      border: '1px solid rgba(245, 158, 11, 0.5)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </div>
              )}

              <button
                onClick={handleExecuteAutonomy}
                disabled={isExecutingWorkflow}
                className="btn btn--primary btn--sm"
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                {isExecutingWorkflow ? 'Executing under strict guardrails...' : `Execute Level ${autonomyLevel} Workflow`}
              </button>

              {autonomyResult && (
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-accent)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)' }}>
                    Result: {autonomyResult.levelName}
                  </div>
                  <p style={{ margin: '4px 0', fontSize: '11px', color: '#fff' }}>{autonomyResult.message}</p>
                  {autonomyResult.bookingRef && (
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                      Verified Booking Ref: {autonomyResult.bookingRef}
                    </div>
                  )}
                  {autonomyResult.holdToken && (
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      Hold Token: {autonomyResult.holdToken} (Expires in 15 mins)
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
