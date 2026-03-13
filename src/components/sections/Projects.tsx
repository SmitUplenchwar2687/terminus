'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/motion'

function ProjectRow({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      className="project-row block"
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-grow="true"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '3rem 1fr auto', gap: '1.5rem', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '0.82rem',
          color: hovered ? '#ffffff' : '#00f0ff',
          transition: 'color 0.25s',
        }}>
          {project.number}
        </span>

        <span style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          fontWeight: 700,
          color: '#e0e0e0',
          lineHeight: 1,
        }}>
          {project.name}
        </span>

        <span style={{
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '0.78rem',
          color: '#444',
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}>
          {project.tags.join(' · ')}
        </span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '0.9rem',
              color: '#666',
              paddingLeft: '4.5rem',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.a>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
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
            <ProjectRow key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
