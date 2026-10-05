'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Leaf } from '@/components/Leaf'

type Toast = { id: number; message: string; tone: 'default' | 'error' }

const ToastContext = createContext<(message: string, tone?: Toast['tone']) => void>(() => {})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const toast = useCallback((message: string, tone: Toast['tone'] = 'default') => {
    const id = ++idRef.current
    setToasts((t) => [...t.slice(-2), { id, message, tone }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 md:bottom-8"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-foreground px-4 py-2.5 text-sm text-background shadow-lg"
            >
              <Leaf size={18} className={t.tone === 'error' ? 'text-destructive' : 'text-leaf'} filled />
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
