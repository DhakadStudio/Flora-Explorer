'use client'

import { motion } from 'framer-motion'
import { useId } from 'react'
import { useLanguage } from '@/components/providers/language-provider'
import { languages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  const id = useId()
  return (
    <div
      role="radiogroup"
      aria-label={t('header.language')}
      className={cn('flex items-center rounded-full border border-border p-0.5', className)}
    >
      {languages.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={l.label}
            title={l.label}
            lang={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              'relative h-8 min-w-9 rounded-full px-2 font-mono text-xs transition-colors',
              active ? 'text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{l.short}</span>
          </button>
        )
      })}
    </div>
  )
}
