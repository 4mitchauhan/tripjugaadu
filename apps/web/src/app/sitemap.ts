import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tripjugaadu.com';

  const staticRoutes = [
    '',
    '/explore',
    '/destinations',
    '/adventures',
    '/stays',
    '/experiences',
    '/trip-builder',
    '/search',
    '/login',
    '/provider/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const destinationRoutes = [
    'rishikesh',
    'manali',
    'ladakh',
    'goa',
    'kasol',
    'meghalaya',
  ].map((slug) => ({
    url: `${baseUrl}/destination/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const adventureRoutes = [
    'rishikesh-white-water-rafting',
    'rishikesh-bungee-jump',
    'manali-paragliding',
    'zanskar-chadar-trek',
    'kasol-kheerganga-trek',
    'meghalaya-caving',
  ].map((slug) => ({
    url: `${baseUrl}/adventure/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...destinationRoutes, ...adventureRoutes];
}
