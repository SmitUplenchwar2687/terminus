'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Shooting stars — horizontal streaks rendered as THREE.LineSegments.
 * Each star is a line segment from (x-length, y, z) to (x, y, z) that
 * moves rightward and wraps when it exits the frame.
 */

const STAR_COUNT = 38

interface StarState {
  x:      number
  y:      number
  z:      number
  vx:     number   // speed (units/s)
  length: number   // streak length
}

function ShootingStars() {
  const linesRef = useRef<THREE.LineSegments>(null)

  const stars = useRef<StarState[]>(
    Array.from({ length: STAR_COUNT }, () => ({
      x:      (Math.random() - 0.5) * 26,
      y:      (Math.random() - 0.5) * 7,
      z:      (Math.random() - 0.5) * 5,
      vx:     1.8 + Math.random() * 5,
      length: 0.35 + Math.random() * 1.1,
    }))
  )

  // 2 vertices × 3 floats per star
  const positions = useMemo(() => new Float32Array(STAR_COUNT * 6), [])

  useFrame((_, delta) => {
    if (!linesRef.current) return
    const posAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    stars.current.forEach((star, i) => {
      star.x += star.vx * delta
      if (star.x > 14) {
        star.x      = -14
        star.y      = (Math.random() - 0.5) * 7
        star.vx     = 1.8 + Math.random() * 5
        star.length = 0.35 + Math.random() * 1.1
      }

      const b = i * 6
      // Tail (dim end)
      arr[b]     = star.x - star.length
      arr[b + 1] = star.y
      arr[b + 2] = star.z
      // Head (bright end)
      arr[b + 3] = star.x
      arr[b + 4] = star.y
      arr[b + 5] = star.z
    })

    posAttr.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#c4b5fd" transparent opacity={0.65} />
    </lineSegments>
  )
}

// Faint distant star points for depth
function DistantStars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 28
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e2e8f0" size={0.04} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

export default function ParticleWave() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ShootingStars />
      <DistantStars />
    </Canvas>
  )
}
