'use client'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function NoirCursor() {
  const mouse = useMousePosition()

  return (
    <div
      className="noir-cursor"
      style={{
        left: `${(mouse.x + 1) * 50}%`,
        top: `${(1 - mouse.y) * 50}%`,
      }}
      aria-hidden="true"
    />
  )
}
