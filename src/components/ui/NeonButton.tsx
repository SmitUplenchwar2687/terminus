'use client'
import { motion } from 'framer-motion'

interface NeonButtonProps {
  href: string
  label: string
  variant?: 'cyan' | 'magenta'
  icon?: React.ReactNode
  external?: boolean
}

export default function NeonButton({
  href,
  label,
  variant = 'cyan',
  icon,
  external = true,
}: NeonButtonProps) {
  const color = variant === 'magenta' ? '#ff6600' : '#ffffff'

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 6 }}
      className="inline-flex items-center gap-2 text-sm md:text-base"
      style={{ color }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = '#ff6600'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = color
      }}
    >
      {icon ? <span className="text-muted">{icon}</span> : null}
      <span className="font-rajdhani">{label}</span>
    </motion.a>
  )
}
