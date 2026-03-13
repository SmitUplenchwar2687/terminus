'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant } from '@/lib/motion'

const SkillsCloud = dynamic(() => import('@/components/3d/SkillsCloud'), {
  ssr: false,
  loading: () => <div className="h-[72px]" />,
})

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="px-6 py-40">
      <div className="section-shell">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-[720px]"
        >
          <span className="mono-line text-xs uppercase tracking-[0.24em] text-muted">
            03 / skills
          </span>
          <h2 className="mt-4 font-orbitron text-4xl md:text-6xl leading-none text-white">
            Tools in motion.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20"
        >
          <SkillsCloud />
        </motion.div>
      </div>
    </section>
  )
}
