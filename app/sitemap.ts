import type { MetadataRoute } from 'next'
import { plants } from '@/data/plants'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...plants.map((p) => ({
      url: `${siteUrl}/plant/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${siteUrl}${p.image}`],
    })),
    ...plants.map((p) => ({
      url: `${siteUrl}/special/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
