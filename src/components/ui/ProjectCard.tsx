'use client'
import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { cardVariant } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  index: number
}

/**
 * Glassmorphism card with:
 * - CSS 3D perspective tilt tracking the mouse cursor
 * - Radial holographic shimmer gradient following cursor
 * - Neon border glow on hover
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const shimmer = shimmerRef.current
    if (!card || !shimmer) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // [0, 1]
    const y = (e.clientY - rect.top) / rect.height    // [0, 1]

    // Tilt: max ±12 degrees
    const rotateX = (y - 0.5) * -20
    const rotateY = (x - 0.5) * 20

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    // Shimmer follows cursor
    shimmer.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%,
      rgba(0,240,255,0.14) 0%,
      rgba(255,0,229,0.06) 30%,
      transparent 65%)`
    shimmer.style.opacity = '1'
  }, [])

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true
    const card = cardRef.current
    if (card) {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false
    const card = cardRef.current
    const shimmer = shimmerRef.current
    if (!card) return

    card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease'
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    if (shimmer) shimmer.style.opacity = '0'
  }, [])

  return (
    <motion.div variants={cardVariant}>
      <div
        ref={cardRef}
        className="glass rounded-lg p-6 relative overflow-hidden cursor-default h-full project-card"
        style={{ willChange: 'transform' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Holographic shimmer layer */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, rgba(0,240,255,0.2) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full gap-3">
          <h3 className="font-orbitron text-cyan text-lg font-bold tracking-wide neon-text-cyan">
            {project.name}
          </h3>

          <p className="font-rajdhani text-gray-300 text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-mono text-cyan/70 hover:text-cyan transition-colors duration-200 w-fit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
