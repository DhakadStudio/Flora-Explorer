'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/** Counts from 0 to `value` once scrolled into view (or when `value` changes). Writes to the DOM directly. */
export function CountUp({
  value,
  duration = 1.6,
  decimals = 0,
  suffix = '',
  className,
}: {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()
  const format = (v: number) => `${v.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = format(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce, duration, decimals, suffix])

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  )
}
