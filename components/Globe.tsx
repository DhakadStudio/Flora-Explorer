'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import land10m from 'world-atlas/land-10m.json'
const worldAtlas = { land: land10m }
import { useLanguage } from '@/components/providers/language-provider'
import { Plant } from '@/data/plants'
import { Leaf } from '@/components/Leaf'
import { CountUp } from '@/components/count-up'
import { cn } from '@/lib/utils'

type GlobeProps = {
  plant: Plant
  className?: string
}

export function Globe({ plant, className }: GlobeProps) {
  const { t, lang } = useLanguage()
  const globeRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [rotating, setRotating] = useState(true)
  const [hoveredCountry, setHoveredCountry] = useState<null | { iso: number; name: string; status: string; note: string; sharePercent?: number }>(null)

  useEffect(() => {
    if (!globeRef.current) return

    const globeElement = globeRef.current
    const width = globeElement.clientWidth
    const height = globeElement.clientHeight
    
    // Use devicePixelRatio capped at 2 for performance
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    
    // Set up the canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    context.scale(pixelRatio, pixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    globeElement.appendChild(canvas)
    
    // Set up the globe
    const projection = d3.geoOrthographic()
      .scale(Math.min(width, height) / 2 - 10)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate([0, 0]) // Will be updated to center on native region
    
    const path = d3.geoPath(projection, context)
    
    // Load world data
    const { land } = worldAtlas
    const landFeature = feature(land, land.objects.land)
    
    // Get country data for shading
    const countryShades = new Map<number, string>() // iso -> shade color
    plant.geography.countries.forEach((country) => {
      let shade = ''
      switch (country.status) {
        case 'native':
          shade = 'rgba(74, 222, 128, 0.8)' // Bright green
          break
        case 'major':
          shade = 'rgba(34, 197, 94, 0.9)' // Solid green
          break
        case 'cultivated':
          shade = 'rgba(52, 211, 153, 0.6)' // Faded green
          break
        default:
          shade = 'rgba(148, 163, 184, 0.3)' // Neutral
      }
      countryShades.set(country.iso, shade)
    })
    
    // Find the native center for initial rotation
    const nativeCenter = plant.geography.nativeCenter
    const [nativeLon, nativeLat] = nativeCenter
    
    // Set initial rotation to center on native region
    projection.rotate([-nativeLon, -nativeLat])
    
    // Animation state
    let animationFrame: number | null = null
    let lastTime = 0
    let autoRotateAngle = 0
    let isDragging = false
    let dragStart: [number, number] = [0, 0]
    let rotationStart: [number, number] = [0, 0]
    
    // Handle reduced motion
    const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const drawGlobe = (timestamp: number) => {
      if (!context) return
      
      if (!lastTime) lastTime = timestamp
      const elapsed = timestamp - lastTime
      
      // Clear canvas
      context.clearRect(0, 0, width, height)
      
      // Draw ocean
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2 - 1, 0, Math.PI * 2)
      context.fillStyle = 'rgba(10, 10, 10, 0.1)'
      context.fill()
      
      // Draw land
      context.beginPath()
      path(landFeature)
      context.fillStyle = 'rgba(20, 20, 20, 0.6)'
      context.fill()
      
      // Draw country shades
      if (land.objects.countries) {
        const countries = feature(land, land.objects.countries)
        countries.features.forEach((feature: any) => {
          const iso = parseInt(feature.id)
          const shade = countryShades.get(iso)
          
          if (shade) {
            context.beginPath()
            path(feature)
            context.fillStyle = shade
            context.fill()
            
            // Pulse effect for hovered country
            if (hoveredCountry && hoveredCountry.iso === iso && !reduceMotion) {
              const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 0.9
              context.save()
              context.filter = `blur(${2 * (1 - pulse)}px)`
              context.fillStyle = shade
              context.fill()
              context.restore()
            }
          }
        })
      }
      
      // Draw graticule (faint grid lines)
      if (!reduceMotion) {
        const graticule = d3.geoGraticule10()
        context.beginPath()
        path(graticule)
        context.strokeStyle = 'rgba(255, 255, 255, 0.05)'
        context.lineWidth = 0.5
        context.stroke()
      }
      
      // Draw atmosphere glow
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2 + 2, 0, Math.PI * 2)
      context.fillStyle = reduceMotion 
        ? 'transparent' 
        : 'radial-gradient(circle at center, transparent 70%, rgba(74, 222, 128, 0.1) 100%)'
      context.fill()
      
      lastTime = timestamp
      if (rotating && !isDragging && !reduceMotion) {
        // Slow auto-rotation
        autoRotateAngle += 0.0002
        projection.rotate([-nativeLon + autoRotateAngle, -nativeLat])
        animationFrame = requestAnimationFrame(drawGlobe)
      } else if (isDragging || reduceMotion) {
        animationFrame = requestAnimationFrame(drawGlobe)
      }
    }
    
    // Start animation
    const startAnimation = () => {
      lastTime = 0
      animationFrame = requestAnimationFrame(drawGlobe)
    }
    
    // Handle user interaction
    let pointerId: number | null = null
    
    const handlePointerDown = (e: PointerEvent) => {
      if (!context) return
      
      isDragging = true
      pointerId = e.pointerId
      
      const rect = globeElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Convert screen coordinates to globe coordinates
      const invertPoint = projection.invert([x - width / 2, y - height / 2])
      if (invertPoint) {
        dragStart = [invertPoint[0], invertPoint[1]]
        rotationStart = projection.rotate() as [number, number]
      }
      
      globeElement.setPointerCapture(e.pointerId)
      e.preventDefault()
    }
    
    const handlePointerMove = (e: PointerEvent) => {
      if (!context || pointerId !== e.pointerId || !isDragging) return
      
      e.preventDefault()
      
      const rect = globeElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const invertPoint = projection.invert([x - width / 2, y - height / 2])
      if (invertPoint) {
        const currentPoint = [invertPoint[0], invertPoint[1]]
        const dx = currentPoint[0] - dragStart[0]
        const dy = currentPoint[1] - dragStart[1]
        
        // Apply rotation
        const newRotation: [number, number] = [
          rotationStart[0] + dx * 2,
          rotationStart[1] + dy * 2
        ]
        projection.rotate(newRotation)
      }
    }
    
    const handlePointerUp = (e: PointerEvent) => {
      if (pointerId === e.pointerId) {
        isDragging = false
        pointerId = null
        globeElement.releasePointerCapture(e.pointerId)
      }
    }
    
    const handlePointerLeave = () => {
      isDragging = false
      pointerId = null
    }
    
    // Handle click/tap to select country
    const handlePointerClick = async (e: PointerEvent) => {
      if (!context || isDragging) return
      
      isDragging = false
      pointerId = null
      
      const rect = globeElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Check if click is on land
      const invertPoint = projection.invert([x - width / 2, y - height / 2])
      if (invertPoint) {
        // In a real implementation, we'd check which country was clicked
        // For now, we'll just toggle the info panel
        setRotating(false)
        // In a full implementation, we'd determine which country was clicked
        // and set the hoveredCountry state accordingly
      }
    }
    
    // Handle wheel for zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 1.05 : 0.95
      const scale = projection.scale()
      projection.scale(Math.max(50, Math.min(150, scale * delta)))
    }
    
    // Add event listeners
    globeElement.addEventListener('pointerdown', handlePointerDown)
    globeElement.addEventListener('pointermove', handlePointerMove)
    globeElement.addEventListener('pointerup', handlePointerUp)
    globeElement.addEventListener('pointerleave', handlePointerLeave)
    globeElement.addEventListener('click', handlePointerClick)
    globeElement.addEventListener('wheel', handleWheel, { passive: false })
    
    // Start with a brief auto-rotation to show the native region, then settle
    setTimeout(() => {
      setRotating(false)
      // Animate to center on native region over 2 seconds
      const startRotation = projection.rotate()
      const targetRotation: [number, number] = [-nativeLon, -nativeLat]
      
      let startTime: number | null = null
      const animateToCenter = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / 2000, 1) // 2 seconds
        
        const currentRotation: [number, number] = [
          startRotation[0] + (targetRotation[0] - startRotation[0]) * progress,
          startRotation[1] + (targetRotation[1] - startRotation[1]) * progress
        ]
        
        projection.rotate(currentRotation)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateToCenter)
        }
      }
      
      animationFrame = requestAnimationFrame(animateToCenter)
    }, 1000)
    
    startAnimation()
    
    // Cleanup
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      globeElement.removeEventListener('pointerdown', handlePointerDown)
      globeElement.removeEventListener('pointermove', handlePointerMove)
      globeElement.removeEventListener('pointerup', handlePointerUp)
      globeElement.removeEventListener('pointerleave', handlePointerLeave)
      globeElement.removeEventListener('click', handlePointerClick)
      globeElement.removeEventListener('wheel', handleWheel)
    }
  }, [plant, t, lang])
  
  if (!isLoaded) {
    return (
      <div className={cn('aspect-square w-full', className)}>
        <div className="flex h-full w-full items-center justify-center bg-muted/50">
          <Leaf className="h-8 w-8 animate leaf-spin" />
          <p className="ml-3 font-mono text-xs">{t('common.loading')}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn('aspect-square w-full relative', className)}>
      {/* Globe container - the actual canvas is added via useEffect */}
      <div className="absolute inset-0" />
      
      {/* Country info panel */}
      {hoveredCountry && !rotating && (
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 md:w-80">
          <div className="bg-background/80 backdrop-blur rounded-3xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-medium tracking-tight">{hoveredCountry.name}</h3>
              <Leaf className="h-5 w-5" onClick={() => setHoveredCountry(null)} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-mono text-xs uppercase tracking-[0.2em]">{t('globe.status')}</span>
                <span className="ml-2">{t(`globe.${hoveredCountry.status}`)}</span>
              </div>
              {hoveredCountry.sharePercent !== undefined && (
                <div className="flex">
                  <span className="font-mono text-xs uppercase tracking-[0.2em]">{t('globe.share')}</span>
                  <span className="ml-2">{hoveredCountry.sharePercent}%</span>
                </div>
              )}
              {hoveredCountry.note && (
                <div className="flex">
                  <span className="font-mono text-xs uppercase tracking-[0.2em]">{t('globe.notes')}</span>
                  <span className="ml-2">{hoveredCountry.note}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col items-start gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span>{t('globe.native')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600/90" />
          <span>{t('globe.major')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
          <span>{t('globe.cultivated')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400/30" />
          <span>{t('globe.na')}</span>
        </div>
      </div>
    </div>
  )
}