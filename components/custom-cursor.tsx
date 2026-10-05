'use client'

import { useEffect, useRef } from 'react'
import { LEAF_MIDRIB, LEAF_OUTLINE } from '@/components/Leaf'

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="radio"], [role="option"], input, select, textarea, label, summary, [data-cursor="hover"]'
const TRAIL_SPACING = 70
const MAX_TRAIL = 14

/**
 * Desktop-only cursor: a dot that tracks exactly, a ring that lags and grows on interactive elements,
 * and a faint trail of small drawn leaves. Uses direct DOM writes in one rAF loop — no React re-renders.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches) return

    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    const dot = dotRef.current!
    const ring = ringRef.current!
    const trail = trailRef.current!

    let mx = -100
    let my = -100
    let rx = mx
    let ry = my
    let lastTrailX = 0
    let lastTrailY = 0
    let hovering = false
    let visible = false
    let raf = 0

    const spawnLeaf = (x: number, y: number, angle: number) => {
      if (reduce.matches || trail.childElementCount >= MAX_TRAIL) return
      const ns = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(ns, 'svg')
      svg.setAttribute('viewBox', '0 0 100 100')
      svg.setAttribute('width', '14')
      svg.setAttribute('height', '14')
      svg.setAttribute('class', 'cursor-leaf')
      svg.style.transform = `translate3d(${x - 7}px, ${y - 7}px, 0) rotate(${angle}deg)`
      for (const d of [LEAF_OUTLINE, LEAF_MIDRIB]) {
        const p = document.createElementNS(ns, 'path')
        p.setAttribute('d', d)
        p.setAttribute('pathLength', '1')
        svg.appendChild(p)
      }
      trail.appendChild(svg)
      svg.addEventListener('animationend', () => svg.remove(), { once: true })
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        rx = mx
        ry = my
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      const dx = mx - lastTrailX
      const dy = my - lastTrailY
      if (dx * dx + dy * dy > TRAIL_SPACING * TRAIL_SPACING) {
        spawnLeaf(mx, my, (Math.atan2(dy, dx) * 180) / Math.PI + 90)
        lastTrailX = mx
        lastTrailY = my
      }
      const target = e.target as Element | null
      const next = !!target?.closest?.(INTERACTIVE)
      if (next !== hovering) {
        hovering = next
        ring.dataset.hover = String(next)
        dot.dataset.hover = String(next)
      }
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onDown = () => (ring.dataset.down = 'true')
    const onUp = () => (ring.dataset.down = 'false')

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={trailRef} className="text-leaf" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
