'use client'
import { useState, useEffect, useRef } from 'react'
import BootSequence from '@/components/ui/BootSequence'
import MatrixRain from '@/components/ui/MatrixRain'
import Terminal from '@/components/ui/Terminal'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const konamiBuffer = useRef<string[]>([])

  useEffect(() => {
    if (sessionStorage.getItem('boot-played')) setBootComplete(true)
  }, [])

  // Konami code listener — desktop only
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Skip if user is typing in an input
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      konamiBuffer.current = [...konamiBuffer.current, e.key].slice(-10)
      if (konamiBuffer.current.join(',') === KONAMI.join(',')) {
        setMatrixActive(true)
        konamiBuffer.current = []
      }
    }
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <main>
      <BootSequence onComplete={() => setBootComplete(true)} />
      <MatrixRain active={matrixActive} onDone={() => setMatrixActive(false)} />
      <Terminal onTriggerMatrix={() => setMatrixActive(true)} />
      <Hero bootComplete={bootComplete} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
