'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { PlantImage } from '@/components/plant-image'
import { useLanguage } from '@/components/providers/language-provider'
import { plants, type Plant } from '@/data/plants'

function TiltCard({ plant, index }: { plant: Plant; index: number }) {
  const { t, lang, p } = useLanguage()
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-11, 11]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.22), transparent 55%)`)

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.li
      className="perspective w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-[30vw]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <motion.div style={{ rotateX, rotateY }} className="preserve-3d">
        <Link
          ref={ref}
          href={`/plant/${plant.slug}`}
          onPointerMove={onMove}
          onPointerLeave={reset}
          onPointerCancel={reset}
          className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
        >
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 + index * 0.08 }}
          >
            <PlantImage
              src={plant.image}
              alt={plant.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            {!reduce && <motion.div aria-hidden style={{ background: glare }} className="absolute inset-0 mix-blend-overlay" />}
            <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur">
              {t(`cat.${plant.category}`)}
            </span>
            <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white" style={{ transform: 'translateZ(40px)' }}>
              <p className="font-mono text-xs text-white/70">{String(index + 1).padStart(2, '0')}</p>
              <h3 lang={lang} className="mt-1 font-serif text-4xl font-medium tracking-tight">
                {plant.names[lang]}
              </h3>
              <div className="overflow-hidden">
                <p className="translate-y-0 font-mono text-sm italic text-white/85 transition-transform duration-500 ease-out md:translate-y-full md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
                  {plant.scientificName}
                </p>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-white/80">{p(plant.summary)}</p>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.li>
  )
}

export function FeaturedPlants() {
  const { t } = useLanguage()
  return (
    <section aria-labelledby="featured-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">{t('featured.eyebrow')}</p>
          <h2 id="featured-title" className="mt-3 font-serif text-5xl font-medium tracking-tight md:text-7xl">
            {t('featured.title')}
          </h2>
        </div>
        <p className="hidden font-mono text-xs text-muted-foreground sm:block">{t('featured.hint')} →</p>
      </div>
      <ul
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-6 md:gap-8 md:px-10"
        aria-label={t('featured.title')}
      >
        {plants.map((plant, i) => (
          <TiltCard key={plant.id} plant={plant} index={i} />
        ))}
      </ul>
    </section>
  )
}
