'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer, metricVariant } from '@/lib/motion'
import { METRICS } from '@/lib/constants'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="px-6 py-40">
      <div className="section-shell">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-[760px]"
        >
          <span className="mono-line text-xs uppercase tracking-[0.24em] text-muted">
            01 / about
          </span>
          <h2 className="mt-4 font-orbitron text-4xl md:text-6xl leading-none text-white">
            Quiet systems,
            <span className="text-magenta"> loud outcomes.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-14 md:grid-cols-[minmax(0,1fr)_260px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.p variants={fadeUpVariant} className="text-lg leading-relaxed text-white">
              Application Engineer at <span className="text-white">Radiant</span>. M.S. Computer
              Science, University at Buffalo.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="text-lg leading-relaxed text-muted">
              I&apos;m passionate about distributed systems, backend infrastructure, and building
              things that scale. Whether it&apos;s designing rate-limiting libraries with Raft
              consensus, migrating databases at zero downtime, or wiring up AI agents — I care
              about correctness, performance, and systems that hold up under pressure.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="text-lg leading-relaxed text-muted">
              When I&apos;m not deep in Go or Python, I&apos;m thinking about CAP theorem
              trade-offs, gRPC service meshes, and why distributed clocks are impossibly hard.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            {METRICS.map((metric) => (
              <motion.div key={metric.label} variants={metricVariant} className="border-b border-[#222] pb-5">
                <div className="font-orbitron text-3xl leading-none text-white">{metric.value}</div>
                <div className="mt-2 mono-line text-xs uppercase tracking-[0.18em] text-muted">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
