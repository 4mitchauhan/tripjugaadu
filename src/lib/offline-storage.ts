/**
 * TripJugaadu — Offline Expedition Storage & Emergency Engine
 * Provides local caching and offline capabilities for travelers in low-connectivity Himalayan and remote regions.
 */

export interface OfflineEmergencyContact {
  region: string;
  agency: string;
  number: string;
  purpose: string;
}

export interface OfflineItinerary {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  savedAt: string;
  days: Array<{
    dayNumber: number;
    title: string;
    activities: string[];
    elevationGainMeters?: number;
    waterSourceAvailable?: boolean;
    campsite?: string;
  }>;
  emergencyProtocol: string;
}

export interface OfflineChecklistItem {
  id: string;
  category: 'GEAR' | 'MEDICAL' | 'DOCUMENTS' | 'PERMITS';
  label: string;
  checked: boolean;
}

const STORAGE_KEYS = {
  ITINERARIES: 'tj_offline_itineraries',
  ACTIVE_TRIP: 'tj_offline_active_trip',
  CHECKLIST: 'tj_offline_checklist',
  QUEUED_ACTIONS: 'tj_offline_queued_actions',
};

// Built-in Indian Mountain Emergency Contacts (Verified SDRF & Rescue Units)
export const EMERGENCY_CONTACTS: OfflineEmergencyContact[] = [
  {
    region: 'Pan-India',
    agency: 'National Emergency Helpline',
    number: '112',
    purpose: 'Police, Fire, Ambulance Central Dispatch',
  },
  {
    region: 'Pan-India',
    agency: 'Ministry of Tourism 24x7 Helpline',
    number: '1363',
    purpose: 'Multilingual Tourist Assistance & Emergency',
  },
  {
    region: 'Uttarakhand (Rishikesh / Garhwal)',
    agency: 'State Disaster Response Force (SDRF)',
    number: '1070',
    purpose: 'Flash Flood, Mountain Rescue & River Rapid Emergency',
  },
  {
    region: 'Himachal Pradesh (Manali / Spiti)',
    agency: 'Himachal Mountain Rescue / Disaster Cell',
    number: '1077',
    purpose: 'High Altitude Evacuation & Snow Rescue',
  },
  {
    region: 'Ladakh (Leh / Nubra / Zanskar)',
    agency: 'UT Ladakh Disaster Control Room',
    number: '+91 1982 255555',
    purpose: 'AMS Medical Emergency & Mountain Pass Clearance',
  },
  {
    region: 'Sikkim / North East',
    agency: 'Sikkim State Disaster Management',
    number: '1070',
    purpose: 'High Altitude Trekking & Landslide Rapid Response',
  },
];

// Default High Altitude First-Aid & Mountain Sickness (AMS) Guide
export const AMS_SAFETY_PROTOCOLS = [
  {
    stage: 'Mild AMS (Headache, Nausea, Fatigue)',
    elevation: 'Above 2,500m (8,200 ft)',
    actions: [
      'Stop ascending immediately. Rest for 24-48 hours.',
      'Hydrate with minimum 4-5 liters of water and electrolyte solutions.',
      'Take Acetazolamide (Diamox) 250mg only if pre-prescribed by doctor.',
      'Do not consume alcohol or sleeping sedatives.',
    ],
  },
  {
    stage: 'Severe HAPE / HACE (Breathlessness at rest, Confusion, Loss of balance)',
    elevation: 'Above 3,500m (11,500 ft)',
    actions: [
      'CRITICAL: Immediate descent of at least 500m - 1,000m is life-saving.',
      'Administer supplemental bottled oxygen immediately.',
      'Activate SOS beacon or call local SDRF / Army base at nearest checkpost.',
      'Keep patient warm, seated, and sheltered from freezing wind.',
    ],
  },
];

// Default Expedition Checklist
export const DEFAULT_CHECKLIST: OfflineChecklistItem[] = [
  { id: 'c1', category: 'PERMITS', label: 'Inner Line Permit (ILP) or Protected Area Permit (PAP)', checked: true },
  { id: 'c2', category: 'PERMITS', label: 'Government Photo ID (Aadhaar / Passport) original + copies', checked: true },
  { id: 'c3', category: 'GEAR', label: 'Waterproof trekking boots with ankle support (Broken-in)', checked: false },
  { id: 'c4', category: 'GEAR', label: 'Thermal base layer + Fleece mid-layer + Windproof shell', checked: false },
  { id: 'c5', category: 'GEAR', label: 'Headlamp with spare lithium batteries', checked: false },
  { id: 'c6', category: 'MEDICAL', label: 'AMS kit (Diamox, ORS sachets, Paracetamol, Bandages)', checked: false },
  { id: 'c7', category: 'MEDICAL', label: 'Water purification tablets or UV sterilizer', checked: false },
  { id: 'c8', category: 'DOCUMENTS', label: 'Medical fitness certificate for high-altitude treks', checked: false },
];

export function getOfflineItineraries(): OfflineItinerary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ITINERARIES);
    if (!raw) {
      // Seed default expedition itinerary (Rishikesh to Kedarkantha)
      const seed: OfflineItinerary[] = [
        {
          id: 'exp-kedarkantha',
          title: 'Kedarkantha Winter Summit Expedition',
          destination: 'Sankri, Uttarakhand',
          durationDays: 4,
          savedAt: new Date().toISOString(),
          days: [
            {
              dayNumber: 1,
              title: 'Drive Dehradun to Sankri Basecamp',
              activities: ['210 km scenic drive along Tons River', 'Acclimatization briefing at Sankri (1,950m)', 'Gear inspection & ration check'],
              campsite: 'Sankri Homestay / Base Lodge',
            },
            {
              dayNumber: 2,
              title: 'Trek Sankri to Juda Ka Talab',
              activities: ['4 km ascent through pine & maple forests', 'Reach Juda Ka Talab frozen lake (2,770m)', 'Camp briefing on snow pitching'],
              elevationGainMeters: 820,
              waterSourceAvailable: true,
              campsite: 'Juda Ka Talab Alpine Camp',
            },
            {
              dayNumber: 3,
              title: 'Juda Ka Talab to Kedarkantha Base to Summit',
              activities: ['Early 3:00 AM alpine start for sunrise summit (3,800m)', '360° panoramic view of Swargarohini, Bandarpoonch, Black Peak', 'Descent back to Hargaon campsite'],
              elevationGainMeters: 1030,
              waterSourceAvailable: false,
              campsite: 'Hargaon Camp (2,640m)',
            },
            {
              dayNumber: 4,
              title: 'Hargaon to Sankri & Return',
              activities: ['6 km descent back to Sankri base village', 'Local Garhwali celebratory lunch', 'Departure to Dehradun'],
              elevationGainMeters: -690,
              campsite: 'Dehradun Transit',
            },
          ],
          emergencyProtocol: 'Sankri Forest Checkpost + Purola Community Health Centre (45km down-valley)',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveItineraryOffline(itinerary: OfflineItinerary): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getOfflineItineraries();
    const index = existing.findIndex((i) => i.id === itinerary.id);
    if (index >= 0) {
      existing[index] = itinerary;
    } else {
      existing.unshift(itinerary);
    }
    localStorage.setItem(STORAGE_KEYS.ITINERARIES, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}

export function getOfflineChecklist(): OfflineChecklistItem[] {
  if (typeof window === 'undefined') return DEFAULT_CHECKLIST;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(DEFAULT_CHECKLIST));
      return DEFAULT_CHECKLIST;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CHECKLIST;
  }
}

export function toggleChecklistItem(id: string): OfflineChecklistItem[] {
  if (typeof window === 'undefined') return [];
  const list = getOfflineChecklist();
  const updated = list.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
  localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(updated));
  return updated;
}
