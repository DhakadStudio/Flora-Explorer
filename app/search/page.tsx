'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/components/providers/language-provider'
import { plants, type Plant } from '@/data/plants'
import { Leaf } from '@/components/Leaf'
import { PlantImage } from '@/components/plant-image'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/lib/utils'

export default function SearchPage() {
  const { t, lang, p } = useLanguage()
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 200)
  const [results, setResults] = useState<Plant[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  // Search plants based on query
  const searchPlants = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const term = searchTerm.toLowerCase().trim()
    setIsSearching(true)

    // Search in names, scientific name, and aliases
    const matched = plants.filter((plant) => {
      // Check names in all languages
      const nameMatch =
        plant.names.en.toLowerCase().includes(term) ||
        plant.names.hi?.toLowerCase().includes(term) ||
        plant.names.es?.toLowerCase().includes(term)

      // Check scientific name
      const scientificMatch = plant.scientificName.toLowerCase().includes(term)

      // Check aliases
      const aliasMatch = plant.aliases.some((alias) =>
        alias.toLowerCase().includes(term)
      )

      return nameMatch || scientificMatch || aliasMatch
    })

    setResults(matched)
    setIsSearching(false)
  }, [])

  // Update results when debounced query changes
  useEffect(() => {
    searchPlants(debouncedQuery)
  }, [debouncedQuery, searchPlants])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Clear search when escape is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('')
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="mb-12 text-center">
          <Leaf className="h-16 w-16 mb-6 animate leaf-pulse" />
          <h1 className="mb-6 font-serif text-5xl font-medium tracking-tight">
            {t('search.title')}
          </h1>
          <p className="mb-8 text-pretty text-base leading-relaxed">
            {t('search.subtitle')}
          </p>
        </div>

        <div className="mb-12">
          <label htmlFor="search-input" className="sr-only">
            {t('search.label')}
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              placeholder={t('search.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results.length > 0) {
                  // Navigate to first result
                  window.location.href = `/plant/${results[0].slug}`
                }
              }}
              className="w-full rounded-xl border border-input bg-background px-5 py-4 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf"
              aria-label={t('search.label')}
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted/50 p-1"
                aria-label={t('common.close')}
              >
                <Leaf className="h-4 w-4 stroke-current" />
              </button>
            )}
          </div>
        </div>

        {isSearching ? (
          <div className="flex h-96 items-center justify-center">
            <Leaf className="h-8 w-8 animate leaf-spin" />
            <p className="ml-3 font-mono text-sm">{t('common.loading')}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                {t('search.matched')} ({results.length})
              </h2>
              <p className="font-mono text-xs text-muted-foreground">
                {t('search.hint.nav')} • {t('search.hint.open')}
              </p>
            </div>
            
            <motion.ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={false}
              animate={true}
              exit={true}
            >
              {results.map((plant) => (
                <motion.li
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/plant/${plant.slug}`}
                    className="group relative flex h-full overflow-hidden rounded-3xl border border-border bg-card"
                  >
                    <PlantImage
                      src={plant.image}
                      alt={plant.imageAlt}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 text-white">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                          {t(`cat.${plant.category}`)}
                        </p>
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
              ))}
            </motion.ul>
          </div>
        ) : query.length > 0 ? (
          <div className="text-center py-16">
            <Leaf className="h-24 w-24 mb-6" />
            <p className="mb-4 font-mono text-lg">{t('search.empty')}</p>
            <p className="text-pretty text-sm text-muted-foreground max-w-xl">
              Try searching for a plant by its common name in English, Hindi, or Spanish,
              its scientific name, or a known alias.
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
              <span className="h-px w-8 bg-leaf" />
              <a href="/" className="hover:underline">
                {t('plant.back')}
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight">
              {t('explore.title')}
            </h2>
            <p className="mb-6 text-pretty text-base leading-relaxed max-w-xl">
              {t('explore.searchText')}
            </p>
            <div className="flex flex-col items-center gap-4">
              <motion.ul
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                initial={false}
                animate={true}
              >
                {plants.slice(0, 6).map((plant) => (
                  <motion.li
                    key={plant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.random() * 0.3 }}
                  >
                    <Link
                      href={`/plant/${plant.slug}`}
                      className="group relative flex h-full overflow-hidden rounded-3xl border border-border bg-card"
                    >
                      <PlantImage
                        src={plant.image}
                        alt={plant.imageAlt}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 text-white">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                            {t(`cat.${plant.category}`)}
                          </p>
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
                ))}
              </motion.ul>
              
              <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
                <span className="h-px w-8 bg-leaf" />
                <a href="/" className="hover:underline">
                  {t('plant.back')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}