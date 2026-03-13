'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EXPERIENCE } from '@/lib/constants'
import { fadeUp } from '@/lib/motion'

const EDUCATION = [
  { degree: 'M.S. Computer Science & Engineering', school: 'University at Buffalo, SUNY', period: 'Aug 2024 — Dec 2025' },
  { degree: 'B.Tech Computer Science & Engineering', school: 'IIIT Pune', period: 'Aug 2018 — Aug 2022' },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeId, setActiveId] = useState(EXPERIENCE[0].id)
  const activeJob = EXPERIENCE.find((j) => j.id === activeId)!

  return (
    <section id="experience" className="py-32">
      <div className="section-shell" ref={ref}>
        <div className="terminal-header">
          <span className="terminal-header-text">{'// 02 — EXPERIENCE'}</span>
          <div className="terminal-header-line" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Split panel */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 0,
            border: '1px solid #1a1a1a',
            minHeight: '420px',
          }}
            className="flex-col md:grid"
          >
            {/* LEFT — company list */}
            <div style={{
              borderRight: '1px solid #1a1a1a',
              padding: '0',
              position: 'relative',
            }}>
              {/* Terminal-style title bar */}
              <div style={{
                padding: '0.65rem 1rem',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: '#2a2a2a',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: '#1a1a1a' }}>●</span>
                <span style={{ color: '#1e1e1e' }}>●</span>
                <span style={{ color: '#222' }}>●</span>
                <span style={{ marginLeft: '0.5rem' }}>companies</span>
              </div>

              {EXPERIENCE.map((job, i) => {
                const isActive = job.id === activeId
                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setActiveId(job.id)}
                    data-cursor-grow="true"
                    style={{
                      width: '100%',
                      background: isActive ? 'rgba(0,240,255,0.04)' : 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #111',
                      borderLeft: isActive ? '2px solid #00f0ff' : '2px solid transparent',
                      padding: '0.9rem 1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: isActive ? '#00f0ff' : '#2a2a2a',
                      marginBottom: '0.3rem',
                      transition: 'color 0.2s',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontFamily: 'Clash Display, sans-serif',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: isActive ? '#ffffff' : '#555',
                      transition: 'color 0.2s',
                      lineHeight: 1.2,
                    }}>
                      {job.company}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.58rem',
                      color: isActive ? '#444' : '#2a2a2a',
                      marginTop: '0.25rem',
                      letterSpacing: '0.06em',
                      transition: 'color 0.2s',
                    }}>
                      {job.period.split('—')[0].trim()}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* RIGHT — terminal detail panel */}
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Tab bar */}
              <div style={{
                padding: '0.65rem 1.25rem',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                color: '#00f0ff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: '#333' }}>$</span>
                <span>cat {activeJob.company.toLowerCase().replace(/\s+/g, '-')}.log</span>
                {activeJob.current && (
                  <span style={{
                    marginLeft: 'auto',
                    border: '1px solid rgba(0,240,255,0.25)',
                    padding: '0.1rem 0.45rem',
                    fontSize: '0.55rem',
                    letterSpacing: '0.18em',
                    color: '#00f0ff',
                    textTransform: 'uppercase',
                  }}>
                    active
                  </span>
                )}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJob.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ padding: '1.5rem 1.5rem', flex: 1, overflow: 'auto' }}
                >
                  {/* Metadata block */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '5rem 1fr',
                    gap: '0.25rem 1rem',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.72rem',
                  }}>
                    {[
                      ['role', activeJob.role],
                      ['period', activeJob.period],
                    ].map(([k, v]) => (
                      <>
                        <span key={k + '-key'} style={{ color: '#333', letterSpacing: '0.1em' }}>{k}</span>
                        <span key={k + '-val'} style={{ color: '#888' }}>{v}</span>
                      </>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: '1px',
                    background: '#111',
                    marginBottom: '1.25rem',
                  }} />

                  {/* Bullets */}
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {activeJob.bullets.map((bullet, i) => (
                      <li key={i} style={{
                        display: 'grid',
                        gridTemplateColumns: '1.25rem 1fr',
                        gap: '0.5rem',
                        fontFamily: 'Satoshi, sans-serif',
                        fontSize: '0.88rem',
                        lineHeight: 1.75,
                        color: '#666',
                      }}>
                        <span style={{ color: '#00f0ff', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.7rem', paddingTop: '0.3rem' }}>›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #111' }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#2a2a2a',
              marginBottom: '1.5rem',
            }}>
              Education
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {EDUCATION.map((edu) => (
                <div key={edu.school} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem',
                  alignItems: 'baseline',
                }}>
                  <div>
                    <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.92rem', color: '#e0e0e0' }}>
                      {edu.degree}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.68rem',
                      color: '#333',
                      marginTop: '0.2rem',
                      letterSpacing: '0.08em',
                    }}>
                      {edu.school}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.65rem',
                    color: '#2a2a2a',
                    whiteSpace: 'nowrap',
                  }}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
