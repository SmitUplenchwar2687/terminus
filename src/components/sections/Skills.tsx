'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { SKILL_CATEGORIES } from '@/lib/constants'
import { fadeUp } from '@/lib/motion'

const SkillsRing = dynamic(() => import('@/components/3d/SkillsRing'), {
  ssr: false,
  loading: () => <div style={{ flex: 1 }} />,
})

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()

  return (
    <section id="skills" className="py-32">
      <div className="section-shell" ref={ref}>
        <div className="terminal-header">
          <span className="terminal-header-text">{'// 04 — TECH STACK'}</span>
          <div className="terminal-header-line" />
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          width: 'min(1200px, calc(100vw - 3rem))',
          margin: '0 auto',
          border: '1px solid #1a1a1a',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: '480px',
        }}
      >
        {/* LEFT — categories as flowing text */}
        <div style={{
          borderRight: isMobile ? 'none' : '1px solid #1a1a1a',
        }}>
          {/* Title bar */}
          <div style={{
            padding: '0.65rem 1.25rem',
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
            <span style={{ color: '#ff5f57', opacity: 0.5 }}>●</span>
            <span style={{ color: '#febc2e', opacity: 0.5 }}>●</span>
            <span style={{ color: '#28c840', opacity: 0.5 }}>●</span>
            <span style={{ marginLeft: '0.5rem' }}>categories</span>
          </div>

          {/* Skills by category — dot-separated flowing text */}
          <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#00f0ff',
                  opacity: 0.55,
                  marginBottom: '0.5rem',
                }}>
                  {cat.label}
                </div>
                <p style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '0.8rem',
                  color: '#666',
                  letterSpacing: '0.04em',
                  lineHeight: 1.9,
                  margin: 0,
                }}>
                  {cat.skills.join('  ·  ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D ring (desktop) / below categories (mobile) */}
        <div style={{
          position: 'relative',
          minHeight: isMobile ? '280px' : '480px',
          borderTop: isMobile ? '1px solid #1a1a1a' : 'none',
        }}>
          <SkillsRing compact={isMobile} />
        </div>
      </motion.div>
    </section>
  )
}
