'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EXPERIENCE } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/motion'

const HASHES = ['a3f82c1', '7b91de4', '2c45a8f', '9e17fa3', '4d6c8b2']

const EDUCATION = [
  { degree: 'M.S. Computer Science & Engineering', school: 'University at Buffalo, SUNY', period: 'Aug 2024 — Dec 2025' },
  { degree: 'B.Tech Computer Science & Engineering', school: 'IIIT Pune', period: 'Aug 2018 — Aug 2022' },
]

// Bold numbers/metrics in bullet text
function highlightMetrics(text: string) {
  const parts = text.split(/(~?\d+(?:\.\d+)?[×x%k+]+|\d+\+)/g)
  return parts.map((part, i) => {
    if (/^(~?\d+(?:\.\d+)?[×x%k+]+|\d+\+)$/.test(part)) {
      return <span key={i} style={{ color: '#00f0ff', fontWeight: 600 }}>{part}</span>
    }
    return part
  })
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(EXPERIENCE.map(j => j.id)))

  const toggle = (id: string) => setExpandedIds(prev => {
    const next = new Set(prev)
    if (next.has(id)) { next.delete(id) } else { next.add(id) }
    return next
  })

  return (
    <section id="experience" className="py-32">
      <div className="section-shell" ref={ref}>
        <div className="terminal-header">
          <span className="terminal-header-text">{'// 02 — EXPERIENCE'}</span>
          <div className="terminal-header-line" />
        </div>

        {/* Git command prompt — flavor text, dimmed */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '0.72rem',
            color: '#333',
            marginBottom: '2.5rem',
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: '#333' }}>smit@terminus</span>
          <span style={{ color: '#222' }}>:</span>
          <span style={{ color: '#00f0ff', opacity: 0.25 }}>~/career</span>
          <span style={{ color: '#222' }}>$ </span>
          <span style={{ color: '#333' }}>git log --graph --oneline --decorate</span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '3.75rem' }}
        >
          {EXPERIENCE.map((job, i) => {
            const hash = HASHES[i]
            const isExpanded = expandedIds.has(job.id)

            return (
              <motion.div
                key={job.id}
                variants={fadeUp}
                style={{
                  paddingLeft: '1.25rem',
                  borderLeft: '2px solid rgba(0,240,255,0.10)',
                }}
              >
                {/* Commit hash row — git flavor, secondary */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '0.85rem',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.75rem',
                    color: job.current ? '#00f0ff' : '#2a2a2a',
                  }}>*</span>

                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.68rem',
                    color: '#00f0ff',
                    opacity: job.current ? 0.7 : 0.25,
                  }}>{hash}</span>

                  {job.current && (
                    <span style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.62rem',
                      color: '#00f0ff',
                      opacity: 0.6,
                    }}>(HEAD → main)</span>
                  )}

                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.62rem',
                    color: '#2e2e2e',
                  }}>[{job.period.split('—')[0].trim()}]</span>

                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.65rem',
                    color: '#2e2e2e',
                    flex: 1,
                    minWidth: 0,
                  }}>
                    <span style={{ color: '#333' }}>{job.company.toLowerCase().replace(/\s+/g, '-')}</span>
                    <span style={{ color: '#222' }}>: </span>
                    <span style={{ color: '#3a3a3a' }}>{job.summary}</span>
                  </span>
                </div>

                {/* Primary header — company + date */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '0.4rem',
                  flexWrap: 'wrap',
                }}>
                  <div style={{
                    fontFamily: 'Clash Display, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#e0e0e0',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                  }}>
                    {job.company}
                  </div>

                  {/* Date + PRESENT badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, paddingTop: '0.35rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: '0.78rem',
                      color: '#444',
                      whiteSpace: 'nowrap',
                    }}>{job.period}</span>
                    {job.current && (
                      <span style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.14em',
                        color: '#00f0ff',
                        border: '1px solid rgba(0,240,255,0.35)',
                        padding: '0.15rem 0.45rem',
                        whiteSpace: 'nowrap',
                      }}>PRESENT</span>
                    )}
                  </div>
                </div>

                {/* Role title */}
                <div style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '1rem',
                  color: '#00f0ff',
                  marginBottom: '1rem',
                  opacity: 0.9,
                }}>
                  {job.role}
                </div>

                {/* Expand/collapse toggle */}
                <button
                  type="button"
                  onClick={() => toggle(job.id)}
                  data-cursor-grow="true"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: isExpanded ? '0.75rem' : 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.6rem',
                    color: '#00f0ff',
                    opacity: 0.5,
                  }}>@@ impact @@</span>
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.6rem',
                    color: isExpanded ? '#00f0ff' : '#2a2a2a',
                    transition: 'color 0.2s',
                  }}>{isExpanded ? '[-]' : '[+]'}</span>
                </button>

                {/* Expandable bullets */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                        {job.bullets.map((bullet, bi) => (
                          <div key={bi} style={{
                            display: 'grid',
                            gridTemplateColumns: '1rem 1fr',
                            gap: '0.4rem',
                            padding: '0.2rem 0',
                            fontFamily: 'Satoshi, sans-serif',
                            fontSize: '0.875rem',
                            lineHeight: 1.75,
                            color: '#888',
                          }}>
                            <span style={{
                              fontFamily: 'var(--font-jetbrains-mono)',
                              fontSize: '0.75rem',
                              color: '#00f0ff',
                              paddingTop: '0.24rem',
                              flexShrink: 0,
                            }}>+</span>
                            <span>{highlightMetrics(bullet)}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Education */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #111' }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2a2a2a',
            marginBottom: '1.5rem',
          }}>
            Education
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {EDUCATION.map((edu) => (
              <div key={edu.school} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                alignItems: 'baseline',
              }}>
                <div>
                  <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.95rem', color: '#e0e0e0' }}>
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
                  color: '#333',
                  whiteSpace: 'nowrap',
                }}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
