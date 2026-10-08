import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/politicas`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
