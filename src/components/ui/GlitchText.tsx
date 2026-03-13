'use client'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'div'
}

/**
 * ShimmerText — a traveling purple→pink→blue highlight gradient sweeps
 * across the text on a 5s loop, like starlight catching on chrome.
 * Uses CSS background-clip: text so the gradient lives inside the letterforms.
 */
export default function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  return (
    <Tag
      className={`shimmer-text font-orbitron font-bold tracking-[0.06em] ${className}`}
    >
      {text}
    </Tag>
  )
}
