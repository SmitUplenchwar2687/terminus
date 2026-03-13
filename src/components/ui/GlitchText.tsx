'use client'
import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'div'
}

export default function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  const [bootText, setBootText] = useState('loading smit.exe...')
  const [phase, setPhase] = useState<'boot' | 'name'>('boot')

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    let index = 0
    const bootTimer = setTimeout(() => {
      setPhase('name')
      setBootText('')

      interval = setInterval(() => {
        index += 1
        setBootText(text.slice(0, index))
        if (index >= text.length) clearInterval(interval)
      }, 120)
    }, 1200)

    return () => {
      clearTimeout(bootTimer)
      if (interval) clearInterval(interval)
    }
  }, [text])

  return (
    <div className="flex flex-col items-center gap-4">
      {phase === 'boot' ? (
        <span className="font-orbitron text-sm tracking-[0.18em] text-cyan/80 uppercase">
          {bootText}
          <span className="typewriter-cursor">_</span>
        </span>
      ) : null}
      <Tag className={`font-orbitron text-cyan ${className}`} aria-label={text}>
        {bootText}
        {bootText.length < text.length ? <span className="typewriter-cursor">_</span> : null}
      </Tag>
    </div>
  )
}
