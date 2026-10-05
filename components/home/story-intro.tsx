'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Leaf } from '@/components/Leaf'
import { useLanguage } from '@/components/providers/language-provider'
import type { TKey } from '@/lib/i18n'

const statements: TKey[] = ['story.1', 'story.2', 'story.3']

function Statement({ k, index, progress }: { k: TKey; index: number; progress: MotionValue<number> }) {
  const { t } = useLanguage()
  const n = statements.length
  const start = index / n
  const end = (index + 1) / n
  const pad = 0.08
  const isLast = index === n - 1
  const opacity = useTransform(
    progress,
    [start, start + pad, end - pad, end],
    [index === 0 ? 1 : 0, 1, 1, isLast ? 1 : 0],
  )
  const scale = useTransform(progress, [start, start + pad, end - pad, end], [index === 0 ? 1 : 0.85, 1, 1, isLast ? 1 : 1.15])
  const blur = useTransform(progress, [start, start + pad, end - pad, end], [index === 0 ? 0 : 8, 0, 0, isLast ? 0 : 8])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.p
      style={{ opacity, scale, filter }}
      className="absolute inset-0 flex items-center justify-center px-6 text-center font-serif text-[clamp(2.5rem,9vw,8rem)] font-medium leading-none tracking-tight text-balance will-change-transform"
    >
      {t(k)}
    </motion.p>
  )
}

export function StoryIntro() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (reduce) {
    return (
      <section id="story" className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-28 text-center">
        {statements.map((k) => (
          <p key={k} className="font-serif text-5xl font-medium tracking-tight md:text-7xl">
            {t(k)}
          </p>
        ))}
      </section>
    )
  }

  return (
    <section id="story" ref={ref} aria-label={statements.map((k) => t(k)).join(' ')} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <Leaf progress={scrollYProgress} strokeWidth={0.5} className="absolute h-[80vmin] w-[80vmin] text-leaf/20" />
        <div className="relative h-full w-full">
          {statements.map((k, i) => (
            <Statement key={k} k={k} index={i} progress={scrollYProgress} />
          ))}
        </div>
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>01</span>
          <span className="relative h-px w-24 overflow-hidden bg-border">
            <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-leaf" />
          </span>
          <span>03</span>
        </div>
      </div>
    </section>
  )
}
