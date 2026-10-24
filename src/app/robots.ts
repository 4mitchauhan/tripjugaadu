import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/', '/confirmation/'],
    },
    sitemap: 'https://tripjugaadu.com/sitemap.xml',
  };
}
