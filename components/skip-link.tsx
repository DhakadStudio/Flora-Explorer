'use client'

import { useLanguage } from '@/components/providers/language-provider'

export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main"
      className="sr-only z-[120] rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t('nav.skip')}
    </a>
  )
}
