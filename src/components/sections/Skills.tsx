'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/motion'
import TypewriterText from '@/components/ui/TypewriterText'

const SkillsCloud = dynamic(() => import('@/components/3d/SkillsCloud'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-mono text-xs text-cyan/40 animate-pulse tracking-widest">
        parsing skills output...
      </span>
    </div>
  ),
})

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <TypewriterText
          text="03 // skills"
          as="span"
          start={isInView}
          className="font-mono text-xs text-cyan/52 tracking-[0.3em] uppercase"
        />
        <TypewriterText
          text="cat skills.json"
          as="h2"
          start={isInView}
          delay={200}
          className="font-orbitron text-3xl md:text-4xl font-normal mt-3 text-cyan"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="terminal-window"
        >
          <div className="terminal-header">
            {"$ cat skills.json | jq '.categories[]'"}
          </div>
          <div className="terminal-content">
            <SkillsCloud />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
