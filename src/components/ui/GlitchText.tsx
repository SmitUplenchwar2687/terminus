'use client'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'div'
}

export default function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  return (
    <Tag className={`font-orbitron font-semibold tracking-[-0.04em] text-white ${className}`}>
      {text}
    </Tag>
  )
}
