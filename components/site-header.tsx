'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCommandPalette } from '@/components/command-palette'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Leaf } from '@/components/Leaf'
import { useLanguage } from '@/components/providers/language-provider'
import { ScrambleText } from '@/components/scramble-text'
import { ThemeToggle } from '@/components/theme-toggle'
import type { TKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const nav: { href: string; key: TKey }[] = [
  { href: '/#explore', key: 'nav.explore' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/search', key: 'nav.search' },
  { href: '/#team', key: 'nav.team' },
]

export function SiteHeader() {
  const { t } = useLanguage()
  const { open } = useCommandPalette()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || menuOpen
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-8">
        <Link href="/" aria-label={t('header.home')} className="group flex items-center gap-2" data-cursor="hover">
          <Leaf size={28} className="text-leaf transition-transform duration-500 group-hover:-rotate-12" filled />
          <span className="font-serif text-lg tracking-tight">
            Flora <span className="italic">Explorer</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <ScrambleText text={t(item.key)} />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <button
            type="button"
            onClick={open}
            aria-label={t('header.search')}
            aria-keyshortcuts="Control+K Meta+K"
            className="flex h-10 items-center gap-2 rounded-full border border-border px-3 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <Search className="size-4" aria-hidden />
            <kbd className="hidden font-mono text-[10px] lg:inline">⌘K</kbd>
          </button>
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link href={item.href} className="block py-3 font-serif text-3xl" onClick={() => setMenuOpen(false)}>
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 pb-5 sm:hidden">
              <LanguageSwitcher />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
