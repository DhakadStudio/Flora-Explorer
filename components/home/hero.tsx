'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Leaf } from '@/components/Leaf'
import { Magnetic } from '@/components/magnetic'
import { useLanguage } from '@/components/providers/language-provider'
import { NameMarquee } from '@/components/home/name-marquee'

const EASE = [0.22, 1, 0.36, 1] as const

/** Staggers letters for Latin scripts; Devanagari is staggered by word so conjuncts keep their shaping. */
function StaggerLine({ text, delay, splitLetters }: { text: string; delay: number; splitLetters: boolean }) {
  const words = text.split(' ')
  let index = 0
  return (
    <span className="block" aria-hidden>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap overflow-hidden pb-[0.08em] align-bottom">
          {(splitLetters ? Array.from(word) : [word]).map((ch, ci) => {
            const i = index++
            return (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                initial={{ y: '110%', rotate: 6, opacity: 0 }}
                animate={{ y: '0%', rotate: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: delay + i * (splitLetters ? 0.035 : 0.12) }}
              >
                {ch}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const far = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%'])
  const mid = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-25%'])
  const near = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-60%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const splitLetters = lang !== 'hi'
  const line1 = t('hero.line1')
  const line2 = t('hero.line2')

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative -mt-16 flex min-h-svh flex-col overflow-hidden pt-16"
    >
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <motion.div aria-hidden style={{ y: far }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Leaf
          animate
          speed={0.6}
          strokeWidth={0.6}
          className="h-[120vmin] w-[120vmin] max-w-none rotate-[-18deg] text-leaf/25 md:h-[95vmin] md:w-[95vmin]"
        />
      </motion.div>
      <motion.div aria-hidden style={{ y: mid }} className="pointer-events-none absolute right-[6%] top-[18%]">
        <Leaf animate speed={1.2} strokeWidth={2} className="h-20 w-20 rotate-[28deg] text-leaf/50 md:h-28 md:w-28" />
      </motion.div>
      <motion.div aria-hidden style={{ y: near }} className="pointer-events-none absolute bottom-[22%] left-[5%]">
        <Leaf filled className="h-10 w-10 -rotate-45 text-leaf/40 md:h-14 md:w-14" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-16 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-leaf" />
          {t('hero.eyebrow')}
        </motion.p>

        <h1
          id="hero-title"
          key={lang}
          className="text-balance font-serif text-[clamp(3.25rem,12vw,11rem)] font-medium leading-[0.92] tracking-[-0.035em]"
        >
          <span className="sr-only">
            {line1} {line2}
          </span>
          <StaggerLine text={line1} delay={0.3} splitLetters={splitLetters} />
          <span className="block italic text-leaf-ink">
            <StaggerLine text={line2} delay={0.6} splitLetters={splitLetters} />
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
          >
            <Magnetic strength={0.4}>
              <Link
                href="#explore"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground py-4 pl-7 pr-4 text-base font-medium text-background transition-colors hover:bg-leaf hover:text-leaf-foreground"
              >
                {t('hero.cta')}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#story"
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {t('hero.scroll')}
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="animate-scroll-cue absolute inset-0 bg-leaf" />
        </span>
        <ArrowDown className="sr-only" aria-hidden />
      </a>

      <NameMarquee />
    </section>
  )
}
