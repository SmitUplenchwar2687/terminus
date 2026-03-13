'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Nebula cluster data: position offset, sphere size, color, opacity, phase
const CLUSTERS: Array<{
  offset: [number, number, number]
  size: number
  color: string
  opacity: number
  phase: number
  speed: number
}> = [
  { offset: [ 0,     0,    0   ], size: 0.95, color: '#7c3aed', opacity: 0.12, phase: 0,    speed: 0.4  },
  { offset: [ 0.45,  0.3,  0.2 ], size: 0.75, color: '#f472b6', opacity: 0.10, phase: 1.2,  speed: 0.55 },
  { offset: [-0.35,  0.25,-0.15], size: 0.65, color: '#60a5fa', opacity: 0.10, phase: 2.4,  speed: 0.35 },
  { offset: [ 0.1,  -0.45, 0.35], size: 0.55, color: '#a78bfa', opacity: 0.13, phase: 0.8,  speed: 0.6  },
  { offset: [-0.4,  -0.2,  0.25], size: 0.4,  color: '#f9a8d4', opacity: 0.08, phase: 3.0,  speed: 0.45 },
  { offset: [ 0.3,   0.5, -0.3 ], size: 0.5,  color: '#c084fc', opacity: 0.09, phase: 1.8,  speed: 0.5  },
]

function NebulaSphere({
  offsetProp,
  size,
  color,
  baseOpacity,
  phase,
  speed,
}: {
  offsetProp: [number, number, number]
  size: number
  color: string
  baseOpacity: number
  phase: number
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => new THREE.Vector3(...offsetProp), [offsetProp])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    // Breathe: scale pulses gently
    const breathe = 1 + Math.sin(t * speed + phase) * 0.12
    meshRef.current.scale.setScalar(breathe)
    // Drift: small orbital float
    meshRef.current.position.set(
      offset.x + Math.sin(t * 0.3 + phase) * 0.08,
      offset.y + Math.cos(t * 0.25 + phase) * 0.08,
      offset.z,
    )
    // Opacity flicker
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = baseOpacity * (0.8 + Math.sin(t * speed * 1.3 + phase) * 0.2)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={baseOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function NebulaCloud() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    // Slow overall rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.06
  })

  return (
    <group ref={groupRef}>
      {CLUSTERS.map((c, i) => (
        <NebulaSphere
          key={i}
          offsetProp={c.offset}
          size={c.size}
          color={c.color}
          baseOpacity={c.opacity}
          phase={c.phase}
          speed={c.speed}
        />
      ))}
    </group>
  )
}

export default function AboutOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <NebulaCloud />
    </Canvas>
  )
}
