'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>'

/** Scrambles Latin text on hover/focus and resolves left-to-right. Non-Latin scripts are left intact. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const raf = useRef<number | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    setDisplay(text)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [text])

  const run = () => {
    if (reduce || !/^[\x20-\x7E]+$/.test(text)) return
    if (raf.current) cancelAnimationFrame(raf.current)
    const start = performance.now()
    const duration = 380
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      setDisplay(
        text
          .split('')
          .map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(''),
      )
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  return (
    <span className={className} onMouseEnter={run} onFocus={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  )
}
