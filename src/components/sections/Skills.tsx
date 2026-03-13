'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer, skillTagVariant } from '@/lib/motion'
import { SKILLS, CATEGORY_COLORS } from '@/lib/constants'
import { useIsMobile } from '@/hooks/useIsMobile'

const SkillsCloud = dynamic(() => import('@/components/3d/SkillsCloud'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-mono text-xs text-cyan/30 animate-pulse tracking-widest">
        RENDERING...
      </span>
    </div>
  ),
})

// Category display names for the legend
const CATEGORY_LABELS: Record<string, string> = {
  language:       'Languages',
  database:       'Databases',
  infrastructure: 'Infrastructure',
  distributed:    'Distributed',
  frontend:       'Frontend',
  ai:             'AI / ML',
  tooling:        'Tooling',
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6">
      {/* Section label */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-cyan/40 tracking-[0.4em] uppercase">
          03 // Skills
        </span>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold mt-3 text-white">
          Tech Stack
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* 3D skills cloud — desktop only; mobile gets flat grid */}
        {!isMobile ? (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full h-[420px] mb-12"
          >
            <SkillsCloud />
          </motion.div>
        ) : (
          // Mobile flat-grid fallback
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {SKILLS.map((skill) => (
              <motion.span
                key={skill.name}
                variants={skillTagVariant}
                className="font-mono text-sm px-3 py-1.5 rounded border transition-all duration-300"
                style={{
                  color: CATEGORY_COLORS[skill.category],
                  borderColor: `${CATEGORY_COLORS[skill.category]}40`,
                  background: `${CATEGORY_COLORS[skill.category]}0a`,
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Category legend */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-4"
        >
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <motion.div
              key={key}
              variants={skillTagVariant}
              className="flex items-center gap-2"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] }}
              />
              <span className="font-mono text-[0.65rem] text-gray-500 tracking-wider uppercase">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
