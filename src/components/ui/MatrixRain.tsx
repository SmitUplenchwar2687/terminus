'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOP'

interface Props {
  active: boolean
  onDone: () => void
}

export default function MatrixRain({ active, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [opacity, setOpacity] = useState(1)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (!active) return
    setOpacity(1)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops = new Array(cols).fill(1)

    const draw = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }, 33)

    const fadeTimer = setTimeout(() => setOpacity(0), 4000)
    const doneTimer = setTimeout(() => { clearInterval(draw); onDoneRef.current() }, 5000)

    return () => { clearInterval(draw); clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', opacity, transition: 'opacity 1s ease' }}
    />
  )
}
