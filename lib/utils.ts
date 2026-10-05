import { useEffect, useRef } from 'react'
import { cn } from './utils'

/**
 * Custom hook to debounce a value
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const handler = useRef<NodeJS.Timeout | null>(null)
  
  // Update the debounced value after delay
  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current)
    }
    
    handler.current = setTimeout(() => {
      // No-op, just to trigger the cleanup
    }, delay)
    
    return () => {
      if (handler.current) {
        clearTimeout(handler.current)
      }
    }
  }, [value, delay])
  
  // Return the debounced value (updated after delay)
  const debouncedRef = useRef<T>(value)
  
  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current)
    }
    
    handler.current = setTimeout(() => {
      debouncedRef.current = value
    }, delay)
    
    return () => {
      if (handler.current) {
        clearTimeout(handler.current)
      }
    }
  }, [value, delay])
  
  return debouncedRef.current
}

/**
 * Utility function to conditionally join class names
 * Copied from shadcn/ui for consistency
 */
export function cn(...inputs: (string | undefined | false | null | true)[]) {
  return inputs.filter(Boolean).join(' ')
}