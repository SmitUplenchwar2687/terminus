'use client'
import { motion } from 'framer-motion'

interface NeonButtonProps {
  href: string
  label: string
  variant?: 'cyan' | 'magenta'
  icon?: React.ReactNode
  external?: boolean
}

/**
 * Neon-outlined anchor button with hover glow pulse.
 * Uses framer-motion for the scale + glow transition.
 */
export default function NeonButton({
  href,
  label,
  variant = 'cyan',
  icon,
  external = true,
}: NeonButtonProps) {
  const isCyan = variant === 'cyan'

  const borderColor = isCyan ? 'rgba(0,240,255,0.6)' : 'rgba(255,0,229,0.6)'
  const glowColor = isCyan ? '#00f0ff' : '#ff00e5'
  const textColor = isCyan ? '#00f0ff' : '#ff00e5'

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-sm tracking-widest uppercase transition-all duration-300"
      style={{
        border: `1px solid ${borderColor}`,
        color: textColor,
        background: isCyan ? 'rgba(0,240,255,0.04)' : 'rgba(255,0,229,0.04)',
        boxShadow: `0 0 8px ${glowColor}30, inset 0 0 8px ${glowColor}10`,
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 20px ${glowColor}60, 0 0 40px ${glowColor}30, inset 0 0 15px ${glowColor}15`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 8px ${glowColor}30, inset 0 0 8px ${glowColor}10`
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </motion.a>
  )
}
