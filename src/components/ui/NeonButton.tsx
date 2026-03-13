'use client'
import { motion } from 'framer-motion'

interface NeonButtonProps {
  href: string
  label: string
  variant?: 'cyan' | 'magenta'
  icon?: React.ReactNode
  external?: boolean
}

const VARIANTS = {
  cyan: {
    border: 'rgba(0, 255, 65, 0.24)',
    text: '#00ff41',
    hover: '#39ff14',
  },
  magenta: {
    border: 'rgba(57, 255, 20, 0.28)',
    text: '#39ff14',
    hover: '#39ff14',
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
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-4 py-2 font-orbitron text-sm uppercase tracking-[0.08em]"
      style={{
        border: `1px solid ${v.border}`,
        color: v.text,
        background: 'rgba(0, 255, 65, 0.03)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = v.hover
        el.style.color = v.hover
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = v.border
        el.style.color = v.text
      }}
    >
      <span>{'>'}</span>
      {icon && <span className="flex-shrink-0 opacity-80">{icon}</span>}
      <span>{label}</span>
    </motion.a>
  )
}
