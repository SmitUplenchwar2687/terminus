'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// ─── Planet ────────────────────────────────────────────────────────────────
function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!planetRef.current) return
    planetRef.current.rotation.y = state.clock.elapsedTime * 0.06
  })

  return (
    <group>
      {/* Core planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1a0845"
          emissive="#3b0f8c"
          emissiveIntensity={0.35}
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Inner atmosphere — soft violet haze on the backside */}
      <mesh>
        <sphereGeometry args={[2.25, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer haze — blue tint */}
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbit ring — tilted like Saturn, inner belt */}
      <mesh rotation={[Math.PI / 2.2, 0.2, 0.15]}>
        <ringGeometry args={[3.1, 4.0, 80]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer diffuse ring trace */}
      <mesh rotation={[Math.PI / 2.2, 0.2, 0.15]}>
        <ringGeometry args={[4.1, 4.6, 80]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.07}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// ─── Asteroids ─────────────────────────────────────────────────────────────
const ASTEROID_DATA: Array<{
  pos: [number, number, number]
  scale: number
  speed: number
  axis: [number, number, number]
}> = [
  { pos: [-5.2,  1.8, -3.0], scale: 0.14, speed: 0.4,  axis: [1, 1, 0] },
  { pos: [ 5.8, -1.2, -3.5], scale: 0.09, speed: 0.65, axis: [0, 1, 1] },
  { pos: [-4.5, -2.5,  2.0], scale: 0.11, speed: 0.28, axis: [1, 0, 1] },
  { pos: [ 4.0,  2.8, -1.5], scale: 0.08, speed: 0.9,  axis: [1, 1, 1] },
]

function Asteroid({
  position,
  scale,
  speed,
  axis,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  axis: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  const axisVec = useMemo(() => new THREE.Vector3(...axis).normalize(), [axis])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotateOnAxis(axisVec, speed * delta)
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#4c1d95"
        emissive="#2d1060"
        emissiveIntensity={0.2}
        roughness={0.9}
      />
    </mesh>
  )
}

// ─── Camera rig — gentle mouse parallax ────────────────────────────────────
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  const tx = useRef(0)
  const ty = useRef(0)

  useFrame(() => {
    tx.current += (mouseX * 0.7 - tx.current) * 0.04
    ty.current += (mouseY * 0.45 - ty.current) * 0.04
    camera.position.x = tx.current
    camera.position.y = ty.current
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
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? 1 : [1, 2]}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 4, 4]}  color="#c4b5fd" intensity={1.2} />
      <pointLight      position={[-5, 3, -3]} color="#f9a8d4" intensity={0.6} />
      <pointLight      position={[4, -4, 2]}  color="#60a5fa" intensity={0.4} />

      {/* Background starfield */}
      <Stars
        radius={120}
        depth={55}
        count={isMobile ? 1000 : 2500}
        factor={5}
        saturation={0.3}
        fade
        speed={0.6}
      />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <Planet />

      {!isMobile && ASTEROID_DATA.map((a, i) => (
        <Asteroid key={i} position={a.pos} scale={a.scale} speed={a.speed} axis={a.axis} />
      ))}
    </Canvas>
  )
}
