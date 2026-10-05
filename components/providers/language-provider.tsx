'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANG_STORAGE_KEY, months, pick, translate, type Lang, type TKey } from '@/lib/i18n'
import type { Localized } from '@/data/plants'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TKey, vars?: Record<string, string | number>) => string
  p: (value: Localized | string | undefined) => string
  months: string[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'hi' || v === 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(stored)) setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {}
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      p: (v) => pick(v, lang),
      months: months[lang],
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
