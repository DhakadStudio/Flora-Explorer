/** Canonical origin for metadata, OpenGraph and the sitemap. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

/** Generate page metadata for plant detail pages */
export function generateMetadata({ params }: { params: { slug: string } }) {
  // This will be called at build time via generateStaticParams
  // We need to import getPlant here to avoid circular dependencies
  return {
    title: 'Flora Explorer',
    description: 'A botanical field guide to useful plants',
  }
}

/** Generate metadata for a specific plant (used in page.tsx) */
export function generatePlantMetadata(plant: { 
  name: string; 
  scientificName: string; 
  summary: string; 
  image: string; 
  slug: string 
}) {
  return {
    title: `${plant.name} (${plant.scientificName}) — Flora Explorer`,
    description: plant.summary,
    openGraph: {
      title: `${plant.name} (${plant.scientificName})`,
      description: plant.summary,
      images: [{ url: plant.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${plant.name} (${plant.scientificName})`,
      description: plant.summary,
      images: [plant.image],
    },
  }
}