'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer, metricVariant } from '@/lib/motion'
import { METRICS } from '@/lib/constants'

const AboutOrb = dynamic(() => import('@/components/3d/AboutOrb'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6">
      {/* Section label */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-cyan/40 tracking-[0.4em] uppercase">
          01 // About
        </span>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold mt-3 text-white">
          Who I Am
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-10 items-center">
        {/* ── Text card ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUpVariant} className="glass rounded-lg p-8 neon-border-cyan">
            <p className="font-rajdhani text-gray-300 text-lg leading-relaxed">
              Application Engineer at{' '}
              <span className="text-cyan font-semibold">Radiant</span>.
              {' '}M.S. Computer Science, University at Buffalo.
            </p>
            <p className="font-rajdhani text-gray-400 mt-4 leading-relaxed">
              I&apos;m passionate about distributed systems, backend infrastructure, and{' '}
              <span className="text-cyan/90">building things that scale</span>. Whether it&apos;s
              designing rate-limiting libraries with Raft consensus, migrating databases at zero
              downtime, or wiring up AI agents — I care about correctness, performance, and systems
              that hold up under pressure.
            </p>
            <p className="font-rajdhani text-gray-400 mt-4 leading-relaxed">
              When I&apos;m not deep in Go or Python, I&apos;m thinking about CAP theorem trade-offs,
              gRPC service meshes, and why distributed clocks are impossibly hard.
            </p>
          </motion.div>

          {/* ── Metrics grid ── */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {METRICS.map((metric) => (
              <motion.div
                key={metric.label}
                variants={metricVariant}
                className="glass rounded-lg p-4 text-center neon-border-cyan"
              >
                <div className="font-orbitron text-2xl font-black text-cyan neon-text-cyan">
                  {metric.value}
                </div>
                <div className="font-mono text-[0.6rem] text-gray-400 tracking-widest mt-1 uppercase">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── 3D orb decoration ── */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:block w-[220px] h-[220px] mx-auto"
        >
          <AboutOrb />
        </motion.div>
      </div>
    </section>
  )
}
