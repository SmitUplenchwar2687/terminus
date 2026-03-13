'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer } from '@/lib/motion'
import NeonButton from '@/components/ui/NeonButton'
import { useIsMobile } from '@/hooks/useIsMobile'

const ParticleWave = dynamic(() => import('@/components/3d/ParticleWave'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

// SVG icons
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Particle wave background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-40">
          <ParticleWave />
        </div>
      )}

      {/* Top separator line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-10"
        >
          {/* Label */}
          <motion.div variants={fadeUpVariant}>
            <span className="font-mono text-xs text-cyan/40 tracking-[0.4em] uppercase">
              04 // Contact
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariant}
            className="font-orbitron text-3xl md:text-5xl font-black text-white leading-tight"
          >
            Let&apos;s build something{' '}
            <span className="text-cyan neon-text-cyan">remarkable.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            className="font-rajdhani text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            I&apos;m open to senior backend and distributed systems roles. If you&apos;re working on
            something technically interesting, I&apos;d love to hear about it.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div variants={fadeUpVariant}>
              <NeonButton
                href="https://github.com/smit-1923"
                label="GitHub"
                variant="cyan"
                icon={<GithubIcon />}
              />
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <NeonButton
                href="https://linkedin.com/in/smituplenchwar"
                label="LinkedIn"
                variant="magenta"
                icon={<LinkedInIcon />}
              />
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <NeonButton
                href="mailto:smit@example.com"
                label="Email Me"
                variant="cyan"
                icon={<EmailIcon />}
                external={false}
              />
            </motion.div>
          </motion.div>

          {/* Footer micro-text */}
          <motion.div
            variants={fadeUpVariant}
            className="pt-12 flex flex-col items-center gap-2"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
            <p className="font-mono text-[0.6rem] text-gray-600 tracking-[0.3em] uppercase mt-4">
              Smit Uplenchwar · Backend & Distributed Systems · 2025
            </p>
            <p className="font-mono text-[0.55rem] text-gray-700 tracking-widest mt-1">
              Built with Next.js · React Three Fiber · Framer Motion
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
