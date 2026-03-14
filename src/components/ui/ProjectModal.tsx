'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { Project } from '@/lib/types'

const ProjectShape = dynamic(() => import('@/components/3d/ProjectShape'), { ssr: false })

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  // Escape key to close
  useEffect(() => {
    if (!project) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 700,
              background: '#000',
              border: '1px solid rgba(0,240,255,0.35)',
              boxShadow: '0 0 60px rgba(0,240,255,0.08)',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'none', border: 'none',
                color: '#00f0ff', fontSize: '1.5rem', lineHeight: 1,
                cursor: 'pointer',
                padding: '0.5rem',
                transition: 'color 0.18s',
                fontFamily: 'var(--font-jetbrains-mono)',
                minWidth: 44, minHeight: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
              onMouseLeave={e => (e.currentTarget.style.color = '#00f0ff')}
            >
              ×
            </button>

            {/* Two-column layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)',
              gap: '2rem',
              alignItems: 'start',
            }}
              className="modal-grid"
            >
              {/* Left: text */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '0.7rem',
                  color: '#444',
                  letterSpacing: '0.14em',
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem',
                }}>
                  {project.number}
                </p>

                <h2 style={{
                  fontFamily: 'Clash Display, sans-serif',
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 0.5rem',
                  lineHeight: 1.1,
                  paddingRight: '2.5rem',
                }}>
                  {project.name}
                </h2>

                <p style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '0.95rem',
                  color: '#555',
                  fontStyle: 'italic',
                  margin: '0 0 1.25rem',
                }}>
                  {project.tagline}
                </p>

                <p style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '0.95rem',
                  color: '#aaa',
                  lineHeight: 1.75,
                  margin: '0 0 1.5rem',
                }}>
                  {project.fullDescription}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.72rem',
                      color: '#00f0ff',
                      border: '1px solid rgba(0,240,255,0.3)',
                      padding: '0.25rem 0.6rem',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.04em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GitHub link */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.8rem',
                    color: '#00f0ff',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'opacity 0.18s',
                    opacity: 0.8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
                >
                  → View on GitHub
                </a>
              </div>

              {/* Right: 3D shape */}
              <div style={{ height: 250, display: 'flex', alignItems: 'center' }}>
                <ProjectShape shapeType={project.shape} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
