'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/** next/image with a skeleton shimmer and a blur-to-sharp fade once loaded. */
export function PlantImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <span aria-hidden className="skeleton absolute inset-0" />}
      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        className={cn(
          'transition-[filter,opacity,scale] duration-700 ease-out',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-xl',
          className,
        )}
      />
    </>
  )
}
