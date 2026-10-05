'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Leaf } from '@/components/Leaf'

const KEY = 'flora-intro-seen'

/** Full-screen leaf draws itself, then the curtain wipes upward. Plays once per session. */
export function IntroLoader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduce || sessionStorage.getItem(KEY)) {
      setShow(false)
      return
    }
    sessionStorage.setItem(KEY, '1')
    const id = window.setTimeout(() => setShow(false), 2400)
    return () => window.clearTimeout(id)
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <Leaf size={120} animate speed={1.4} className="text-leaf" strokeWidth={1.2} />
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Flora Explorer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
