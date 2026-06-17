import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://onyxdetails.co.za';
const routes = ['', '/services', '/gallery', '/about', '/contact', '/privacy-policy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7
  }));
}
