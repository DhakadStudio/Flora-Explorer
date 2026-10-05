'use client'

import { motion } from 'framer-motion'
import { LEAF_MIDRIB, LEAF_OUTLINE } from '@/components/Leaf'
import { useLanguage } from '@/components/providers/language-provider'

const team = ['VISHAL DHAKAD', 'SIDDHARTH SOLANKI', 'VAISHNAVI DWIVEDI', 'VAISHNAVI PUNDE', 'SMITA YADAV', 'VAIBHAVI PARASHAR']

function toTitle(name: string) {
  return name
    .toLowerCase()
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
}

/** Initials inside a hand-drawn circle with a small leaf sprouting from the rim. */
function Monogram({ name, index }: { name: string; index: number }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
  }
  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full overflow-visible text-leaf">
        <motion.path
          d="M50 6 C76 5 95 24 94 50 C93 77 74 95 49 94 C24 93 6 74 6 50 C7 26 25 8 52 7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: index * 0.1 }}
        />
        <g transform="translate(72 -6) rotate(35) scale(0.26)">
          <motion.path
            d={LEAF_OUTLINE}
            fill="none"
            stroke="currentColor"
            strokeWidth={5}
            {...draw}
            transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
          />
          <motion.path
            d={LEAF_MIDRIB}
            fill="none"
            stroke="currentColor"
            strokeWidth={5}
            {...draw}
            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
          />
        </g>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-medium tracking-tight">
        {initials(name)}
      </span>
    </div>
  )
}

export function TeamSection() {
  const { t } = useLanguage()
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-leaf-ink">{t('team.eyebrow')}</p>
        <h2 id="team-title" className="mt-3 font-serif text-5xl font-medium tracking-tight md:text-7xl">
          {t('team.title')}
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {team.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            >
              <article className="group flex items-center gap-6 rounded-3xl border border-border bg-card p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-leaf hover:shadow-[0_24px_48px_-24px_rgb(31_138_76/0.45)]">
                <Monogram name={name} index={i} />
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight">{toTitle(name)}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t('team.member')} · {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
