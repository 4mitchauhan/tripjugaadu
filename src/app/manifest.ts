import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TripJugaadu — Indian Travel Ecosystem',
    short_name: 'TripJugaadu',
    description: "Discover India's most incredible destinations, adventures, and experiences with offline expedition intelligence.",
    start_url: '/',
    display: 'standalone',
    background_color: '#010611',
    theme_color: '#00AEEF',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Offline Itinerary',
        url: '/offline',
        description: 'Access cached trail itineraries and safety guides',
      },
      {
        name: 'Trip Builder',
        url: '/trip-builder',
        description: 'Plan custom Indian expeditions',
      },
      {
        name: 'Explore India',
        url: '/explore',
        description: 'Browse curated adventures and stays',
      },
    ],
  };
}
