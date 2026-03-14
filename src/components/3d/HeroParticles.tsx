'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT_DESKTOP = 500
const PARTICLE_COUNT_MOBILE = 300
const CONNECTION_THRESHOLD = 1.8
const SPREAD_X = 14
const SPREAD_Y = 1.5
const SPREAD_Z = 10
const SPHERE_R = 4

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function ParticleNetwork({
  count,
  showLines,
  scrollProgressRef,
}: {
  count: number
  showLines: boolean
  scrollProgressRef: MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)

  const { basePositions, spherePositions, livePositions, linePositions, lineCount } = useMemo(() => {
    // Random constellation layout
    const base = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      base[i * 3]     = (Math.random() - 0.5) * SPREAD_X * 2
      base[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2
      base[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z * 2
    }

    // Fibonacci sphere layout
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const sphere = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = goldenAngle * i
      sphere[i * 3]     = Math.cos(theta) * r * SPHERE_R
      sphere[i * 3 + 1] = y * SPHERE_R
      sphere[i * 3 + 2] = Math.sin(theta) * r * SPHERE_R
    }

    // Mutable live positions (start as copy of base)
    const live = new Float32Array(base)

    // Static connection lines from base layout
    const lines: number[] = []
    if (showLines) {
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = base[i * 3] - base[j * 3]
          const dy = base[i * 3 + 1] - base[j * 3 + 1]
          const dz = base[i * 3 + 2] - base[j * 3 + 2]
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECTION_THRESHOLD) {
            lines.push(base[i * 3], base[i * 3 + 1], base[i * 3 + 2])
            lines.push(base[j * 3], base[j * 3 + 1], base[j * 3 + 2])
          }
        }
      }
    }

    return {
      basePositions: base,
      spherePositions: sphere,
      livePositions: live,
      linePositions: new Float32Array(lines),
      lineCount: lines.length / 6,
    }
  }, [count, showLines])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06

    const scroll = scrollProgressRef.current

    // Fade particles as user scrolls past 75%
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      const targetOpacity = scroll < 0.75 ? 0.4 : 0.4 - ((scroll - 0.75) / 0.25) * 0.3
      mat.opacity += (targetOpacity - mat.opacity) * 0.1
    }

    // Scroll-driven position evolution
    if (geoRef.current) {
      const posAttr = geoRef.current.attributes.position as THREE.BufferAttribute | undefined
      if (!posAttr) return
      const arr = posAttr.array as Float32Array

      for (let i = 0; i < count; i++) {
        const bx = basePositions[i * 3],     by = basePositions[i * 3 + 1], bz = basePositions[i * 3 + 2]
        const sx = spherePositions[i * 3],   sy = spherePositions[i * 3 + 1], sz = spherePositions[i * 3 + 2]

        let tx: number, ty: number, tz: number

        if (scroll <= 0.5) {
          // Phase 1: base → sphere
          const t = easeInOut(scroll / 0.5)
          tx = bx + (sx - bx) * t
          ty = by + (sy - by) * t
          tz = bz + (sz - bz) * t
        } else {
          // Phase 2: sphere → dispersed (1.8× scatter)
          const t = easeInOut((scroll - 0.5) / 0.5)
          tx = sx + (bx * 1.8 - sx) * t
          ty = sy + (by * 1.8 - sy) * t
          tz = sz + (bz * 1.8 - sz) * t
        }

        // Smooth lerp toward target (avoids snap)
        arr[i * 3]     += (tx - arr[i * 3])     * 0.08
        arr[i * 3 + 1] += (ty - arr[i * 3 + 1]) * 0.08
        arr[i * 3 + 2] += (tz - arr[i * 3 + 2]) * 0.08
      }

      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
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

function CameraRig({
  mouseX,
  mouseY,
  scrollProgressRef,
}: {
  mouseX: number
  mouseY: number
  scrollProgressRef: MutableRefObject<number>
}) {
  const { camera } = useThree()
  useFrame(() => {
    const scroll = scrollProgressRef.current
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04
    camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.04
    // Pull back from z=8 to z=12 as user scrolls
    const targetZ = 8 + scroll * 4
    camera.position.z += (targetZ - camera.position.z) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

interface Props {
  mouseX: number
  mouseY: number
  isMobile: boolean
  scrollProgressRef: MutableRefObject<number>
}

export default function HeroParticles({ mouseX, mouseY, isMobile, scrollProgressRef }: Props) {
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <fogExp2 attach="fog" args={['#000000', 0.04]} />
      <ParticleNetwork count={count} showLines scrollProgressRef={scrollProgressRef} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} scrollProgressRef={scrollProgressRef} />
      {!isMobile && (
        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
