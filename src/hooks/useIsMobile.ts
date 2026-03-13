'use client'
import { useState, useEffect } from 'react'

/**
 * Returns true when viewport width is below the given breakpoint (default 768px).
 * Used to reduce particle counts and skip heavy 3D effects on mobile.
 * Defaults to false during SSR (no window object).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}
