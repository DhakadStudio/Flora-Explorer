'use client'

import { motion, useReducedMotion, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export const LEAF_OUTLINE = 'M50 95 C20 70 10 40 50 5 C90 40 80 70 50 95 Z'
export const LEAF_MIDRIB = 'M50 95 L50 15'
export const LEAF_VEINS = [
  'M50 72 C40 66 32 62 26 56',
  'M50 52 C41 46 34 41 28 34',
  'M50 34 C44 29 40 25 37 20',
  'M50 72 C60 66 68 62 74 56',
  'M50 52 C59 46 66 41 72 34',
  'M50 34 C56 29 60 25 63 20',
]

type LeafProps = {
  size?: number | string
  /** Redraw continuously. */
  loop?: boolean
  /** Speed multiplier — 2 draws twice as fast. */
  speed?: number
  /** Animate the drawing sequence on mount (or when in view if `inView`). */
  animate?: boolean
  /** Only start drawing when scrolled into view. */
  inView?: boolean
  /** Render as a static filled leaf. */
  filled?: boolean
  /** Drive the drawing with an external 0→1 value (e.g. scroll progress). */
  progress?: MotionValue<number>
  strokeWidth?: number
  className?: string
  title?: string
  onComplete?: () => void
}

/**
 * The signature hand-drawn leaf. Draw order: outline → midrib → veins (one by one) → green fill.
 */
export function Leaf({
  size = 48,
  loop = false,
  speed = 1,
  animate = false,
  inView = false,
  filled = false,
  progress,
  strokeWidth = 1.5,
  className,
  title,
  onComplete,
}: LeafProps) {
  const reduce = useReducedMotion()
  const a11y = title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const }

  // Static rendering
  if ((!animate && !progress) || reduce) {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('shrink-0', className)}
        {...a11y}
      >
        {title && <title>{title}</title>}
        <path d={LEAF_OUTLINE} fill={filled || reduce ? 'currentColor' : 'none'} fillOpacity={filled ? 1 : reduce ? 0.18 : 0} />
        <path d={LEAF_MIDRIB} stroke={filled ? 'var(--background)' : 'currentColor'} />
        {LEAF_VEINS.map((d) => (
          <path key={d} d={d} stroke={filled ? 'var(--background)' : 'currentColor'} />
        ))}
      </svg>
    )
  }

  // Scroll / progress-driven
  if (progress) {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('shrink-0', className)}
        {...a11y}
      >
        <path d={LEAF_OUTLINE} stroke="currentColor" strokeOpacity={0.2} />
        <motion.path d={LEAF_OUTLINE} style={{ pathLength: progress }} />
        <motion.path d={LEAF_MIDRIB} style={{ pathLength: progress }} />
      </svg>
    )
  }

  // Every path shares one timeline (keyframes + `times`) so looping stays in sync.
  const d = 1 / speed
  const outlineEnd = 1.1 * d
  const ribEnd = outlineEnd + 0.5 * d
  const veinGap = 0.14 * d
  const veinDur = 0.3 * d
  const fillStart = ribEnd + LEAF_VEINS.length * veinGap + veinDur * 0.5
  const fillEnd = fillStart + 0.6 * d
  const total = fillEnd + (loop ? 0.9 * d : 0)
  const at = (s: number) => Math.min(1, s / total)
  const timing = {
    duration: total,
    ease: 'easeInOut' as const,
    ...(loop ? { repeat: Infinity, repeatType: 'loop' as const } : {}),
  }
  const draw = (start: number, end: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: [0, 0, 1, 1],
      opacity: [0, 0, 1, 1],
      transition: { ...timing, times: [0, at(start), at(end), 1] },
    },
  })

  const trigger = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: !loop, amount: 0.5 } }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      {...a11y}
      {...trigger}
    >
      {title && <title>{title}</title>}
      <motion.path
        d={LEAF_OUTLINE}
        fill="currentColor"
        stroke="none"
        variants={{
          hidden: { fillOpacity: 0 },
          visible: {
            fillOpacity: [0, 0, 0.22, loop ? 0 : 0.22],
            transition: { ...timing, times: [0, at(fillStart), at(fillEnd), 1] },
          },
        }}
        onAnimationComplete={onComplete}
      />
      <motion.path d={LEAF_OUTLINE} variants={draw(0, outlineEnd)} />
      <motion.path d={LEAF_MIDRIB} variants={draw(outlineEnd, ribEnd)} />
      {LEAF_VEINS.map((vein, i) => {
        const start = ribEnd + i * veinGap
        return <motion.path key={vein} d={vein} variants={draw(start, start + veinDur)} />
      })}
    </motion.svg>
  )
}
