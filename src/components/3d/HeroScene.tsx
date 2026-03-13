'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HeroSceneProps {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

function TorusKnot({
  mouseX,
  mouseY,
}: Pick<HeroSceneProps, 'mouseX' | 'mouseY'>) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const t = state.clock.elapsedTime
    meshRef.current.rotation.x += ((mouseY * 0.22 + t * 0.12) - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += ((mouseX * 0.32 + t * 0.2) - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.z = t * 0.08
  })

  return (
    <mesh ref={meshRef} scale={1.55}>
      <torusKnotGeometry args={[1, 0.28, 220, 28]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function HeroScene({ mouseX, mouseY, isMobile }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? 1 : [1, 2]}
      style={{ background: 'transparent' }}
    >
      <TorusKnot mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
