/* ============================================================
   TRIPJUGAADU — DATA LAYER
   Authoritative mock and seed data matching Phase 1 & Phase 2 specs
   ============================================================ */

export interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  days: string;
  image: string;
  description: string;
  size?: 'featured' | 'wide' | 'medium' | 'small';
}

export interface Adventure {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Easy–Moderate' | 'Moderate' | 'Moderate–Hard' | 'Extreme';
  duration: string;
  price: string;
  image: string;
  description: string;
}

export interface Stay {
  id: string;
  name: string;
  location: string;
  amenities: string[];
  rating: string;
  price: string;
  image: string;
  size?: 'large' | 'medium' | 'small';
}

export interface Experience {
  id: string;
  name: string;
  location: string;
  duration: string;
  description: string;
  image: string;
  accent?: 'warm' | 'violet' | 'green' | 'default';
}

export interface KbygItem {
  icon: string;
  label: string;
  title: string;
  description: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    region: 'Uttarakhand',
    category: 'Adventure / Spiritual',
    days: '03 Days',
    image: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&q=80',
    description: 'The adventure capital of India, nestled in the foothills of the Himalayas along the sacred Ganges.',
    size: 'featured'
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh',
    category: 'Adventure / Nature',
    days: '04 Days',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    description: 'A valley of dreams surrounded by snow-capped peaks, pine forests, and rushing rivers.',
    size: 'medium'
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    region: 'Jammu & Kashmir',
    category: 'Adventure / Nature',
    days: '07 Days',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    description: 'The land of high passes — raw, remote, and breathtaking beyond words.',
    size: 'wide'
  },
  {
    id: 'goa',
    name: 'Goa',
    region: 'Western India',
    category: 'Beach / Culture',
    days: '04 Days',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    description: 'Golden beaches, Portuguese heritage, and sunsets that linger in memory.',
    size: 'medium'
  },
  {
    id: 'kasol',
    name: 'Kasol',
    region: 'Himachal Pradesh',
    category: 'Trekking / Nature',
    days: '03 Days',
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80',
    description: 'A hidden gem in the Parvati Valley — trails, tranquility, and mountain magic.',
    size: 'small'
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    region: 'Uttarakhand',
    category: 'Nature / Heritage',
    days: '03 Days',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    description: 'The Queen of Hills — misty mornings, colonial charm, and panoramic valley views.',
    size: 'small'
  }
];

export const ADVENTURES: Adventure[] = [
  {
    id: 'rafting',
    name: 'White Water Rafting',
    location: 'Rishikesh',
    difficulty: 'Moderate',
    duration: '3–4 Hours',
    price: '₹3,999',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    description: 'Navigate thrilling Grade III & IV rapids on the sacred Ganges, surrounded by the towering Himalayan foothills.'
  },
  {
    id: 'trekking',
    name: 'Hampta Pass Trekking',
    location: 'Manali',
    difficulty: 'Moderate–Hard',
    duration: '1–5 Days',
    price: '₹8,499',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    description: 'Trail through dramatic alpine meadows, pine forests, and high-altitude desert passes in Himachal.'
  },
  {
    id: 'bungee',
    name: 'Bungee Jumping (83m)',
    location: 'Rishikesh',
    difficulty: 'Extreme',
    duration: '1–2 Hours',
    price: '₹5,200',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    description: 'Leap from 83 meters above a rocky riverbed — India’s highest fixed-platform bungee jump.'
  },
  {
    id: 'paragliding',
    name: 'Tandem Paragliding',
    location: 'Bir Billing',
    difficulty: 'Easy–Moderate',
    duration: '30–45 Min',
    price: '₹3,200',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80',
    description: 'Soar above the Dhauladhar range from Bir Billing — the paragliding capital of India.'
  },
  {
    id: 'camping',
    name: 'Parvati Riverside Camping',
    location: 'Kasol',
    difficulty: 'Easy',
    duration: 'Overnight',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
    description: 'Sleep under a canopy of stars next to the whispering Parvati river with bonfire & local meals.'
  },
  {
    id: 'scuba',
    name: 'Scuba Diving at Grande Island',
    location: 'Goa',
    difficulty: 'Easy–Moderate',
    duration: '2–3 Hours',
    price: '₹4,500',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    description: 'Discover vibrant coral reefs, shipwrecks, and exotic marine life off the Arabian Sea.'
  },
  {
    id: 'zipline',
    name: 'Over-The-River Zipline',
    location: 'Rishikesh',
    difficulty: 'Easy',
    duration: '1 Hour',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1530374036894-16864fb63b8e?w=800&q=80',
    description: 'Fly across the river valley at 60 km/h on one of the longest and highest ziplines in Asia.'
  }
];

export const STAYS: Stay[] = [
  {
    id: 'riverside-retreat',
    name: 'Riverside Luxury Retreat',
    location: 'Rishikesh',
    amenities: ['Wi-Fi', 'Pool', 'Ayurvedic Spa', 'Riverside Dining'],
    rating: '4.8',
    price: '₹6,499/night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    size: 'large'
  },
  {
    id: 'mountain-lodge',
    name: 'Snow Pine Mountain Lodge',
    location: 'Manali',
    amenities: ['Wi-Fi', 'Fireplace', 'Himalayan Views', 'Barbeque'],
    rating: '4.6',
    price: '₹4,999/night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    size: 'medium'
  },
  {
    id: 'heritage-villa',
    name: 'Portuguese Heritage Villa',
    location: 'Goa',
    amenities: ['Private Pool', 'Beach Access', 'Garden Bar', 'Chef on Call'],
    rating: '4.7',
    price: '₹9,200/night',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    size: 'medium'
  },
  {
    id: 'alpine-camp',
    name: 'Kasol Alpine Eco Camp',
    location: 'Kasol',
    amenities: ['Solar Power', 'Bonfire', 'Organic Meals', 'Trek Guides'],
    rating: '4.5',
    price: '₹2,800/night',
    image: 'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&q=80',
    size: 'small'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'local-food',
    name: 'Varanasi Street Food & Chaat Crawl',
    location: 'Varanasi',
    duration: '3–4 Hours',
    description: 'Explore narrow alleyways and savor authentic kachori-sabzi, malaiyo, and legendary Banarasi paan.',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
    accent: 'warm'
  },
  {
    id: 'culture',
    name: 'Royal Heritage & Crafts Walk',
    location: 'Jaipur',
    duration: 'Half Day',
    description: 'Immerse yourself in royal traditions with private haveli access, block printing artisans, and folk musicians.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    accent: 'violet'
  },
  {
    id: 'nature',
    name: 'Munnar Tea Plantation Trek & Tasting',
    location: 'Munnar',
    duration: 'Full Day',
    description: 'Trek through emerald tea hills, discover spice orchards, and taste single-estate artisanal teas.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    accent: 'green'
  },
  {
    id: 'wellness',
    name: 'Riverside Yoga & Sound Healing',
    location: 'Rishikesh',
    duration: '3–7 Days',
    description: 'Rejuvenate mind, body, and soul with sunrise Ganga meditation and Tibetan singing bowl sessions.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    accent: 'violet'
  },
  {
    id: 'photography',
    name: 'High-Altitude Astrophotography',
    location: 'Leh Ladakh',
    duration: '4–5 Days',
    description: 'Capture the Milky Way arches over Pangong Tso and ancient Tibetan monasteries with expert astrophotographers.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    accent: 'default'
  },
  {
    id: 'local-guides',
    name: 'Tribal Village & Folk Lore Exploration',
    location: 'Across India',
    duration: 'Varies',
    description: 'Gain unfiltered insights into indigenous cultures, local culinary arts, and oral folklore with certified local guides.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
    accent: 'warm'
  }
];

export const KBYG_ITEMS: KbygItem[] = [
  {
    icon: 'backpack',
    label: 'What to Carry',
    title: 'Packing Essentials',
    description: 'Check your customized packing list including waterproof cases, powerbanks, and thermal gear.'
  },
  {
    icon: 'shirt',
    label: 'What to Wear',
    title: 'Dress Right',
    description: 'Weather-appropriate quick-dry activewear, sturdy trail footwear, and modest attire for temples.'
  },
  {
    icon: 'check-circle',
    label: 'Activity Requirements',
    title: 'Are You Ready?',
    description: 'Understand required fitness tiers, minimum age requirements, and medical restrictions.'
  },
  {
    icon: 'compass',
    label: 'Local Knowledge',
    title: 'Know the Place',
    description: 'Cultural etiquette, respectful photography tips, and local insider customs for a seamless trip.'
  },
  {
    icon: 'info',
    label: 'Important Info',
    title: 'Stay Informed',
    description: 'Inner line permits, safety certifications, emergency medical centers, and transport connectivity.'
  },
  {
    icon: 'cloud-sun',
    label: 'Conditions',
    title: 'Check Conditions',
    description: 'Real-time weather outlook, road transit advisories, river water levels, and seasonal visibility.'
  }
];

export const ITINERARY = {
  destination: 'Rishikesh',
  days: '03 Days',
  nights: '02 Nights',
  schedule: [
    {
      day: 1,
      label: 'Day 01',
      items: [
        { name: 'Arrival in Rishikesh & Check-in', time: '12:00 PM', duration: '1 hr', status: 'confirmed', price: '₹6,499' },
        { name: 'Relaxation at Riverside Cafe', time: '2:00 PM', duration: '2 hrs', status: 'confirmed', price: '₹800' },
        { name: 'Parmarth Niketan Ganga Aarti', time: '6:00 PM', duration: '1.5 hrs', status: 'pending', price: 'Free' }
      ]
    },
    {
      day: 2,
      label: 'Day 02',
      items: [
        { name: 'White Water Rafting (Shivpuri to NIM Beach)', time: '8:00 AM', duration: '3–4 hrs', status: 'confirmed', price: '₹3,999' },
        { name: 'Lunch & Beatles Ashram Exploration', time: '1:30 PM', duration: '2.5 hrs', status: 'pending', price: '₹600' },
        { name: 'Sunset Over-The-River Zipline', time: '5:00 PM', duration: '1 hr', status: 'confirmed', price: '₹1,999' }
      ]
    },
    {
      day: 3,
      label: 'Day 03',
      items: [
        { name: 'Mohanchatti Bungee Jumping (83m)', time: '9:00 AM', duration: '2 hrs', status: 'confirmed', price: '₹5,200' },
        { name: 'Local Handicrafts Souvenir Shopping', time: '1:00 PM', duration: '2 hrs', status: 'pending', price: 'Self' },
        { name: 'Departure to Dehradun Airport', time: '4:30 PM', duration: '1.5 hrs', status: 'pending', price: '₹1,200' }
      ]
    }
  ]
};

export const BOOKING_ITEMS = [
  { name: 'White Water Rafting (Grade III/IV)', detail: '13 Oct, 8:00 AM – 12:00 PM · 2 Adults', price: '₹3,999', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=80' },
  { name: 'Riverside Luxury Retreat', detail: '12–15 Oct, 3 Nights · Deluxe Room', price: '₹19,497', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80' },
  { name: 'Mohanchatti Bungee Jump (83m)', detail: '14 Oct, 9:00 AM · 2 Jumpers', price: '₹10,400', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=200&q=80' }
];
