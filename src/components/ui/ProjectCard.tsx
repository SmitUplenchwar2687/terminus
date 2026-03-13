'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { cardVariant } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div variants={cardVariant}>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card block py-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[64px_minmax(0,1fr)_auto] gap-3 md:gap-6 items-baseline">
            <span className="mono-line text-sm text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-3 min-w-0">
              <span className={`text-sm ${hovered ? 'text-magenta' : 'text-transparent'}`}>
                &gt;
              </span>
              <h3 className="font-orbitron text-2xl md:text-[2rem] leading-none truncate">
                {project.name}
              </h3>
            </div>
            <div className="mono-line text-sm text-muted md:text-right">
              {project.tags.join(' · ')}
            </div>
          </div>

          <p className="max-w-3xl pl-0 md:pl-[76px] text-base leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </a>
    </motion.div>
  )
}
