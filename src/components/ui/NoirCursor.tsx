'use client'
import { useEffect, useRef } from 'react'

export default function NoirCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let cx = 0, cy = 0
    let tx = 0, ty = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      cursor.style.left = `${cx}px`
      cursor.style.top = `${cy}px`
      raf = requestAnimationFrame(loop)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor-grow]')) cursor.classList.add('grow')
    }
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor-grow]')) cursor.classList.remove('grow')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return <div ref={cursorRef} className="noir-cursor" aria-hidden />
}
