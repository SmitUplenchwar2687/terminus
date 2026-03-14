'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

const LINKS = [
  { label: 'github', href: 'https://github.com/smituplenchwar2687' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/smit-uplenchwar-41b473219/' },
  { label: 'email', href: 'mailto:smituplenchwar02@gmail.com' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-32 pb-24">
      <div className="section-shell" ref={ref}>
        <div className="terminal-header">
          <span className="terminal-header-text">{'// 05 — CONTACT'}</span>
          <div className="terminal-header-line" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '1rem',
            color: '#00f0ff',
            marginBottom: '2.5rem',
          }}
        >
          visitor@smit.dev:~$ connect
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              variants={fadeUp}
              className="contact-link"
              data-cursor-grow="true"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'Satoshi, sans-serif',
            fontSize: '0.9rem',
            color: '#444',
            fontStyle: 'italic',
            marginTop: '3rem',
          }}
        >
          Let&apos;s build something remarkable.
        </motion.p>

        <div style={{
          marginTop: '4rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #111',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '0.65rem',
          color: '#222',
          letterSpacing: '0.12em',
        }}>
          © 2026 Smit Uplenchwar
          <span style={{ marginLeft: '2rem', color: '#111' }}>{'// try: sudo hire smit'}</span>
        </div>
      </div>
    </section>
  )
}
