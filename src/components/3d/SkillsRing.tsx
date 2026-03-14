'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { SKILLS_RING } from '@/lib/constants'

const _worldPos = new THREE.Vector3()

function RingSkills({ compact }: { compact: boolean }) {
  const radius = compact ? 3.0 : 4.5
  const groupRef = useRef<THREE.Group>(null)
  const itemRefs = useRef<(THREE.Group | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25

    itemRefs.current.forEach((item, i) => {
      const label = labelRefs.current[i]
      if (!item || !label) return
      item.getWorldPosition(_worldPos)

      const depth = (_worldPos.z + radius) / (radius * 2)
      label.style.opacity = String(0.55 + depth * 0.45)
      label.style.transform = `scale(${0.88 + depth * 0.22})`
      label.style.pointerEvents = 'auto'
    })
  })

  return (
    <group ref={groupRef}>
      {SKILLS_RING.map((skill, i) => {
        const angle = (i / SKILLS_RING.length) * Math.PI * 2
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        return (
          <group
            key={skill}
            position={[x, 0, z]}
            ref={(el) => { itemRefs.current[i] = el }}
          >
            <Html
              center
              zIndexRange={[10, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <span
                ref={(el) => { labelRefs.current[i] = el }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: compact ? '11px' : '14px',
                  letterSpacing: '0.08em',
                  color: hoveredSkill === skill ? '#00f0ff' : '#e0e0e0',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  cursor: 'default',
                  display: 'block',
                  transformOrigin: 'center center',
                  transition: 'color 0.2s ease',
                  textShadow: hoveredSkill === skill ? '0 0 12px rgba(0,240,255,0.6)' : 'none',
                  pointerEvents: 'auto',
                }}
              >
                {skill}
              </span>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

interface Props {
  compact?: boolean
}

export default function SkillsRing({ compact = false }: Props) {
  return (
    <Canvas
      camera={{ position: compact ? [0, 2, 7] : [0, 3, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <RingSkills compact={compact} />
    </Canvas>
  )
}
