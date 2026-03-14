'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ShapeType } from '@/lib/types'

function WireShape({ shapeType, hovered }: { shapeType: ShapeType; hovered: boolean }) {
  const meshRef = useRef<THREE.LineSegments>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const speed = hovered ? 1.4 : 0.4
    meshRef.current.rotation.y += delta * speed * 0.6
    meshRef.current.rotation.x += delta * speed * 0.25
  })

  const geometry = (() => {
    switch (shapeType) {
      case 'dodecahedron': return new THREE.DodecahedronGeometry(1.4)
      case 'box':          return new THREE.BoxGeometry(1.8, 1.8, 1.8)
      case 'octahedron':   return new THREE.OctahedronGeometry(1.6)
      case 'cone':         return new THREE.ConeGeometry(1.2, 2.4, 6)
    }
  })()

  const edges = new THREE.EdgesGeometry(geometry)

  return (
    <lineSegments ref={meshRef} geometry={edges}>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.75} />
    </lineSegments>
  )
}

interface Props {
  shapeType: ShapeType
}

export default function ProjectShape({ shapeType }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <WireShape shapeType={shapeType} hovered={hovered} />
      </Canvas>
    </div>
  )
}
