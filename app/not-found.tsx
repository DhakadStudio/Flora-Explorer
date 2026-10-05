'use client'

import { Leaf } from '@/components/Leaf'
import { useLanguage } from '@/components/providers/language-provider'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-16 px-6">
      <div className="text-center">
        <Leaf className="h-24 w-24 animate leaf-spin" />
        <h1 className="mb-4 font-serif text-5xl font-medium tracking-tight">
          {t('notfound.title')}
        </h1>
        <p className="mb-6 text-pretty text-base leading-relaxed max-w-2xl">
          {t('notfound.text')}
        </p>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">
          <span className="h-px w-8 bg-leaf" />
          <Link href="/" className="hover:underline">
            {t('notfound.back')}
          </Link>
        </div>
      </div>
      
      <a href="#" className="relative z-10 mb-6 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {t('hero.scroll')}
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="animate-scroll-cue absolute inset-0 bg-leaf" />
        </span>
        <ArrowDown className="sr-only" aria-hidden />
      </a>
    </section>
  )
}