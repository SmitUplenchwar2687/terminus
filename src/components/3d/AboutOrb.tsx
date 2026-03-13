'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OctahedronWireframe() {
  const groupRef = useRef<THREE.Group>(null)

  const edges = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1.4, 0)
    return new THREE.EdgesGeometry(geo)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.x = t * 0.4
    groupRef.current.rotation.y = t * 0.6
    groupRef.current.rotation.z = t * 0.2
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </lineSegments>
      {/* Inner faces — very subtle */}
      <mesh>
        <octahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
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
      <OctahedronWireframe />
    </Canvas>
  )
}
