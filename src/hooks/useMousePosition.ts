'use client'
import { useState, useEffect } from 'react'

interface MousePosition {
  x: number // normalized [-1, 1], 0 = center
  y: number // normalized [-1, 1], 0 = center (y flipped: up is positive)
}

/**
 * Tracks mouse position and returns normalized [-1, 1] coordinates.
 * Used to drive subtle camera parallax in 3D scenes.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        // Flip y so moving mouse up → positive y (matches 3D camera convention)
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
