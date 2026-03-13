'use client'
import dynamic from 'next/dynamic'
import GlitchText from '@/components/ui/GlitchText'
import TypewriterText from '@/components/ui/TypewriterText'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile } from '@/hooks/useIsMobile'
import { NAV_LINKS } from '@/lib/constants'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-mono text-cyan/50 text-xs tracking-widest animate-pulse">
        booting matrix feed...
      </span>
    </div>
  ),
})

const SUBTITLE = 'backend & distributed systems engineer'

export default function Hero() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HeroScene mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-8 py-6">
        <span className="text-xs tracking-[0.14em] text-cyan/72">
          visitor@smit.dev:~$
        </span>
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {`$ cd ~/${link.label.toLowerCase()}`}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="terminal-window w-full max-w-4xl">
          <div className="terminal-header">/usr/bin/portfolio --boot</div>
          <div className="terminal-content flex flex-col items-center gap-6 py-8">
            <GlitchText
              text="smit"
              className="text-[clamp(3rem,11vw,7.5rem)] leading-none uppercase"
            />

            <TypewriterText
              text={SUBTITLE}
              as="div"
              delay={1700}
              speed={32}
              cursor
              className="text-[clamp(0.75rem,1.4vw,1rem)] tracking-[0.18em] uppercase text-cyan/82"
            />

            <TypewriterText
              text="application engineer @ radiant | ms cs buffalo '25 | distributed systems | backend infra | things that scale"
              as="p"
              delay={2300}
              speed={12}
              className="max-w-3xl text-sm md:text-base leading-relaxed text-cyan/72"
            />

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan/20 text-sm text-cyan/80 hover:text-magenta hover:border-magenta transition-colors"
            >
              <span>{'>'}</span>
              <span>open ./projects</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center pb-8 gap-2">
        <span className="font-mono text-[0.7rem] text-cyan/48 tracking-[0.18em] uppercase">
          scroll
        </span>
        <div className="flex flex-col items-center gap-1 animate-scroll-bounce">
          <div className="w-px h-6 bg-gradient-to-b from-cyan/60 to-transparent" />
          <span className="text-cyan/72 text-xs">v</span>
        </div>
      </div>
    </section>
  )
}
