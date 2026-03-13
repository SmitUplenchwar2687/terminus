export interface Project {
  name: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Skill {
  name: string
  category: 'language' | 'database' | 'infrastructure' | 'distributed' | 'frontend' | 'ai' | 'tooling'
}

export interface Metric {
  value: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}
