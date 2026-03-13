'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ'

interface HeroSceneProps {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

interface ColumnDef {
  text: string
  x: number
  y: number
  z: number
  speed: number
}

function buildColumn(length: number) {
  return Array.from({ length }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join('\n')
}

function CameraRig({ mouseX, mouseY }: Pick<HeroSceneProps, 'mouseX' | 'mouseY'>) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04
    camera.position.y += (mouseY * 0.45 - camera.position.y) * 0.04
    camera.lookAt(0, 0, -8)
  })

  return null
}

function MatrixRain({ isMobile }: Pick<HeroSceneProps, 'isMobile'>) {
  const refs = useRef<Array<THREE.Group | null>>([])
  const columns = useMemo<ColumnDef[]>(
    () =>
      Array.from({ length: isMobile ? 34 : 68 }, (_, index) => ({
        text: buildColumn(12 + Math.floor(Math.random() * 15)),
        x: -8 + index * 0.24,
        y: Math.random() * 18 - 9,
        z: -10 + Math.random() * 6,
        speed: 1.8 + Math.random() * 2.2,
      })),
    [isMobile]
  )

  useFrame((_, delta) => {
    columns.forEach((column, index) => {
      column.y -= column.speed * delta
      if (column.y < -12) {
        column.y = 12 + Math.random() * 4
      }

      const group = refs.current[index]
      if (!group) return
      group.position.y = column.y
    })
  })

  return (
    <group>
      {columns.map((column, index) => (
        <group
          key={index}
          ref={(node) => {
            refs.current[index] = node
          }}
          position={[column.x, column.y, column.z]}
        >
          <Text
            color={index % 4 === 0 ? '#39ff14' : '#00ff41'}
            fontSize={0.22}
            lineHeight={1.05}
            anchorX="center"
            anchorY="top"
            maxWidth={1}
          >
            {column.text}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default function HeroScene({ mouseX, mouseY, isMobile }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? 1 : [1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 2]} color="#00ff41" intensity={0.8} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <MatrixRain isMobile={isMobile} />
    </Canvas>
  )
}
