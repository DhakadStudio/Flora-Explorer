'use client'

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, GitCompareArrows, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useCommandPalette } from '@/components/command-palette'
import { Leaf } from '@/components/Leaf'
import { PlantImage } from '@/components/plant-image'
import { useLanguage } from '@/components/providers/language-provider'
import { plants, type Plant } from '@/data/plants'
import { cn } from '@/lib/utils'

type Category = Plant['category']

/** Bento sizes cycle so any number of plants produces a varied grid. */
const sizes = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-2 sm:row-span-1',
]

const spring = { type: 'spring', stiffness: 260, damping: 30 } as const

function PlantTile({ plant, size }: { plant: Plant; size: string }) {
  const { t, lang } = useLanguage()
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={spring}
      className={cn('min-h-64', size)}
    >
      <Link
        href={`/plant/${plant.slug}`}
        className="group relative flex h-full overflow-hidden rounded-3xl border border-border bg-card"
      >
        <PlantImage
          src={plant.image}
          alt={plant.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 text-white">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/75">{t(`cat.${plant.category}`)}</p>
            <h3 lang={lang} className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {plant.names[lang]}
            </h3>
            <p className="font-mono text-xs italic text-white/80">{plant.scientificName}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-leaf">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.li>
  )
}

function FeatureTile({
  icon,
  title,
  text,
  href,
  onClick,
  tone,
  className,
}: {
  icon: React.ReactNode
  title: string
  text: string
  href?: string
  onClick?: () => void
  tone: 'leaf' | 'ink' | 'muted'
  className?: string
}) {
  const toneClass = {
    leaf: 'bg-leaf text-leaf-foreground',
    ink: 'bg-foreground text-background',
    muted: 'bg-muted text-foreground',
  }[tone]
  const inner = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/25">{icon}</span>
      <span className="mt-auto block">
        <span className="block font-serif text-2xl font-medium tracking-tight">{title}</span>
        <span className="mt-1 block text-sm opacity-80">{text}</span>
      </span>
    </>
  )
  const cls = cn(
    'flex h-full min-h-48 w-full flex-col items-start rounded-3xl p-6 text-left transition-transform duration-300 hover:-translate-y-1',
    toneClass,
  )
  return (
    <motion.li layout transition={spring} className={className}>
      {href ? (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={cls}>
          {inner}
        </button>
      )}
    </motion.li>
  )
}

export function ExploreGrid() {
  const { t } = useLanguage()
  const { open } = useCommandPalette()
  const [active, setActive] = useState<Category | 'all'>('all')

  const categories = useMemo(() => Array.from(new Set(plants.map((p) => p.category))), [])
  const visible = active === 'all' ? plants : plants.filter((p) => p.category === active)

  const chips: { id: Category | 'all'; label: string; count: number }[] = [
    { id: 'all', label: t('explore.all'), count: plants.length },
    ...categories.map((c) => ({ id: c, label: t(`cat.${c}`), count: plants.filter((p) => p.category === c).length })),
  ]

  return (
    <section id="explore" aria-labelledby="explore-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">{t('explore.eyebrow')}</p>
            <h2 id="explore-title" className="mt-3 font-serif text-5xl font-medium tracking-tight md:text-7xl">
              {t('explore.title')}
            </h2>
          </div>

          <div role="radiogroup" aria-label={t('explore.eyebrow')} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            <LayoutGroup id="chips">
              {chips.map((chip) => {
                const selected = chip.id === active
                return (
                  <button
                    key={chip.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setActive(chip.id)}
                    className={cn(
                      'relative shrink-0 rounded-full border border-border px-4 py-2 text-sm transition-colors',
                      selected ? 'text-background' : 'text-foreground hover:border-foreground',
                    )}
                  >
                    {selected && (
                      <motion.span layoutId="chip-bg" transition={spring} className="absolute inset-0 rounded-full bg-foreground" />
                    )}
                    <span className="relative flex items-center gap-2">
                      {chip.label}
                      <span className="font-mono text-[11px] opacity-70">{chip.count}</span>
                    </span>
                  </button>
                )
              })}
            </LayoutGroup>
          </div>
        </div>

        <motion.ul layout className="mt-12 grid auto-rows-[minmax(16rem,auto)] grid-cols-1 gap-4 sm:auto-rows-[15rem] sm:grid-cols-4 md:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((plant, i) => (
              <PlantTile key={plant.id} plant={plant} size={sizes[i % sizes.length]} />
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <li className="flex items-center justify-center rounded-3xl border border-dashed border-border p-10 text-muted-foreground sm:col-span-4">
              {t('explore.empty')}
            </li>
          )}
          <FeatureTile
            tone="ink"
            icon={<Search className="h-5 w-5" aria-hidden />}
            title={t('explore.searchTitle')}
            text={t('explore.searchText')}
            onClick={open}
            className="sm:col-span-2"
          />
          <FeatureTile
            tone="leaf"
            icon={<GitCompareArrows className="h-5 w-5" aria-hidden />}
            title={t('explore.compareTitle')}
            text={t('explore.compareText')}
            href="/compare"
            className="sm:col-span-1"
          />
          <motion.li layout transition={spring} className="sm:col-span-1">
            <div className="relative flex h-full min-h-48 flex-col overflow-hidden rounded-3xl border border-border bg-muted p-6">
              <Sparkles className="h-5 w-5 text-leaf-ink" aria-hidden />
              <Leaf inView animate loop speed={0.5} className="absolute -bottom-6 -right-6 h-32 w-32 text-leaf/40" />
              <p className="mt-auto font-serif text-2xl font-medium tracking-tight">{t('explore.specialTitle')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('explore.specialText')}</p>
            </div>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  )
}
