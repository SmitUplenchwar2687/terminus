'use client'
import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/types'
import { cardVariant } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  index: number
}

/**
 * Cosmic project card with:
 * - Subtle 3D perspective tilt following the mouse
 * - "Constellation" effect on hover: 4 corner dots + connecting lines
 *   drawn with SVG pathLength animations
 * - Soft purple/blue glow on hover
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    const rotX = (y - 0.5) * -14
    const rotY = (x - 0.5) *  14
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
  }, [])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.1s ease, box-shadow 0.35s ease, border-color 0.35s ease'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s ease, box-shadow 0.35s ease, border-color 0.35s ease'
    card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }, [])

  // Constellation line animation — draws border lines sequentially
  const lineDuration  = 0.25
  const lineEase      = 'easeOut'

  return (
    <motion.div variants={cardVariant}>
      <div
        ref={cardRef}
        className="glass rounded-xl p-6 relative overflow-hidden cursor-default h-full project-card"
        style={{ willChange: 'transform' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Constellation SVG overlay ─────────────────────────────────── */}
        <AnimatePresence>
          {hovered && (
            <motion.svg
              key="constellation"
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Corner dots */}
              {([
                [5, 5], [95, 5], [95, 95], [5, 95],
              ] as [number, number][]).map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}  cy={cy}  r="1.4"
                  fill="#a78bfa"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.18 }}
                />
              ))}

              {/* Top edge */}
              <motion.path
                d="M 5 5 L 95 5"
                stroke="#7c3aed" strokeWidth="0.4" fill="none" opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: lineDuration, ease: lineEase, delay: 0 }}
              />
              {/* Right edge */}
              <motion.path
                d="M 95 5 L 95 95"
                stroke="#60a5fa" strokeWidth="0.4" fill="none" opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: lineDuration, ease: lineEase, delay: lineDuration }}
              />
              {/* Bottom edge */}
              <motion.path
                d="M 95 95 L 5 95"
                stroke="#7c3aed" strokeWidth="0.4" fill="none" opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: lineDuration, ease: lineEase, delay: lineDuration * 2 }}
              />
              {/* Left edge */}
              <motion.path
                d="M 5 95 L 5 5"
                stroke="#60a5fa" strokeWidth="0.4" fill="none" opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: lineDuration, ease: lineEase, delay: lineDuration * 3 }}
              />

              {/* Subtle diagonal accent */}
              <motion.path
                d="M 5 5 L 22 22"
                stroke="#f472b6" strokeWidth="0.3" fill="none" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, delay: lineDuration * 2 }}
              />
              <motion.path
                d="M 95 95 L 78 78"
                stroke="#f472b6" strokeWidth="0.3" fill="none" opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, delay: lineDuration * 2 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* ── Card content ──────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col h-full gap-3">
          {/* Subtle top-right nebula accent */}
          <div
            className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at top right, rgba(124,58,237,0.35) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <h3 className="font-orbitron text-lg font-semibold tracking-wide"
              style={{ color: '#c4b5fd' }}>
            {project.name}
          </h3>

          <p className="font-rajdhani text-sm leading-relaxed flex-1"
             style={{ color: 'rgba(226,232,240,0.75)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-1 text-xs font-mono w-fit transition-colors duration-200"
              style={{ color: 'rgba(167,139,250,0.55)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#a78bfa' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(167,139,250,0.55)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
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
