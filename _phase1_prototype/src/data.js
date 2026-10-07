/* ============================================================
   TRIPJUGAADU — DATA LAYER
   Placeholder content for all pages
   ============================================================ */

export const DESTINATIONS = [
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

export const ADVENTURES = [
  {
    id: 'rafting',
    name: 'Rafting',
    location: 'Rishikesh',
    difficulty: 'Moderate',
    duration: '3–4 Hours',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    description: 'Navigate thrilling rapids on the sacred Ganges, surrounded by the Himalayan foothills.'
  },
  {
    id: 'trekking',
    name: 'Trekking',
    location: 'Manali',
    difficulty: 'Moderate–Hard',
    duration: '1–5 Days',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    description: 'Trail through alpine meadows, dense forests, and snow-covered passes.'
  },
  {
    id: 'bungee',
    name: 'Bungee',
    location: 'Rishikesh',
    difficulty: 'Extreme',
    duration: '1–2 Hours',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    description: 'Leap from 83 meters above a rocky riverbed — India\'s highest bungee jump.'
  },
  {
    id: 'paragliding',
    name: 'Paragliding',
    location: 'Bir Billing',
    difficulty: 'Easy–Moderate',
    duration: '30–45 Min',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80',
    description: 'Soar above the Dhauladhar range from the paragliding capital of India.'
  },
  {
    id: 'camping',
    name: 'Camping',
    location: 'Kasol',
    difficulty: 'Easy',
    duration: 'Overnight',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
    description: 'Sleep under a canopy of stars in the Parvati Valley.'
  },
  {
    id: 'scuba',
    name: 'Scuba Diving',
    location: 'Goa',
    difficulty: 'Easy–Moderate',
    duration: '2–3 Hours',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    description: 'Discover vibrant coral reefs and marine life off the Goan coast.'
  },
  {
    id: 'zipline',
    name: 'Zipline',
    location: 'Rishikesh',
    difficulty: 'Easy',
    duration: '1 Hour',
    price: '₹X,XXX',
    image: 'https://images.unsplash.com/photo-1530374036894-16864fb63b8e?w=800&q=80',
    description: 'Fly across the river valley on one of the longest ziplines in Asia.'
  }
];

export const STAYS = [
  {
    id: 'riverside-retreat',
    name: 'Riverside Retreat',
    location: 'Rishikesh',
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant'],
    rating: '4.8',
    price: '₹X,XXX/night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    size: 'large'
  },
  {
    id: 'mountain-lodge',
    name: 'Mountain Lodge',
    location: 'Manali',
    amenities: ['Wi-Fi', 'Fireplace', 'Views', 'Dining'],
    rating: '4.6',
    price: '₹X,XXX/night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    size: 'medium'
  },
  {
    id: 'heritage-villa',
    name: 'Heritage Villa',
    location: 'Goa',
    amenities: ['Wi-Fi', 'Pool', 'Beach', 'Bar'],
    rating: '4.7',
    price: '₹X,XXX/night',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    size: 'medium'
  },
  {
    id: 'alpine-camp',
    name: 'Alpine Camp',
    location: 'Kasol',
    amenities: ['Wi-Fi', 'Bonfire', 'Meals', 'Trails'],
    rating: '4.5',
    price: '₹X,XXX/night',
    image: 'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&q=80',
    size: 'small'
  }
];

export const EXPERIENCES = [
  {
    id: 'local-food',
    name: 'Local Food',
    location: 'Varanasi',
    duration: '3–4 Hours',
    description: 'Explore narrow alleyways and savor authentic local street delicacies.',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
    accent: 'warm'
  },
  {
    id: 'culture',
    name: 'Culture',
    location: 'Jaipur',
    duration: 'Half Day',
    description: 'Immerse yourself in rich traditions with exclusive temple visits and performances.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    accent: 'violet'
  },
  {
    id: 'nature',
    name: 'Nature',
    location: 'Munnar',
    duration: 'Full Day',
    description: 'Trek through verdant rainforests and discover hidden natural wonders.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    accent: 'green'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    location: 'Rishikesh',
    duration: '3–7 Days',
    description: 'Rejuvenate your mind, body, and soul with riverside yoga and meditation sessions.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    accent: 'violet'
  },
  {
    id: 'photography',
    name: 'Photography',
    location: 'Leh Ladakh',
    duration: '4–5 Days',
    description: 'Capture breathtaking mountain landscapes under perfect golden hour lighting.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    accent: 'default'
  },
  {
    id: 'local-guides',
    name: 'Local Guides',
    location: 'Across India',
    duration: 'Varies',
    description: 'Gain deeper insights into local life and history with expert local guides.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
    accent: 'warm'
  }
];

export const KBYG_ITEMS = [
  {
    icon: '🎒',
    label: 'What to Carry',
    title: 'Packing Essentials',
    description: 'Check your packing list and prepare everything you need for your journey.'
  },
  {
    icon: '👕',
    label: 'What to Wear',
    title: 'Dress Right',
    description: 'Weather-appropriate attire and clothing recommendations for your destination.'
  },
  {
    icon: '✅',
    label: 'Activity Requirements',
    title: 'Are You Ready?',
    description: 'Understand fitness levels, age limits, and skill requirements for activities.'
  },
  {
    icon: '🧭',
    label: 'Local Knowledge',
    title: 'Know the Place',
    description: 'Cultural tips, local customs, and insider knowledge for a richer experience.'
  },
  {
    icon: 'ℹ️',
    label: 'Important Info',
    title: 'Stay Informed',
    description: 'Safety guidelines, permits, regulations, and critical travel information.'
  },
  {
    icon: '☁️',
    label: 'Conditions',
    title: 'Check Conditions',
    description: 'Weather forecasts, terrain conditions, and seasonal considerations.'
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
        { name: 'Arrival', time: '12:00 PM', duration: '', status: 'confirmed', price: '' },
        { name: 'Hotel Check-in', time: '2:00 PM', duration: '', status: 'confirmed', price: '₹X,XXX' },
        { name: 'Ganga Aarti', time: '6:30 PM', duration: '1.5 hrs', status: 'pending', price: 'Free' }
      ]
    },
    {
      day: 2,
      label: 'Day 02',
      items: [
        { name: 'Rafting', time: '8:00 AM', duration: '3–4 hrs', status: 'confirmed', price: '₹X,XXX' },
        { name: 'Local Exploration', time: '2:00 PM', duration: '3 hrs', status: 'pending', price: '' }
      ]
    },
    {
      day: 3,
      label: 'Day 03',
      items: [
        { name: 'Bungee Jumping', time: '9:00 AM', duration: '1–2 hrs', status: 'confirmed', price: '₹X,XXX' },
        { name: 'Departure', time: '4:00 PM', duration: '', status: 'pending', price: '' }
      ]
    }
  ]
};

export const BOOKING_ITEMS = [
  { name: 'Rafting', detail: '13 Oct, 8:00 AM – 12:00 PM', price: '₹3,999', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=80' },
  { name: 'Hotel Stay', detail: '12–15 Oct, 3 Nights', price: '₹12,500', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80' },
  { name: 'Bungee Jumping', detail: '14 Oct, 9:00 AM', price: '₹5,200', image: 'https://images.unsplash.com/photo-1601024445121-e5b839244335?w=200&q=80' }
];
