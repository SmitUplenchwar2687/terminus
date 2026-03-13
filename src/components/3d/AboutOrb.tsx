'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.18
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#00ff41" wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.01, 12, 72]} />
        <meshBasicMaterial color="#0a3d0a" />
      </mesh>
    </group>
  )
}

export default function AboutOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <WireGlobe />
    </Canvas>
  )
}
