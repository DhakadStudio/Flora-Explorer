"use client";
import { generateMetadata } from '@/lib/site'
import { notFound } from 'next/navigation'
import { plants, getPlant, getAdjacentPlants } from '@/data/plants'
import { Globe } from '@/components/Globe'
import { Leaf } from '@/components/Leaf'
import { PlantImage } from '@/components/plant-image'
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useTransform, useScroll, useMotionValue, useSpring } from 'framer-motion'
import { CountUp } from '@/components/count-up'
import { cn } from '@/lib/utils'


export function generateMetadata({ params }: { params: { slug: string } }) {
  const plant = getPlant(params.slug)
  if (!plant) {
    return notFound()
  }
  
  return {
    title: `${plant.name} — Flora Explorer`,
    description: `${plant.description || "Learn about this useful plant."}`,
    openGraph: {
      title: plant.name,
      description: plant.description || "Learn about this useful plant.",
      url: `http://localhost:3000/plant/${plant.slug}`,
      images: [`http://localhost:3000/${plant.image}`],
    },
    twitter: {
      card: `summary_large_image`,
      title: plant.name,
      description: plant.description || `Learn about this useful plant.`,
      images: [`http://localhost:3000/${plant.image}`],
    }
  }
}
export default function PlantPage() {
  const { t, lang, p } = useLanguage()
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const plant = getPlant(params.slug)
  
  if (!plant) {
    // This should not happen due to generateStaticParams, but just in case
    return null
  }
  
  const { prev, next } = getAdjacentPlants(plant.slug)
  const reduce = useReducedMotion()
  
  // Share functionality
  const [shared, setShared] = useState(false)
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${plant.names[lang]} - Flora Explorer`,
          text: `Explore ${plant.names[lang]} on Flora Explorer - a botanical field guide to useful plants.`,
          url: window.location.href
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
      }
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch (err) {
      console.error('Share failed', err)
    }
  }
  
  // Scroll-based animations
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ 
    target: heroRef, 
    offset: ['start start', 'end end'] 
  })
  
  // Climate dials values
  const tempProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const rainfallProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const phProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const sunlightProgress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const waterProgress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  
  // Climate dial springs
  const tempSpring = useSpring(tempProgress, { stiffness: 180, damping: 18 })
  const rainfallSpring = useSpring(rainfallProgress, { stiffness: 180, damping: 18 })
  const phSpring = useSpring(phProgress, { stiffness: 180, damping: 18 })
  const sunlightSpring = useSpring(sunlightProgress, { stiffness: 180, damping: 18 })
  const waterSpring = useSpring(waterProgress, { stiffness: 180, damping: 18 })
  
   // Motion values for transforms
   const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "35%"])
   const leafY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"])
   const lowerLeafY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-60%"])
   const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"])
   const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
   
   // Spring-based rotations and scales
   const tempRotation = useTransform(tempSpring, [0, 1], [0, 360])
   const tempScale = useTransform(tempSpring, [0, 1], [0, 1])
   const rainfallRotation = useTransform(rainfallSpring, [0, 1], [0, 360])
   const rainfallScale = useTransform(rainfallSpring, [0, 1], [0, 1])
   const phRotation = useTransform(phSpring, [0, 1], [0, 360])
   const phScale = useTransform(phSpring, [0, 1], [0, 1])
   const sunlightRotation = useTransform(sunlightSpring, [0, 1], [0, 360])
   const sunlightScale = useTransform(sunlightSpring, [0, 1], [0, 1])
   const waterRotation = useTransform(waterSpring, [0, 1], [0, 360])
   const waterScale = useTransform(waterSpring, [0, 1], [0, 1])
   const vineDashOffset = useTransform(scrollYProgress, [0, 1], ["40", "0"])
  // Composition bubble chart data
  const compositionData = plant.composition.map((item, index) => ({
    id: index,
    compound: item.compound,
    value: item.relativeValue,
    partUsed: item.partUsed,
    benefit: item.benefit,
    // Position in a circle
    angle: (index / plant.composition.length) * Math.PI * 2,
    radius: 120 + Math.sin(index) * 30 // Vary radius for organic feel
  }))
  
  // Seasonality wheel data
  const getMonthName = (month: number): string => {
    const months = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      hi: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
    return months[lang as keyof typeof months][month - 1] || ''
  }
  
  // Check if current month is in seasonality arrays
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const isSowing = plant.seasonality.sowing.includes(currentMonth)
  const isFlowering = plant.seasonality.flowering.includes(currentMonth)
  const isHarvesting = plant.seasonality.harvest.includes(currentMonth)
  
  // Parts used tabs
  const [activePart, setActivePart] = useState<string | null>(plant.partsUsed.length > 0 ? plant.partsUsed[0].part : null)
  
  // Related plants
  const relatedPlants = plant.related.map(slug => getPlant(slug)).filter(Boolean)
  
  return (
    <>
      {/* Page transition wrapper */}
      <div className="relative isolate">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          id="hero"
          className="relative -mt-16 flex min-h-svh flex-col overflow-hidden pt-16"
        >
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
          
          {/* Parallax layers */}
          <motion.div 
            aria-hidden 
            style={{ y: parallaxY }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <PlantImage
              src={plant.image}
              alt={plant.imageAlt}
              className="h-[120vmin] w-[120vmin] max-w-none rotate-[-18deg] opacity-70 md:h-[95vmin] md:w-[95vmin]"
              width={800}
              height={800}
            />
            style={{ y: leafY }}
            className="pointer-events-none absolute right-[6%] top-[18%]"
          >
            <Leaf 
              animate 
              speed={1.2} 
              strokeWidth={2} 
              className="h-20 w-20 rotate-[28deg] text-leaf/50 md:h-28 md:w-28" 
            />
          </motion.div>
          
          <motion.div 
            aria-hidden 
            style={{ y: lowerLeafY }}
            className="pointer-events-none absolute bottom-[22%] left-[5%]"
          >
            <Leaf 
              filled 
              className="h-10 w-10 -rotate-45 text-leaf/40 md:h-14 md:w-14" 
            />
          </motion.div>
          
          {/* Content */}
          <motion.div
            style={{ 
              y: contentY,
              opacity: contentOpacity
            }}
            className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-16 md:px-10"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="h-px w-8 bg-leaf" />
              {t('hero.eyebrow')}
            </motion.p>
            
            {/* Title */}
            <h1
              className="text-balance font-serif text-[clamp(3.25rem,12vw,11rem)] font-medium leading-[0.92] tracking-[-0.035em] mb-10"
            >
              <span className="sr-only">
                {plant.names.en} {plant.scientificName}
              </span>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="inline-block whitespace-nowrap overflow-hidden pb-[0.08em] align-bottom"
              >
                {plant.names[lang]}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="block italic text-leaf-ink"
              >
                {plant.scientificName}
              </motion.p>
            </h1>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/20">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/20">
                {t(`cat.${plant.category}`)}
              </span>
              {plant.geography.topProducers.length > 0 && (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/20">
                    {t('globe.major')}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/20">
                    {plant.geography.topProducers[0].country}
                  </span>
                </>
              )}
            </div>
            
            {/* Language switcher */}
            <div className="mb-12 flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
                {t('header.language')}
              </span>
              <div className="flex space-x-1">
                {['en', 'hi', 'es'].map((langCode) => (
                  <button
                    key={langCode}
                    lang={langCode}
                    aria-label={langCode === 'en' ? 'English' : langCode === 'hi' ? 'हिन्दी' : 'Español'}
                    className={cn(
                      'w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted/50',
                      lang === langCode ? 'bg-leaf text-leaf-foreground' : 'text-foreground hover:text-leaf'
                    ) }
                    onClick={() => {
                      // In a real app, this would update language preference
                      // For demo, we'll just show an alert
                      alert(`Language switching to ${langCode} would be implemented with a language provider`)
                    }}
                  >
                    {langCode === 'en' ? 'EN' : langCode === 'hi' ? 'हि' : 'ES'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Scroll cue */}
          <a
            href="#overview"
            className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            {t('hero.scroll')}
            <span className="relative h-10 w-px overflow-hidden bg-border">
              <span className="animate-scroll-cue absolute inset-0 bg-leaf" />
            </span>
            <ArrowDown className="sr-only" aria-hidden />
          </a>
        </section>
        
        {/* Sticky mini-header showing vine that grows with scroll progress */}
        <div className="sticky top-0 z-20 mb-16">
          <div className="flex h-12 items-center justify-center px-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0">
                {/* Vine that grows with scroll progress */}
                <motion.path
                  d="M10 20 Q15 5 20 20 T30 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  style={{ 
                    strokeDasharray: '40',
                    strokeDashoffset: vineDashOffset
                  }}
                  className="transition-all"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="h-8 w-8" />
              </div>
            </div>
            <h2 className="ml-4 font-serif text-2xl font-medium tracking-tight">
              {plant.names[lang]}
            </h2>
          </div>
        </div>
        
        {/* Section Navigation */}
        <nav className="sticky top-16 z-10 mb-12">
          {/* Mobile: pills */}
          <div className="hidden md:flex">
            <div className="flex space-x-4">
              <a href="#overview" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Overview</a>
              <a href="#appearance" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Appearance</a>
              <a href="#habitat" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Habitat</a>
              <a href="#parts" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Parts Used</a>
              <a href="#uses" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Uses</a>
              <a href="#history" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">History</a>
              <a href="#facts" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Facts</a>
              <a href="#related" className="px-3 py-1.5 rounded-md text-sm font-mono hover:bg-muted/50">Related</a>
            </div>
          </div>
          
          {/* Desktop: vertical tabs */}
          <div className="flex flex-col items-start gap-2">
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.overview')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.appearance')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.habitat')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.parts')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.uses')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.history')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.facts')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-leaf/50" />
                <span className="font-mono text-xs">{t('sec.related')}</span>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="mb-24">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.overview')}
              </h2>
              
              <div className="space-y-8">
                <p className="text-pretty text-base leading-relaxed">
                  {plant.description}
                </p>
                
                {/* Climate Dials */}
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center">
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('climate.temperature')}
                    </h3>
                    <div className="relative w-24 h-24">
                      <motion.div
                        style={{ 
                          rotate: tempRotation
                        }}
                        className="absolute inset-0"
                      >
                        <Leaf 
                          className="h-4 w-4 -rotate-45" 
                          strokeWidth={0.5} 
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-end justify-center">
                        <div 
                          className="w-1/2 bg-leaf" 
                          style={{ 
                            height: '100%',
                            transformOrigin: 'bottom',
                            scaleY: tempScale
                          }} 
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                      {plant.growth.tempC[0]}°–{plant.growth.tempC[1]}°C
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('climate.rainfall')}
                    </h3>
                    <div className="relative w-24 h-24">
                      <motion.div
                        style={{ 
                          rotate: rainfallRotation
                        }}
                        className="absolute inset-0"
                      >
                        <Leaf 
                          className="h-4 w-4" 
                          strokeWidth={0.5} 
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div 
                          className="h-1/2 bg-leaf" 
                          style={{ 
                            width: '100%',
                            transformOrigin: 'left',
                            scaleX: rainfallScale
                          }} 
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                      {plant.growth.rainfallMm[0]}–{plant.growth.rainfallMm[1]} mm/year
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('climate.ph')}
                    </h3>
                    <div className="relative w-24 h-24">
                      <motion.div
                        style={{ 
                          rotate: phRotation
                        }}
                        className="absolute inset-0"
                      >
                        <Leaf 
                          className="h-4 w-4 -rotate-45" 
                          strokeWidth={0.5} 
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-end justify-center">
                        <div 
                          className="w-1/2 bg-leaf" 
                          style={{ 
                            height: '100%',
                            transformOrigin: 'bottom',
                            scaleY: phScale
                          }} 
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                      pH {plant.growth.soilPh[0]}–{plant.growth.soilPh[1]}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('climate.sunlight')}
                    </h3>
                    <div className="relative w-24 h-24">
                      <motion.div
                        style={{ 
                          rotate: sunlightRotation
                        }}
                        className="absolute inset-0"
                      >
                        <Leaf 
                          className="h-4 w-4" 
                          strokeWidth={0.5} 
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-start justify-center">
                        <div 
                          className="h-1/2 bg-leaf" 
                          style={{ 
                            width: '100%',
                            transformOrigin: 'left',
                            scaleX: sunlightScale
                          }} 
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                      {plant.growth.sunlightHours[0]}–{plant.growth.sunlightHours[1]} h/day
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('climate.water')}
                    </h3>
                    <div className="relative w-24 h-24">
                      <motion.div
                        style={{ 
                          rotate: waterRotation
                        }}
                        className="absolute inset-0"
                      >
                        <Leaf 
                          className="h-4 w-4" 
                          strokeWidth={0.5} 
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-end justify-center">
                        <div 
                          className="w-1/2 bg-leaf" 
                          style={{ 
                            height: '100%',
                            transformOrigin: 'bottom',
                            scaleY: waterScale
                          }} 
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                      {t(`water.${plant.growth.waterNeed}`)}
                    </p>
                  </div>
                </div>
                
                {/* Ideal conditions summary */}
                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <p className="text-pretty text-base leading-relaxed">
                    {t('climate.ideal')}
                  </p>
                  <p className="mt-2 font-mono text-sm text-muted-foreground">
                    {t('climate.summary', {
                      tmin: plant.growth.tempC[0],
                      tmax: plant.growth.tempC[1],
                      rmin: plant.growth.rainfallMm[0],
                      rmax: plant.growth.rainfallMm[1],
                      pmin: plant.growth.soilPh[0],
                      pmax: plant.growth.soilPh[1],
                    })}
                      sun: plant.growth.sunlightHours[0] + '-' + plant.growth.sunlightHours[1],
                      water: t('water.' + plant.growth.waterNeed)
                  </p>
                </div>
                    })}
            </div>
          </section>
          
          {/* Globe Section */}
          <section id="globe" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.globe')}
              </h2>
              
              <div className="space-y-6">
                <div className="mb-8">
                  <Globe plant={plant} className="w-full" />
                </div>
                
                {/* Legend and stats */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('globe.legend')}
                    </h3>
                    <div className="flex flex-col gap-2 text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span>{t('globe.native')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600/90" />
                        <span>{t('globe.major')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <span>{t('globe.cultivated')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400/30" />
                        <span>{t('globe.na')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                      {t('globe.top')}
                    </h3>
                    <div className="space-y-2">
                      {plant.geography.topProducers.map((producer, index) => (
                        <div key={producer.country} className="flex justify-between">
                          <span className="font-mono">{producer.country}</span>
                          <motion.div
                            className="w-20 h-2 relative"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: producer.sharePercent / 100 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                          >
                            <div className="absolute inset-0 flex items-start justify-center">
                              <div className="h-full bg-leaf" />
                            </div>
                          </motion.div>
                          <span className="font-mono text-xs">{producer.sharePercent}%</span>
                        </div>
                    )) }
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-serif text-lg font-medium mb-2">
                        {t('globe.origin')}
                      </h4>
                      <p className="font-mono text-sm">{plant.geography.nativeRegion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Appearance Section */}
          <section id="appearance" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.appearance')}
              </h2>
              
              <div className="space-y-6">
                <p className="text-pretty text-base leading-relaxed">
                  {plant.appearance}
                </p>
                
                {/* Additional images would go here in a full implementation */}
                <div className="mt-8">
                  <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                    Botanical Illustration
                  </h3>
                  <div className="aspect-[3/4] w-full bg-muted/50 rounded-xl flex items-center justify-center">
                    <Leaf className="h-24 w-24 text-leaf/50" />
                    <p className="text-center text-sm text-muted-foreground">
                      Detailed botanical illustration would be shown here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Habitat Section */}
          <section id="habitat" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.habitat')}
              </h2>
              
              <div className="space-y-6">
                <p className="text-pretty text-base leading-relaxed">
                  {plant.habitat}
                </p>
                
                {/* Habitat map would go here */}
                <div className="mt-8">
                  <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                    Natural Habitat
                  </h3>
                  <div className="aspect-[16/9] w-full bg-muted/50 rounded-xl flex items-center justify-center">
                    <Leaf className="h-24 w-24 text-leaf/50" />
                    <p className="text-center text-sm text-muted-foreground">
                      Habitat range map would be shown here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Parts Used Section */}
          <section id="parts" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.parts')}
              </h2>
              
              {plant.partsUsed.length > 0 ? (
                <>
                  {/* Tabs for parts used */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {plant.partsUsed.map((part) => (
                      <button
                        key={part.part}
                        className={cn(
                          'px-4 py-2 rounded-md border border-border text-sm font-mono hover:bg-muted/50',
                          activePart === part.part ? 'bg-leaf text-leaf-foreground' : 'text-foreground hover:text-leaf'
                         )}
                      onClick={() => setActivePart(part.part)}
                      >
                        {part.part}
                       </button>
                    ))}
                  </div>
                  
                  {/* Parts content */}
                  <div className="space-y-6">
                    {activePart && (
                      <>
                        <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                          {activePart}
                        </h3>
                        <p className="text-pretty text-base leading-relaxed mb-4">
                          {plant.partsUsed.find(p => p.part === activePart)?.uses.join(', ') || 'No specific uses documented'}
                        </p>
                        
                        {/* Visual representation of the part */}
                        <div className="mt-6">
                          <div className="aspect-[1/1] w-full bg-muted/50 rounded-xl flex items-center justify-center">
                            <Leaf 
                              className="h-20 w-20" 
                              style={{ 
                                transform: 'rotate(45deg)', 
                                opacity: 0.7 
                              }} 
                            />
                            <p className="text-center text-sm text-muted-foreground">
                              {activePart} visualization
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-pretty text-base leading-relaxed">
                  No specific parts used documented for this plant.
                </p>
              )}
            </div>
          </section>
          
          {/* Uses Section */}
          <section id="uses" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.uses')}
              </h2>
              
              {/* Use category chips */}
              <div className="mb-8 flex flex-wrap gap-2">
                {[ 'culinary', 'medicinal', 'cultural', 'industrial', 'ecological' ].map((category) => {
                  const uses = plant.uses[category as keyof typeof plant.uses] || []
                  return (
                    <button
                      key={category}
                      className={cn(
                        'px-4 py-2 rounded-md border border-border text-sm font-mono hover:bg-muted/50',
                        uses.length > 0 ? 'bg-leaf text-leaf-foreground' : 'text-foreground hover:text-leaf'
                     ) }
                    >
                       {t('uses.' + category)} ({uses.length})
                    </button>
                  )
                })}
              </div>
              
              {/* Uses content */}
              <div className="space-y-6">
                {[ 'culinary', 'medicinal', 'cultural', 'industrial', 'ecological' ].map((category) => {
                  const uses = plant.uses[category as keyof typeof plant.uses] || []
                  if (uses.length === 0) return null
                  
                  return (
                    <div key={category} className="mb-8">
                      <h3 className="font-serif text-2xl font-medium tracking-tight mb-4">
                        {t(`uses.${category}`)}
                      </h3>
                      <div className="space-y-3">
                        {uses.map((use, index) => (
                          <p key={index} className="text-pretty text-base leading-relaxed">
                            • {use[lang] ?? use.en}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                }).filter(Boolean)}
              </div>
            </div>
          </section>
          
          {/* History Section */}
          <section id="history" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.history')}
              </h2>
              
               <div>
                 <p>Test history section</p>
               </div>
            </div>
          </section>
          
          {/* Facts Section */}
          <section id="facts" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.facts')}
              </h2>
              
              {plant.facts.length > 0 ? (
                <motion.ul
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  initial={false}
                  animate={true}
                >
                  {plant.facts.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                    >
                      <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
                        <div className="flex items-start gap-3">
                          <Leaf className="h-5 w-5 flex-shrink-0" />
                          <p className="text-pretty text-base leading-relaxed">{fact}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-pretty text-base leading-relaxed">
                  No interesting facts documented for this plant.
                </p>
              )}
            </div>
          </section>
          
          {/* Composition Section */}
          <section id="composition" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.composition')}
              </h2>
              
              {plant.composition.length > 0 ? (
                <>
                  {/* Interactive bubble chart */}
                  <div className="mt-8 aspect-[1/1] w-full">
                    <svg 
                      className="w-full h-full" 
                      viewBox="0 0 240 240"
                    >
                      {/* Center point */}
                      <circle 
                        cx="120" 
                        cy="120" 
                        r="8" 
                        fill="currentColor" 
                      />
                      
                      {/* Bubbles */}
                      {compositionData.map((bubble) => (
                        <g 
                          key={bubble.id} 
                          transform={`translate(
                            ${120 + Math.cos(bubble.angle) * bubble.radius},
                            ${120 + Math.sin(bubble.angle) * bubble.radius}
                          )`}
                        >
                          <circle
                            r={Math.sqrt(bubble.value) * 2}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            opacity={0.7}
                          />
                          {/* Pulse animation for hover effect would go here */}
                        </g>
                      ))}
                      
                      {/* Labels */}
                      {compositionData.map((bubble) => (
                        <text
                          key={bubble.id + '-label'}
                          x={120 + Math.cos(bubble.angle) * (bubble.radius + 20)}
                          y={120 + Math.sin(bubble.angle) * (bubble.radius + 20)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="font-mono text-xs text-muted-foreground"
                        >
                          {bubble.compound.slice(0, 8)}…
                        </text>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Composition details */}
                  <div className="mt-8 space-y-4">
                    {compositionData.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm py-2">
                        <span className="font-mono">{item.compound}</span>
                        <span className="font-mono text-xs">{item.value}</span>
                        <span className="font-mono">{item.partUsed}</span>
                        <span className="font-mono text-xs">{item.benefit}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-pretty text-base leading-relaxed">
                  No composition data documented for this plant.
                </p>
              )}
            </div>
          </section>
          
          {/* Seasonality Section */}
          <section id="seasonality" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.seasonality')}
              </h2>
              
              {/* Seasonality wheel */}
              <div className="mt-8 aspect-[1/1] w-full">
                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 240 240"
                >
                  {/* Outer ring - sowing */}
                  <path
                    d="M120,20 
                       A100,100 0 0,1 220,120 
                       A100,100 0 0,1 120,220 
                       A100,100 0 0,1 20,120 
                       Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    opacity={0.2}
                  />
                  
                  {/* Sowing arc */}
                  <path
                    d="M120,20 
                       A100,100 0 0,1 220,120 
                       A100,100 0 0,1 120,220 
                       Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  {/* Middle ring - flowering */}
                  <path
                    d="M120,60 
                       A60,60 0 0,1 180,120 
                       A60,60 0 0,1 120,180 
                       A60,60 0 0,1 60,120 
                       Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    opacity={0.2}
                  />
                  
                  {/* Flowering arc */}
                  <path
                    d="M120,60 
                       A60,60 0 0,1 180,120 
                       A60,60 0 0,1 120,180 
                       A60,60 0 0,1 60,120 
                       Z"
                    fill="none"
                    stroke="currentColor"
                    opacity={0.2}
                    strokeWidth="6"
                  />
                  
                  {/* Inner ring - harvesting */}
                  <path
                    d="M120,100 
                       A20,20 0 0,1 140,120 
                       A20,20 0 0,1 120,140 
                       A20,20 0 0,1 100,120 
                       Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity={0.2}
                  />
                  
                  <path
                    d="M120,100 
                       A20,20 0 0,1 140,120 
                       A20,20 0 0,1 120,140 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity={0.2}
                       Z"
                  />
                  
                  {/* Month labels */}
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((month) => (
                    <text
                      key={month}
                      x={120 + Math.cos((month - 1) * Math.PI / 6) * 130}
                      y={120 + Math.sin((month - 1) * Math.PI / 6) * 130}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-mono text-xs"
                    >
                      {getMonthName(month)}
                    </text>
                  ))}
                  
                  {/* Current month highlight */}
                  <circle
                    cx={120 + Math.cos((currentMonth - 1) * Math.PI / 6) * 120}
                    cy={120 + Math.sin((currentMonth - 1) * Math.PI / 6) * 120}
                    r="6"
                    fill={isSowing || isFlowering || isHarvesting ? 'currentColor' : 'none'}
                    stroke={isSowing || isFlowering || isHarvesting ? 'none' : 'currentColor'}
                    strokeWidth={2}
                  />
                </svg>
              </div>
              
              {/* Seasonality legend */}
              <div className="mt-6 flex flex-col gap-2 text-sm font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-leaf/80" />
                  <span>{isSowing ? t('season.sowing') : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-leaf/80" />
                  <span>{isFlowering ? t('season.flowering') : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-leaf/80" />
                  <span>{isHarvesting ? t('season.harvest') : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-leaf/80" />
                  <span>{t('season.current')}</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Taxonomy Section */}
          <section id="taxonomy" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.taxonomy')}
              </h2>
              
              {/* Taxonomy ladder */}
              <div className="mt-8 relative">
                <div className="w-1 h-full mx-auto bg-leaf/20" />
                
                {/* Taxonomy levels */}
                {[ 
                  { level: 'kingdom', value: plant.taxonomy.kingdom },
                  { level: 'phylum', value: plant.taxonomy.phylum },
                  { level: 'class', value: plant.taxonomy.class },
                  { level: 'order', value: plant.taxonomy.order },
                  { level: 'family', value: plant.taxonomy.family },
                  { level: 'genus', value: plant.taxonomy.genus },
                  { level: 'species', value: plant.taxonomy.species }
                ].map((level, index) => (
                  <div key={index} className="absolute inset-0 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-leaf/50" />
                    <div className="ml-4">
                      <h4 className="font-serif text-lg font-medium mb-1">
                        {level.level.charAt(0).toUpperCase() + level.level.slice(1)}
                      </h4>
                      <p className="font-mono text-sm">{level.value}</p>
                    </div>
                  </div>
                ))}
                
                {/* Leaf at the end */}
                <div className="absolute bottom-0 -left-2">
                  <Leaf className="h-12 w-12" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Related Plants Section */}
          <section id="related" className="scroll-mt-20">
            <div className="mx-auto max-w-4xl px-4 md:px-10">
              <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight">
                {t('sec.related')}
              </h2>
              
              {relatedPlants.length > 0 ? (
                <motion.ul
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  initial={false}
                  animate={true}
                >
                  {relatedPlants.map((relatedPlant, index) => (
                    <motion.li
                      key={relatedPlant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                    >
                      <Link
                        href={`/plant/${relatedPlant.slug}`}
                        className="group relative flex h-full overflow-hidden rounded-3xl border border-border bg-card"
                      >
                        <PlantImage
                          src={relatedPlant.image}
                          alt={relatedPlant.imageAlt}
                          fill
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 text-white">
                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                              {t(`cat.${relatedPlant.category}`)}
                            </p>
                            <h3 lang={lang} className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                              {relatedPlant.names[lang]}
                            </h3>
                            <p className="font-mono text-xs italic text-white/80">{relatedPlant.scientificName}</p>
                          </div>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-leaf">
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-pretty text-base leading-relaxed">
                  No related plants documented for this plant.
                </p>
              )}
            </div>
          </section>
        </main>
        
        {/* Footer with navigation */}
        <footer className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              {/* Navigation */}
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                {prev && (
                  <Link
                    href={`/plant/${prev.slug}`}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    <span>{t('plant.prev')}</span>
                  </Link>
                )}
                
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
                  {t('plant.back')}
                </span>
                
                {next && (
                  <Link
                    href={`/plant/${next.slug}`}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink"
                  >
                    <span>{t('plant.next')}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </div>
              
              {/* Share button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted/50 transition-all',
                    shared ? 'bg-leaf text-leaf-foreground' : 'text-foreground hover:text-leaf'
                  )}
                >
                  {shared ? (
                    <Leaf className="h-5 w-5" />
                  ) : (
                    <Share2 className="h-5 w-5" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="text-center text-pretty text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
              
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
                <span className="h-px w-8 bg-leaf" />
                <a href="/" className="hover:underline">
                  {t('footer.top')}
                </a>
              </div>
              
              <p className="text-center text-pretty text-sm text-muted-foreground">
                {t('footer.rights')}
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Page transition effect */}
      {/* <div className="page-wipe" /> */}
    </>
  )
}
