'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/language-provider'
import type { TKey } from '@/lib/i18n'
import type { Localized } from '@/data/plants'

/**
 * Renders translated text and blur-fades whenever the language changes.
 * Keyed by language, so React remounts the span and replays the entry animation.
 */
export function LangFade({ children, className }: { children: React.ReactNode; className?: string }) {
  const { lang } = useLanguage()
  return (
    <motion.span
      key={lang}
      className={className}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  )
}

export function T({
  k,
  vars,
  className,
}: {
  k: TKey
  vars?: Record<string, string | number>
  className?: string
}) {
  const { t } = useLanguage()
  return <LangFade className={className}>{t(k, vars)}</LangFade>
}

export function P({ v, className }: { v: Localized | string; className?: string }) {
  const { p } = useLanguage()
  return <LangFade className={className}>{p(v)}</LangFade>
}
