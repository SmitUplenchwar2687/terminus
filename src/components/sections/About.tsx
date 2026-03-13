'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer, metricVariant } from '@/lib/motion'
import { METRICS } from '@/lib/constants'
import TypewriterText from '@/components/ui/TypewriterText'

const AboutOrb = dynamic(() => import('@/components/3d/AboutOrb'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <TypewriterText
          text="01 // about"
          as="span"
          start={isInView}
          className="font-mono text-xs text-cyan/52 tracking-[0.3em] uppercase"
        />
        <TypewriterText
          text="whoami"
          as="h2"
          start={isInView}
          delay={220}
          className="font-orbitron text-3xl md:text-4xl font-normal mt-3 text-cyan"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-10 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUpVariant} className="terminal-window neon-border-cyan">
            <div className="terminal-header">$ whoami</div>
            <div className="terminal-content">
              <TypewriterText
                text="smit | application engineer @ radiant | ms cs buffalo '25 | distributed systems | backend infra | things that scale"
                as="p"
                start={isInView}
                delay={280}
                speed={10}
                className="text-cyan/84 leading-relaxed"
              />
              <TypewriterText
                text="focused on correctness, performance, and systems that hold up under pressure"
                as="p"
                start={isInView}
                delay={980}
                speed={12}
                className="text-cyan/68 mt-4 leading-relaxed"
              />
              <TypewriterText
                text="thinking about cap theorem trade-offs, grpc service meshes, and why distributed clocks are impossibly hard"
                as="p"
                start={isInView}
                delay={1480}
                speed={12}
                className="text-cyan/68 mt-4 leading-relaxed"
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {METRICS.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={metricVariant}
                className="terminal-window"
              >
                <div className="terminal-content text-center">
                  <TypewriterText
                    text={metric.value}
                    as="div"
                    start={isInView}
                    delay={400 + index * 180}
                    speed={32}
                    className="font-orbitron text-2xl font-normal text-cyan neon-text-cyan"
                  />
                  <TypewriterText
                    text={metric.label.toLowerCase()}
                    as="div"
                    start={isInView}
                    delay={560 + index * 180}
                    speed={18}
                    className="font-mono text-[0.65rem] text-cyan/52 tracking-widest mt-1 uppercase"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:block w-[220px] h-[220px] mx-auto terminal-window"
        >
          <AboutOrb />
        </motion.div>
      </div>
    </section>
  )
}
