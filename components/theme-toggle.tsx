'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/providers/language-provider'

/** Sun ↔ moon morph: a mask circle slides in to carve the crescent while rays retract. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'
  const spring = { type: 'spring' as const, stiffness: 260, damping: 22 }

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={t('header.theme')}
      aria-pressed={dark}
      className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground"
      data-cursor="hover"
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ rotate: dark ? 40 : 90 }}
        transition={spring}
        aria-hidden
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle r="9" fill="black" animate={{ cx: dark ? 17 : 32, cy: dark ? 6 : -4 }} transition={spring} />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          animate={{ r: dark ? 9 : 5 }}
          transition={spring}
        />
        <motion.g animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.4 : 1 }} transition={spring} style={{ originX: '12px', originY: '12px' }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1="12"
              y1="1.5"
              x2="12"
              y2="3.5"
              transform={`rotate(${a} 12 12)`}
            />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  )
}
