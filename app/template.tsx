'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Leaf-shaped polygon (pointed tips, convex sides) in % units, rotated by `tilt` degrees. */
function leafPolygon(scale: number, tilt = -24, cx = 50, cy = 50) {
  const pts: string[] = []
  const rad = (tilt * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const N = 36
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const c = Math.cos(a)
    const x = Math.sign(Math.sin(a)) * 0.62 * scale * (1 - c * c)
    const y = -scale * c
    pts.push(`${(cx + x * cos - y * sin).toFixed(2)}% ${(cy + x * sin + y * cos).toFixed(2)}%`)
  }
  return `polygon(${pts.join(', ')})`
}

const COVER = leafPolygon(190, -24)
const GONE = leafPolygon(0, 20, 50, 40)

let hasMounted = false

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const [isNavigation] = useState(() => hasMounted)

  useEffect(() => {
    hasMounted = true
  }, [])

  return (
    <>
      {children}
    </>
  )
}
