'use client'

import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/components/providers/language-provider'
import { plants, getPlant } from '@/data/plants'
import { Leaf } from '@/components/Leaf'
import { PlantImage } from '@/components/plant-image'
import { CountUp } from '@/components/count-up'
import { cn } from '@/lib/utils'

export default function ComparePage() {
  const { t, lang } = useLanguage()
  const searchParams = useSearchParams()
  const slugA = searchParams.get('a') ?? 'turmeric'
  const slugB = searchParams.get('b') ?? 'tulsi'
  
  const plantA = getPlant(slugA)
  const plantB = getPlant(slugB)
  
  if (!plantA || !plantB) {
    // Fallback if plants not found
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 font-serif text-5xl font-medium tracking-tight">
            {t('notfound.title')}
          </h2>
          <p className="mb-8 text-pretty text-base leading-relaxed">
            {t('notfound.text')}
          </p>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
            <span className="h-px w-8 bg-leaf" />
            {t('notfound.back')}
          </div>
        </div>
      </section>
    )
  }
  
  const reduce = useReducedMotion()
  
  // Helper to get stats for comparison bars
  const getClimateStats = (plant: typeof plantA) => ({
    tempRange: plant.growth.tempC[1] - plant.growth.tempC[0],
    rainfall: plant.growth.rainfallMm[1],
    sunlightHours: plant.growth.sunlightHours[1],
    altitude: plant.growth.altitudeM[1]
  })
  
  const getCompositionStats = (plant: typeof plantA) => {
    const total = plant.composition.reduce((sum, c) => sum + c.relativeValue, 0)
    return plant.composition.map(c => ({
      ...c,
      normalized: (c.relativeValue / total) * 100
    }))
  }
  
  const getProducerStats = (plant: typeof plantA) => {
    // Get top 5 producers by sharePercent
    const producers = [...plant.geography.topProducers]
      .sort((a, b) => b.sharePercent - a.sharePercent)
      .slice(0, 5)
    return producers
  }
  
  const statsA = getClimateStats(plantA)
  const statsB = getClimateStats(plantB)
  const compA = getCompositionStats(plantA)
  const compB = getCompositionStats(plantB)
  const producersA = getProducerStats(plantA)
  const producersB = getProducerStats(plantB)
  
  // Find max values for normalization
  const maxTempRange = Math.max(statsA.tempRange, statsB.tempRange) || 1
  const maxRainfall = Math.max(statsA.rainfall, statsB.rainfall) || 1
  const maxSunlight = Math.max(statsA.sunlightHours, statsB.sunlightHours) || 1
  const maxAltitude = Math.max(statsA.altitude, statsB.altitude) || 1
  
  return (
    <section className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
            {t('compare.title')}
          </p>
          <h1 className="font-serif text-5xl font-medium tracking-tight md:text-7xl">
            {t('compare.subtitle')}
          </h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Plant A */}
          <div className="col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                {plantA.names[lang]}
              </h2>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/20">
                <Leaf className="h-6 w-6" />
              </span>
            </div>
            <p className="font-mono text-xs italic text-muted-foreground mb-4">
              {plantA.scientificName}
            </p>
            <PlantImage
              src={plantA.image}
              alt={plantA.imageAlt}
              className="rounded-2xl mb-6"
              width={300}
              height={400}
            />
            
            {/* Climate comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.climate')}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col items-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t('climate.temperature')}
                  </p>
                  <motion.div
                    className="w-24 h-24 relative"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: statsA.tempRange / maxTempRange }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 flex items-end justify-center">
                      <div className="w-1/2 bg-leaf" style={{ height: '100%' }} />
                    </div>
                  </motion.div>
                  <p className="mt-2 font-mono text-xs text-center">
                    {statsA.tempRange.toFixed(0)}°C range
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t('climate.rainfall')}
                  </p>
                  <motion.div
                    className="w-24 h-24 relative"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: statsA.rainfall / maxRainfall }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 flex items-start justify-center">
                      <div className="h-1/2 bg-leaf" style={{ width: '100%' }} />
                    </div>
                  </motion.div>
                  <p className="mt-2 font-mono text-xs text-center">
                    {statsA.rainfall.toFixed(0)} mm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Composition comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.composition')}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {compA.map((comp, index) => (
                  <div key={comp.compound} className="flex flex-col items-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {comp.compound.slice(0, 8)}…
                    </p>
                    <motion.div
                      className="w-16 h-16 relative"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: comp.normalized / 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div className="h-1/2 bg-leaf" style={{ width: '100%' }} />
                      </div>
                    </motion.div>
                    <p className="mt-1 font-mono text-xs text-center">
                      {comp.normalized.toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Producers comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.producers')}
              </h3>
              <div className="space-y-2">
                {producersA.map((p, index) => (
                  <div key={p.country} className="flex justify-between text-sm">
                    <span className="font-mono">{p.country}</span>
                    <motion.div
                      className="w-24 h-2 relative"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: p.sharePercent / 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                    >
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div className="h-full bg-leaf" />
                      </div>
                    </motion.div>
                    <span className="font-mono text-xs">{p.sharePercent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* VS divider */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <motion.div
              className="relative w-12 h-12"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Leaf className="absolute inset-0 m-auto" size={24} animate loop speed={0.5} />
            </motion.div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-leaf-foreground">
              VS
            </p>
          </div>
          
          {/* Plant B */}
          <div className="col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                {plantB.names[lang]}
              </h2>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/20">
                <Leaf className="h-6 w-6" />
              </span>
            </div>
            <p className="font-mono text-xs italic text-muted-foreground mb-4">
              {plantB.scientificName}
            </p>
            <PlantImage
              src={plantB.image}
              alt={plantB.imageAlt}
              className="rounded-2xl mb-6"
              width={300}
              height={400}
            />
            
            {/* Climate comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.climate')}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col items-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t('climate.temperature')}
                  </p>
                  <motion.div
                    className="w-24 h-24 relative"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: statsB.tempRange / maxTempRange }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 flex items-end justify-center">
                      <div className="w-1/2 bg-leaf" style={{ height: '100%' }} />
                    </div>
                  </motion.div>
                  <p className="mt-2 font-mono text-xs text-center">
                    {statsB.tempRange.toFixed(0)}°C range
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t('climate.rainfall')}
                  </p>
                  <motion.div
                    className="w-24 h-24 relative"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: statsB.rainfall / maxRainfall }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 flex items-start justify-center">
                      <div className="h-1/2 bg-leaf" style={{ width: '100%' }} />
                    </div>
                  </motion.div>
                  <p className="mt-2 font-mono text-xs text-center">
                    {statsB.rainfall.toFixed(0)} mm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Composition comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.composition')}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {compB.map((comp, index) => (
                  <div key={comp.compound} className="flex flex-col items-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {comp.compound.slice(0, 8)}…
                    </p>
                    <motion.div
                      className="w-16 h-16 relative"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: comp.normalized / 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div className="h-1/2 bg-leaf" style={{ width: '100%' }} />
                      </div>
                    </motion.div>
                    <p className="mt-1 font-mono text-xs text-center">
                      {comp.normalized.toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Producers comparison */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                {t('compare.producers')}
              </h3>
              <div className="space-y-2">
                {producersB.map((p, index) => (
                  <div key={p.country} className="flex justify-between text-sm">
                    <span className="font-mono">{p.country}</span>
                    <motion.div
                      className="w-24 h-2 relative"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: p.sharePercent / 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                    >
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div className="h-full bg-leaf" />
                      </div>
                    </motion.div>
                    <span className="font-mono text-xs">{p.sharePercent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:justify-center">
          <div className="flex flex-col items-center gap-2">
            <label className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
              Plant A
            </label>
            <select
              className="mt-1 w-32 rounded-md border border-border bg-background px-3 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-leaf"
              onChange={(e) => {
                const url = new URL(window.location)
                url.searchParams.set('a', e.target.value)
                window.history.pushState({}, '', url)
              }}
            >
              {plants.map((plant) => (
                <option key={plant.slug} value={plant.slug}>
                  {plant.names[lang]}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <label className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
              Plant B
            </label>
            <select
              className="mt-1 w-32 rounded-md border border-border bg-background px-3 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-leaf"
              onChange={(e) => {
                const url = new URL(window.location)
                url.searchParams.set('b', e.target.value)
                window.history.pushState({}, '', url)
              }}
            >
              {plants.map((plant) => (
                <option key={plant.slug} value={plant.slug}>
                  {plant.names[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}