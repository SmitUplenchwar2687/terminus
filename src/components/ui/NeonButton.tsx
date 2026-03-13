'use client'
import { motion } from 'framer-motion'

interface NeonButtonProps {
  href: string
  label: string
  variant?: 'cyan' | 'magenta'
  icon?: React.ReactNode
  external?: boolean
}

// Cosmic color map — variant names kept identical to avoid changing callers
const VARIANTS = {
  cyan: {
    border:     'rgba(124, 58, 237, 0.55)',
    text:       '#c4b5fd',
    bg:         'rgba(124, 58, 237, 0.06)',
    glowIdle:   'rgba(124, 58, 237, 0.25)',
    glowHover:  'rgba(124, 58, 237, 0.55)',
    glow2:      'rgba(96, 165, 250, 0.15)',
  },
  magenta: {
    border:     'rgba(244, 114, 182, 0.55)',
    text:       '#f9a8d4',
    bg:         'rgba(244, 114, 182, 0.06)',
    glowIdle:   'rgba(244, 114, 182, 0.25)',
    glowHover:  'rgba(244, 114, 182, 0.55)',
    glow2:      'rgba(196, 132, 252, 0.15)',
  },
} as const

export default function NeonButton({
  href,
  label,
  variant = 'cyan',
  icon,
  external = true,
}: NeonButtonProps) {
  const v = VARIANTS[variant]

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-md font-orbitron text-xs tracking-widest uppercase transition-all duration-400"
      style={{
        border:     `1px solid ${v.border}`,
        color:      v.text,
        background: v.bg,
        boxShadow:  `0 0 10px ${v.glowIdle}, inset 0 0 10px ${v.glowIdle}30`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = `0 0 22px ${v.glowHover}, 0 0 45px ${v.glow2}, inset 0 0 18px ${v.glowHover}20`
        el.style.borderColor = v.glowHover
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = `0 0 10px ${v.glowIdle}, inset 0 0 10px ${v.glowIdle}30`
        el.style.borderColor = v.border
      }}
    >
      {icon && <span className="flex-shrink-0 opacity-80">{icon}</span>}
      {label}
    </motion.a>
  )
}
