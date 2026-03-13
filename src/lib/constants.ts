import type { Project, Skill, Metric, NavLink } from './types'

export const PROJECTS: Project[] = [
  {
    name: 'Chrono',
    description:
      'Open-source rate-limiting library with virtual clock & distributed storage abstractions. Enables deterministic testing of time-sensitive logic across distributed nodes.',
    tags: ['Go', 'Distributed Systems', 'Open Source'],
    githubUrl: 'https://github.com/smit-1923',
  },
  {
    name: 'Redprint',
    description:
      'Backend infrastructure platform featuring a zero-downtime Firebase-to-PostgreSQL migration pipeline. Achieved 42% latency reduction and 2.1x throughput improvement post-migration.',
    tags: ['Go', 'Python', 'PostgreSQL', 'AWS'],
    githubUrl: 'https://github.com/smit-1923',
  },
  {
    name: 'AI Physician Recruiter',
    description:
      'Intelligent recruiting assistant built with LangGraph agents that automates candidate screening, scheduling, and matching — reducing time-to-hire by 38%.',
    tags: ['Python', 'LangGraph', 'AI/ML'],
    githubUrl: 'https://github.com/smit-1923',
  },
  {
    name: 'Forecast Engine',
    description:
      'Microservices-based forecast generation system with gRPC inter-service communication, JWT auth, and 99.9% availability SLA. Reduced job execution time by 38%.',
    tags: ['gRPC', 'Microservices', 'JWT Auth'],
    githubUrl: 'https://github.com/smit-1923',
  },
]

export const SKILLS: Skill[] = [
  { name: 'Go', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'gRPC', category: 'infrastructure' },
  { name: 'Docker', category: 'infrastructure' },
  { name: 'Kubernetes', category: 'infrastructure' },
  { name: 'AWS', category: 'infrastructure' },
  { name: 'Kafka', category: 'infrastructure' },
  { name: 'Raft Consensus', category: 'distributed' },
  { name: 'React', category: 'frontend' },
  { name: 'Firebase', category: 'database' },
  { name: 'LangChain', category: 'ai' },
  { name: 'Git', category: 'tooling' },
]

export const CATEGORY_COLORS: Record<Skill['category'], string> = {
  language: '#ffffff',
  database: '#ffffff',
  infrastructure: '#ffffff',
  distributed: '#ffffff',
  frontend: '#ffffff',
  ai: '#ffffff',
  tooling: '#666666',
}

export const METRICS: Metric[] = [
  { value: '42%', label: 'Latency Reduction' },
  { value: '2.1×', label: 'Throughput Increase' },
  { value: '99.9%', label: 'Availability SLA' },
  { value: '38%', label: 'Execution Improvement' },
]

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
