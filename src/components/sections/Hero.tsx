'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile } from '@/hooks/useIsMobile'
import { NAV_LINKS } from '@/lib/constants'
import AnimatedSignature from '@/components/ui/AnimatedSignature'

const HeroParticles = dynamic(() => import('@/components/3d/HeroParticles'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
})

interface Props {
  bootComplete: boolean
}

export default function Hero({ bootComplete }: Props) {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()
  const scrollProgressRef = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      scrollProgressRef.current = Math.min(window.scrollY / window.innerHeight, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <section id="hero" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden relative">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroParticles
            mouseX={mouse.x}
            mouseY={mouse.y}
            isMobile={isMobile}
            scrollProgressRef={scrollProgressRef}
          />
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* Nav */}
        <nav
          className="absolute top-0 inset-x-0 z-20 px-6 py-7 flex items-center justify-between"
          style={{ width: 'min(1100px, 100%)', margin: '0 auto', left: '50%', transform: 'translateX(-50%)' }}
        >
          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#444' }}>
            ~/smit/portfolio
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.78rem', letterSpacing: '0.12em', color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e0e0e0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                  data-cursor-grow="true"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle navigation"
            style={{
              background: 'none', border: 'none',
              color: '#00f0ff', fontSize: '1.5rem', lineHeight: 1,
              fontFamily: 'var(--font-jetbrains-mono)',
              minWidth: 44, minHeight: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0,
            }}
          >
            {menuOpen ? '×' : '≡'}
          </button>
        </nav>

        {/* Center content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ pointerEvents: 'none' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', color: '#444', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            ~/smit/portfolio ▸ init
          </div>

          <AnimatedSignature
            started={bootComplete}
            fontSize="clamp(5rem, 20vw, 13rem)"
          />

          <p
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              color: '#444',
              letterSpacing: '0.12em',
              marginTop: '1.5rem',
              maxWidth: '480px',
            }}
          >
            Backend &amp; Distributed Systems Engineer
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{
            pointerEvents: 'auto',
            fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.65rem',
            letterSpacing: '0.22em', color: '#00f0ff', textTransform: 'uppercase',
            background: 'none', border: 'none', padding: '0.5rem 1rem',
          }}
          data-cursor-grow="true"
        >
          <span>scroll</span>
          <span style={{ animation: 'bounce-scroll 2s ease-in-out infinite', display: 'block' }}>↓</span>
        </button>
      </div>

      {/* Mobile fullscreen menu — fixed so it escapes overflow:hidden */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 500,
              background: '#000',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {/* Top bar */}
            <span style={{
              position: 'absolute', top: '2rem', left: '1.5rem',
              fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.68rem',
              letterSpacing: '0.18em', color: '#333', textTransform: 'uppercase',
            }}>
              ~/smit/portfolio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'none', border: 'none',
                color: '#00f0ff', fontSize: '1.8rem', lineHeight: 1,
                fontFamily: 'var(--font-jetbrains-mono)',
                minWidth: 44, minHeight: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>

            {/* Nav links */}
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.2 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'Clash Display, sans-serif',
                  fontSize: 'clamp(2rem, 10vw, 3rem)',
                  fontWeight: 700,
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Scanline at bottom */}
            <div style={{
              position: 'absolute', bottom: '2rem',
              fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.62rem',
              letterSpacing: '0.12em', color: '#222',
            }}>
              {'// tap link to navigate'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
