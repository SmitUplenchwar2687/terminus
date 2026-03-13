'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { METRICS } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/motion'

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(+(target * eased).toFixed(target % 1 !== 0 ? 1 : 0))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target])

  return <>{val}{suffix}</>
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32">
      <div className="section-shell" ref={ref}>
        <div className="terminal-header">
          <span className="terminal-header-text">{'// 01 — ABOUT'}</span>
          <div className="terminal-header-line" />
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'Satoshi, sans-serif',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#e0e0e0',
            maxWidth: '640px',
          }}
        >
          Software Engineer with 4+ years designing and scaling distributed backend systems in{' '}
          <span style={{ color: '#fff' }}>Go and Python</span> on AWS and Kubernetes. Currently at{' '}
          <span style={{ color: '#fff' }}>Radiant</span>, building high-throughput event-driven
          pipelines and backend infrastructure. M.S. Computer Science,{' '}
          <span style={{ color: '#fff' }}>University at Buffalo</span>. I care about correctness,
          fault tolerance, and systems that hold together under load.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {METRICS.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <div className="metric-number">
                <CountUp target={m.value} suffix={m.suffix} active={isInView} />
              </div>
              <div className="metric-label">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
