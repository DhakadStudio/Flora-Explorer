import { ExploreGrid } from '@/components/home/explore-grid'
import { FeaturedPlants } from '@/components/home/featured-plants'
import { Hero } from '@/components/home/hero'
import { StatsSection } from '@/components/home/stats-section'
import { StoryIntro } from '@/components/home/story-intro'
import { TeamSection } from '@/components/home/team-section'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StoryIntro />
      <FeaturedPlants />
      <StatsSection />
      <ExploreGrid />
      <TeamSection />
    </main>
  )
}
