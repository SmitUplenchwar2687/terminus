'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GRID_W = 28
const GRID_H = 10

function Wave() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, baseY } = useMemo(() => {
    const count = GRID_W * GRID_H
    const positions = new Float32Array(count * 3)
    const baseY = new Float32Array(count)

    let idx = 0
    for (let row = 0; row < GRID_H; row++) {
      for (let col = 0; col < GRID_W; col++) {
        const x = (col / (GRID_W - 1) - 0.5) * 20
        const y = (row / (GRID_H - 1) - 0.5) * 4
        const z = 0
        positions[idx * 3]     = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z
        baseY[idx] = y
        idx++
      }
    }
    return { positions, baseY }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array

    let idx = 0
    for (let row = 0; row < GRID_H; row++) {
      for (let col = 0; col < GRID_W; col++) {
        // Sine wave: col drives phase, row adds offset, time animates
        const wave = Math.sin(col * 0.4 + t * 1.2) * 0.6
              + Math.sin(col * 0.7 - t * 0.8 + row * 0.5) * 0.35
        posArr[idx * 3 + 1] = baseY[idx] + wave
        // z ripple
        posArr[idx * 3 + 2] = Math.sin(col * 0.3 + row * 0.4 + t * 0.9) * 0.4
        idx++
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f0ff"
        size={0.07}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleWave() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Wave />
    </Canvas>
  )
}
