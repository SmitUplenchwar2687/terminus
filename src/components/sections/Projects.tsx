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
    <section id="projects" ref={ref} className="relative py-28 px-6">
      {/* Section label */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-cyan/40 tracking-[0.4em] uppercase">
          02 // Projects
        </span>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold mt-3 text-white">
          What I&apos;ve Built
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-magenta to-transparent" />
      </motion.div>

      {/* Cards grid with stagger */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
