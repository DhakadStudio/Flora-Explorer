'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CornerDownLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Highlight } from '@/components/highlight'
import { Leaf } from '@/components/Leaf'
import { useLanguage } from '@/components/providers/language-provider'
import { searchPlants, type MatchField } from '@/lib/search'

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} })

export function useCommandPalette() {
  return useContext(PaletteContext)
}

const fieldLabel: Record<MatchField, string> = {
  en: 'EN',
  hi: 'HI',
  es: 'ES',
  scientific: 'SCI',
  alias: 'ALIAS',
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ open }), [open])

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Palette onClose={() => setIsOpen(false)} />}</AnimatePresence>
    </PaletteContext.Provider>
  )
}

function Palette({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const results = useMemo(() => searchPlants(query), [query])
  const restoreFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    restoreFocus.current = document.activeElement as HTMLElement
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      restoreFocus.current?.focus?.()
    }
  }, [])

  useEffect(() => setActive(0), [query])

  const go = (slug: string) => {
    onClose()
    router.push(`/plant/${slug}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      const r = results[active]
      if (r) go(r.plant.slug)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center px-3 pt-[12vh] md:pt-[16vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label={t('common.close')}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t('search.label')}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
        initial={{ y: -16, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -8, scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.label')}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none"
            lang={lang}
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        <ul id={listId} role="listbox" aria-label={t('search.label')} className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="flex flex-col items-center gap-3 px-4 py-10 text-center text-sm text-muted-foreground">
              <Leaf size={36} className="text-leaf" />
              <span>
                {t('search.empty')} <span className="text-foreground">“{query}”</span>
              </span>
            </li>
          )}
          {results.map((r, i) => (
            <li
              key={r.plant.slug}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => go(r.plant.slug)}
              className="relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3"
            >
              {i === active && (
                <motion.span
                  layoutId="palette-active"
                  className="absolute inset-0 rounded-xl bg-muted"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-border">
                <Leaf size={18} className="text-leaf" />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block truncate font-serif text-lg leading-tight">
                  {r.field === lang ? <Highlight text={r.text} range={r.range} /> : r.plant.names[lang]}
                </span>
                <span className="block truncate font-mono text-xs italic text-muted-foreground">
                  {r.field === 'scientific' ? <Highlight text={r.text} range={r.range} /> : r.plant.scientificName}
                  {r.field !== lang && r.field !== 'scientific' && query && (
                    <>
                      {' · '}
                      <span className="not-italic">
                        {fieldLabel[r.field]} <Highlight text={r.text} range={r.range} />
                      </span>
                    </>
                  )}
                </span>
              </span>
              <ArrowRight
                className={`relative size-4 shrink-0 transition-all ${i === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'}`}
                aria-hidden
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1">↑</kbd>
            <kbd className="rounded border border-border px-1">↓</kbd> {t('search.hint.nav')}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="flex items-center rounded border border-border px-1">
              <CornerDownLeft className="size-2.5" aria-hidden />
            </kbd>{' '}
            {t('search.hint.open')}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1">esc</kbd> {t('search.hint.close')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
