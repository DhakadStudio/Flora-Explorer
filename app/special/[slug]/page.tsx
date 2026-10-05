import { generateMetadata } from '@/lib/site'
import { notFound } from 'next/navigation'
import { plants, getPlant } from '@/data/plants'

export function generateStaticParams() {
  return plants.map((plant) => ({
    slug: plant.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const plant = getPlant(params.slug)
  if (!plant) {
    return notFound()
  }
  
  return generateMetadata({
    params: { slug: plant.slug },
  })
}