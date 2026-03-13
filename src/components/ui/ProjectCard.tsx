'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { cardVariant } from '@/lib/motion'
import TypewriterText from '@/components/ui/TypewriterText'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div variants={cardVariant}>
      <div
        className="terminal-window project-card h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="terminal-header">
          {`project-${String(index + 1).padStart(2, '0')} :: /opt/portfolio`}
        </div>

        <div className="terminal-content flex flex-col h-full gap-4">
          <div className="text-sm text-cyan/70">
            {hovered ? '> select' : '>'}{' '}
            <TypewriterText
              text={project.name}
              as="span"
              delay={index * 180}
              speed={24}
            />
          </div>

          <TypewriterText
            text={project.description}
            as="p"
            delay={220 + index * 180}
            speed={8}
            className="text-sm leading-relaxed text-cyan/78"
          />

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-auto text-sm text-cyan/80 hover:text-magenta transition-colors"
            >
              <span>{'>'}</span>
              <span>view source</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
