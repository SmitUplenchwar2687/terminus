'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer } from '@/lib/motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/constants'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="px-6 py-40">
      <div className="section-shell">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-[720px]"
        >
          <span className="mono-line text-xs uppercase tracking-[0.24em] text-muted">
            02 / projects
          </span>
          <h2 className="mt-4 font-orbitron text-4xl md:text-6xl leading-none text-white">
            Selected work.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
