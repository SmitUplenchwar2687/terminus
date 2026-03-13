'use client'
import { useRef, useEffect } from 'react'
import { CATEGORY_COLORS } from '@/lib/constants'

/**
 * Orbital ring skill cloud — 3 concentric rings of skills each rotating
 * at a different speed, tilted to give the feel of looking at a solar
 * system from a slight angle.
 *
 * Pure CSS/DOM approach: DOM text is crisp at any resolution and supports
 * real text-shadow glow. requestAnimationFrame drives the rotation.
 */

interface RingDef {
  label: string
  skills: Array<{ name: string; color: string }>
  radius: number   // px from centre
  speed: number    // radians per frame
  tilt: number     // degrees, perspective tilt of the ring
  ringColor: string
}

const RINGS: RingDef[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Go',     color: CATEGORY_COLORS.language  },
      { name: 'Python', color: CATEGORY_COLORS.language  },
      { name: 'React',  color: CATEGORY_COLORS.frontend  },
    ],
    radius: 92,
    speed:  0.0055,
    tilt:   68,
    ringColor: 'rgba(167,139,250,0.14)',
  },
  {
    label: 'Infrastructure',
    skills: [
      { name: 'gRPC',       color: CATEGORY_COLORS.infrastructure },
      { name: 'Docker',     color: CATEGORY_COLORS.infrastructure },
      { name: 'Kubernetes', color: CATEGORY_COLORS.infrastructure },
      { name: 'AWS',        color: CATEGORY_COLORS.infrastructure },
      { name: 'PostgreSQL', color: CATEGORY_COLORS.database       },
      { name: 'Redis',      color: CATEGORY_COLORS.database       },
    ],
    radius: 178,
    speed:  0.0028,
    tilt:   72,
    ringColor: 'rgba(96,165,250,0.12)',
  },
  {
    label: 'AI & Systems',
    skills: [
      { name: 'Kafka',          color: CATEGORY_COLORS.infrastructure },
      { name: 'Raft Consensus', color: CATEGORY_COLORS.distributed    },
      { name: 'LangChain',      color: CATEGORY_COLORS.ai             },
      { name: 'Firebase',       color: CATEGORY_COLORS.database       },
      { name: 'Git',            color: CATEGORY_COLORS.tooling        },
    ],
    radius: 258,
    speed:  0.0014,
    tilt:   75,
    ringColor: 'rgba(244,114,182,0.10)',
  },
]

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const anglesRef    = useRef(RINGS.map(() => 0))
  const rafRef       = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Collect all tag elements per ring
    const ringEls = RINGS.map((ring) =>
      Array.from(container.querySelectorAll<HTMLElement>(
        `[data-ring="${ring.label}"]`
      ))
    )

    const animate = () => {
      // Scale radii to container size (max 45% of the smaller dimension)
      const W = container.offsetWidth
      const H = container.offsetHeight
      const scale = Math.min(W, H) / 560 // 560 is the "design radius" reference

      RINGS.forEach((ring, ri) => {
        anglesRef.current[ri] += ring.speed
        const angle  = anglesRef.current[ri]
        const tiltRad = (ring.tilt * Math.PI) / 180
        const R = ring.radius * scale

        ringEls[ri].forEach((el, si) => {
          const n = ringEls[ri].length
          const a = angle + (si / n) * Math.PI * 2
          const x = Math.cos(a) * R
          // y is foreshortened by the tilt (simulates looking at ring from above)
          const y = Math.sin(a) * R * Math.cos(tiltRad)
          // z depth for opacity / scale cues
          const z = Math.sin(a) // [-1, 1]

          const depth   = (z + 1) / 2  // [0 = far, 1 = near]
          const opacity = 0.3 + depth * 0.7
          const sz      = 0.7 + depth * 0.4

          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
          el.style.opacity   = opacity.toFixed(3)
          el.style.scale     = sz.toFixed(3)
          el.style.zIndex    = String(Math.round(depth * 100))
        })
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative w-full h-full">
        {/* Decorative ring ellipses */}
        {RINGS.map((ring) => (
          <div
            key={ring.label + '-ring'}
            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
            style={{
              width:    ring.radius * 2,
              height:   ring.radius * 2 * Math.cos((ring.tilt * Math.PI) / 180),
              border:   `1px solid ${ring.ringColor}`,
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />
        ))}

        {/* Skill tags */}
        {RINGS.map((ring) =>
          ring.skills.map((skill) => (
            <span
              key={skill.name}
              data-ring={ring.label}
              className="absolute left-1/2 top-1/2 font-mono whitespace-nowrap cursor-default select-none"
              style={{
                color:      skill.color,
                textShadow: `0 0 10px ${skill.color}bb, 0 0 22px ${skill.color}55`,
                fontSize:   '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                padding:    '3px 9px',
                background: `${skill.color}10`,
                border:     `1px solid ${skill.color}28`,
                borderRadius: '4px',
              }}
            >
              {skill.name}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
