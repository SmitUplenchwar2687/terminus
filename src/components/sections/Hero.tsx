'use client'
import dynamic from 'next/dynamic'
import GlitchText from '@/components/ui/GlitchText'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useIsMobile } from '@/hooks/useIsMobile'
import { NAV_LINKS } from '@/lib/constants'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

export default function Hero() {
  const mouse = useMousePosition()
  const isMobile = useIsMobile()

  return (
    <section id="hero" className="relative min-h-screen px-6 py-8">
      <div className="section-shell min-h-[calc(100vh-4rem)] flex flex-col">
        <nav className="flex items-center justify-between py-6">
          <span className="mono-line text-xs tracking-[0.24em] uppercase text-muted">
            smit uplenchwar
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

        <div className="relative flex-1 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_420px]">
          <div className="relative z-10 max-w-[620px]">
            <GlitchText
              text="SMIT"
              className="text-[clamp(5.5rem,15vw,10rem)] leading-[0.88]"
            />
            <p className="mt-6 max-w-md font-rajdhani text-sm md:text-base leading-relaxed text-muted">
              Backend &amp; Distributed Systems Engineer
            </p>
            <p className="mt-10 max-w-xl font-rajdhani text-base md:text-lg leading-relaxed text-white">
              Application Engineer at Radiant · M.S. CS, University at Buffalo
            </p>
            <a
              href="#projects"
              className="mt-12 inline-flex items-center gap-3 font-rajdhani text-sm text-white transition-colors hover:text-magenta"
            >
              <span className="mono-line text-muted">01</span>
              <span>View selected work</span>
            </a>
          </div>

          <div className="relative h-[360px] md:h-[520px]">
            <div className="absolute inset-0 opacity-55">
              <HeroScene mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
