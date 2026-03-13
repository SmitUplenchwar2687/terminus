'use client'
import dynamic from 'next/dynamic'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile } from '@/hooks/useIsMobile'
import { NAV_LINKS } from '@/lib/constants'

const HeroParticles = dynamic(() => import('@/components/3d/HeroParticles'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
})

export default function Hero() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroParticles mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
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
      </nav>

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', color: '#444', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
          ~/smit/portfolio ▸ init
        </div>

        <h1
          style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize: 'clamp(5rem, 20vw, 13rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          SMIT
        </h1>

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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', color: '#00f0ff', textTransform: 'uppercase' }}
      >
        <span>scroll</span>
        <span style={{ animation: 'bounce-scroll 2s ease-in-out infinite', display: 'block' }}>↓</span>
      </div>
    </section>
  )
}
