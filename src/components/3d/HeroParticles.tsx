'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT_DESKTOP = 500
const PARTICLE_COUNT_MOBILE = 150
const CONNECTION_THRESHOLD = 1.8
const SPREAD_X = 14
const SPREAD_Y = 1.5
const SPREAD_Z = 10

function ParticleNetwork({ count, showLines }: { count: number; showLines: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  const { positions, linePositions, lineCount } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD_X * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z * 2
    }

    const lines: number[] = []
    if (showLines) {
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECTION_THRESHOLD) {
            lines.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
            lines.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
          }
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
      lineCount: lines.length / 6,
    }
  }, [count, showLines])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00f0ff" size={0.04} transparent opacity={0.4} sizeAttenuation />
      </points>

      {showLines && lineCount > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00f0ff" transparent opacity={0.06} />
        </lineSegments>
      )}
    </group>
  )
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04
    camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

interface Props {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

export default function HeroParticles({ mouseX, mouseY, isMobile }: Props) {
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <fogExp2 attach="fog" args={['#000000', 0.04]} />
      <ParticleNetwork count={count} showLines={!isMobile} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      {!isMobile && (
        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
