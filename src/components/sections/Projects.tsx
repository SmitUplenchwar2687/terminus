'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { Project } from '@/lib/types'
import ProjectModal from '@/components/ui/ProjectModal'
import { useIsMobile } from '@/hooks/useIsMobile'

function ProjectRow({
  project,
  onClick,
  isMobile,
}: {
  project: Project
  onClick: () => void
  isMobile: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      className="project-row"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-grow="true"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '2.5rem 1fr' : '3rem 1fr auto',
        gap: isMobile ? '1rem' : '1.5rem',
        alignItems: 'baseline',
      }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '0.82rem',
          color: hovered ? '#ffffff' : '#00f0ff',
          transition: 'color 0.25s',
        }}>
          {project.number}
        </span>

        <div>
          <span style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
            fontWeight: 700,
            color: '#e0e0e0',
            lineHeight: 1,
            display: 'block',
          }}>
            {project.name}
          </span>
          {/* Tags shown below name on mobile */}
          {isMobile && (
            <span style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '0.68rem',
              color: '#333',
              marginTop: '0.3rem',
              display: 'block',
            }}>
              {project.tags.slice(0, 3).join(' · ')}
            </span>
          )}
        </div>

        {/* Tags / arrow — desktop only */}
        {!isMobile && (
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '0.78rem',
            color: hovered ? '#00f0ff' : '#444',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            transition: 'color 0.25s',
          }}>
            {hovered ? '↗' : project.tags.join(' · ')}
          </span>
        )}
      </div>

      <AnimatePresence>
        {hovered && !isMobile && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '0.9rem',
              color: '#666',
              paddingLeft: '3.5rem',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const isMobile = useIsMobile()

  return (
    <>
      <section id="projects" className="py-32">
        <div className="section-shell" ref={ref}>
          <div className="terminal-header">
            <span className="terminal-header-text">{'// 03 — PROJECTS'}</span>
            <div className="terminal-header-line" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {PROJECTS.map((p) => (
              <ProjectRow key={p.id} project={p} onClick={() => setActiveProject(p)} isMobile={isMobile} />
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
