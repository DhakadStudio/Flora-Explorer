'use client'

import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { Leaf } from '@/components/Leaf'
import { T } from '@/components/lang-text'
import { useLanguage } from '@/components/providers/language-provider'
import { plants } from '@/data/plants'

export function SiteFooter() {
  const { lang, t } = useLanguage()
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-16 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div className="flex flex-col gap-4">
          <Leaf size={40} className="text-leaf" animate inView />
          <p className="max-w-sm font-serif text-2xl leading-snug text-balance">
            <T k="footer.tagline" />
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <T k="nav.explore" />
          </h2>
          <ul className="flex flex-col gap-2">
            {plants.map((p) => (
              <li key={p.slug}>
                <Link href={`/plant/${p.slug}`} className="link-underline">
                  {p.names[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Flora</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/compare" className="link-underline">
                <T k="nav.compare" />
              </Link>
            </li>
            <li>
              <Link href="/search" className="link-underline">
                <T k="nav.search" />
              </Link>
            </li>
            <li>
              <Link href="/#team" className="link-underline">
                <T k="nav.team" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-2 md:px-6">
        <Link
          href="/"
          aria-label={t('header.home')}
          className="wordmark block select-none text-center font-serif text-[22vw] font-semibold leading-[0.8] tracking-tighter focus-visible:outline-none"
        >
          Flora
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
        <p>
          © {new Date().getFullYear()} Flora Explorer · <T k="footer.rights" />
        </p>
        <a href="#top" className="flex items-center gap-2 hover:text-foreground">
          <ArrowUp className="size-3" aria-hidden /> <T k="footer.top" />
        </a>
      </div>
    </footer>
  )
}
