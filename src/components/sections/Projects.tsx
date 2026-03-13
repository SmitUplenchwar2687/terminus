'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariant, staggerContainer } from '@/lib/motion'
import ProjectCard from '@/components/ui/ProjectCard'
import TypewriterText from '@/components/ui/TypewriterText'
import { PROJECTS } from '@/lib/constants'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <TypewriterText
          text="02 // projects"
          as="span"
          start={isInView}
          className="font-mono text-xs text-cyan/52 tracking-[0.3em] uppercase"
        />
        <TypewriterText
          text="ls ./projects"
          as="h2"
          start={isInView}
          delay={200}
          className="font-orbitron text-3xl md:text-4xl font-normal mt-3 text-cyan"
        />
      </motion.div>

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
