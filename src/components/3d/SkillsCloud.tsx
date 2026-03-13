'use client'
import { useRef, useEffect, useMemo } from 'react'
import { SKILLS, CATEGORY_COLORS } from '@/lib/constants'

// Fibonacci sphere — same math as before, but returns unit-sphere coords [−1, 1]
function fibonacciSphere(count: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
  })
}

/**
 * CSS 3D spherical tag cloud.
 *
 * Why not WebGL Text: Drei's <Text> uses SDF fonts loaded at runtime — they
 * render as antialiased WebGL geometry that looks blurry at typical sizes.
 * DOM text is always crisp, uses our actual fonts, and supports real
 * text-shadow glow. The sphere rotation is handled via requestAnimationFrame
 * + CSS transform on each tag.
 */
export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef({ y: 0, x: 0.12 })
  const rafRef = useRef<number>()

  // Unit-sphere positions, computed once
  const unitPositions = useMemo(() => fibonacciSphere(SKILLS.length), [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tags = Array.from(container.querySelectorAll<HTMLElement>('.skill-node'))

    // Size the sphere to 45% of the container's smallest dimension
    const getRadius = () => Math.min(container.offsetWidth, container.offsetHeight) * 0.42

    const animate = () => {
      angleRef.current.y += 0.0035
      angleRef.current.x += 0.0008

      const R = getRadius()
      const cosY = Math.cos(angleRef.current.y)
      const sinY = Math.sin(angleRef.current.y)
      const cosX = Math.cos(angleRef.current.x)
      const sinX = Math.sin(angleRef.current.x)

      tags.forEach((tag, i) => {
        const { x: ox, y: oy, z: oz } = unitPositions[i]

        // Rotate around Y axis
        const x1 = ox * cosY - oz * sinY
        const z1 = ox * sinY + oz * cosY

        // Rotate around X axis
        const y2 = oy * cosX - z1 * sinX
        const z2 = oy * sinX + z1 * cosX

        // z2 ∈ [−1, 1] → depth cues
        const depth = (z2 + 1) / 2 // [0 = back, 1 = front]

        const px = x1 * R
        const py = y2 * R

        // Perspective: front tags are bigger and fully opaque
        const scale  = 0.65 + depth * 0.55
        const opacity = 0.25 + depth * 0.75

        tag.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px)`
        tag.style.opacity    = opacity.toFixed(3)
        tag.style.scale      = scale.toFixed(3)
        tag.style.zIndex     = String(Math.round(depth * 100))
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [unitPositions])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* The sphere container — tags are positioned absolute from its centre */}
      <div ref={containerRef} className="relative w-full h-full">
        {SKILLS.map((skill) => (
          <span
            key={skill.name}
            className="skill-node absolute left-1/2 top-1/2 font-mono whitespace-nowrap cursor-default select-none"
            style={{
              color: CATEGORY_COLORS[skill.category],
              textShadow: `0 0 10px ${CATEGORY_COLORS[skill.category]}cc, 0 0 20px ${CATEGORY_COLORS[skill.category]}66`,
              letterSpacing: '0.1em',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '3px 8px',
              // Subtle dark pill behind each tag for extra legibility
              background: `${CATEGORY_COLORS[skill.category]}12`,
              border: `1px solid ${CATEGORY_COLORS[skill.category]}30`,
              borderRadius: '2px',
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
