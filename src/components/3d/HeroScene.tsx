'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Wireframe icosahedron with glowing edges ──────────────────────────────
function WireframeIcosahedron({
  mouseX,
  mouseY,
}: {
  mouseX: number
  mouseY: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Build EdgesGeometry once from the icosahedron
  const edges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 1)
    return new THREE.EdgesGeometry(geo)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.rotation.x = t * 0.13 + mouseY * 0.15
    groupRef.current.rotation.y = t * 0.18 + mouseX * 0.2

    // Subtle pulsing scale
    const pulse = 1 + Math.sin(t * 0.8) * 0.03
    groupRef.current.scale.setScalar(pulse)
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.85} />
      </lineSegments>
      {/* Inner solid with very low opacity — gives depth */}
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#001a1f"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// ─── Floating particle field ───────────────────────────────────────────────
function Particles({
  count,
  mouseX,
  mouseY,
}: {
  count: number
  mouseX: number
  mouseY: number
}) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate positions once
  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18
      speeds[i]  = 0.1 + Math.random() * 0.3
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, speeds, offsets }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime

    // Drift the whole field slowly with mouse parallax
    pointsRef.current.rotation.y = t * 0.025 + mouseX * 0.08
    pointsRef.current.rotation.x = mouseY * 0.06

    // Animate individual particles vertically (float effect)
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      posAttr.setY(
        i,
        positions[i * 3 + 1] + Math.sin(t * speeds[i] + offsets[i]) * 0.4,
      )
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
        size={0.06}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Secondary magenta accent particles ───────────────────────────────────
function AccentParticles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff00e5"
        size={0.04}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Camera rig — smoothly follows mouse ──────────────────────────────────
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  const targetX = useRef(0)
  const targetY = useRef(0)

  useFrame(() => {
    // Lerp toward target for smooth camera drift
    targetX.current += (mouseX * 0.6 - targetX.current) * 0.05
    targetY.current += (mouseY * 0.4 - targetY.current) * 0.05

    camera.position.x = targetX.current
    camera.position.y = targetY.current
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Public component ──────────────────────────────────────────────────────
interface HeroSceneProps {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

export default function HeroScene({ mouseX, mouseY, isMobile }: HeroSceneProps) {
  const particleCount = isMobile ? 60 : 200
  const accentCount   = isMobile ? 20 : 60

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? 1 : [1, 2]}
      style={{ background: 'transparent' }}
    >
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <WireframeIcosahedron mouseX={mouseX} mouseY={mouseY} />
      <Particles count={particleCount} mouseX={mouseX} mouseY={mouseY} />
      {!isMobile && <AccentParticles count={accentCount} />}
    </Canvas>
  )
}
