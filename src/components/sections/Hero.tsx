'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import GlitchText from '@/components/ui/GlitchText'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile } from '@/hooks/useIsMobile'
import { NAV_LINKS } from '@/lib/constants'

// 3D scene is WebGL-only — must never run on the server
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-mono text-cyan/40 text-xs tracking-widest animate-pulse">
        LOADING SCENE...
      </span>
    </div>
  ),
})

const SUBTITLE = 'Backend & Distributed Systems Engineer'

/** Typewriter hook — reveals text character by character */
function useTypewriter(text: string, speed = 55, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

export default function Hero() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()
  const { displayed, done } = useTypewriter(SUBTITLE)

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col overflow-hidden"
    >
      {/* ── Three.js canvas fills the entire section ── */}
      <div className="absolute inset-0 z-0">
        <HeroScene mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
      </div>

      {/* ── Top nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <span className="font-mono text-xs text-cyan/50 tracking-[0.3em] uppercase">
          smit.dev
        </span>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero text centred vertically ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        {/* Name with glitch effect */}
        <div className="relative">
          <GlitchText
            text="SMIT"
            className="text-[clamp(4rem,15vw,10rem)] leading-none"
          />
        </div>

        {/* Typewriter subtitle */}
        <div className="h-8 flex items-center gap-0.5">
          <span className="font-mono text-[clamp(0.65rem,2vw,1rem)] tracking-[0.25em] text-cyan/80 uppercase">
            {displayed}
          </span>
          {!done && <span className="typewriter-cursor" />}
        </div>

        {/* Tag line */}
        <p className="font-rajdhani text-gray-400 text-sm tracking-widest max-w-md mt-2">
          Application Engineer at{' '}
          <span className="text-cyan">Radiant</span>
          {' '}· M.S. CS, University at Buffalo
        </p>

        {/* CTA */}
        <a
          href="#projects"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-cyan/60 hover:text-cyan tracking-widest uppercase border border-cyan/20 hover:border-cyan/50 px-5 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          View My Work
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0L5.293 0.707l4.293 4.293H0v1h9.586L5.293 10.293 6 11l5-5L6 0z" />
          </svg>
        </a>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="relative z-10 flex flex-col items-center pb-8 gap-2">
        <span className="font-mono text-[0.6rem] text-cyan/30 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-1 animate-scroll-bounce">
          <div className="w-px h-6 bg-gradient-to-b from-cyan/40 to-transparent" />
          <svg width="8" height="5" viewBox="0 0 8 5" fill="#00f0ff" opacity="0.4">
            <path d="M0 0l4 5 4-5H0z" />
          </svg>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0a0a0f)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
