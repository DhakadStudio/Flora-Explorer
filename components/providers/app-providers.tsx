'use client'

import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { CommandPaletteProvider } from '@/components/command-palette'
import { LanguageProvider } from '@/components/providers/language-provider'
import { ToastProvider } from '@/components/providers/toast-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <ToastProvider>
            <CommandPaletteProvider>{children}</CommandPaletteProvider>
          </ToastProvider>
        </LanguageProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
