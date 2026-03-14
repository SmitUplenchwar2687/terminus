export type ShapeType = 'dodecahedron' | 'box' | 'octahedron' | 'cone'

export interface Project {
  id: string
  number: string
  name: string
  description: string
  tagline: string
  fullDescription: string
  tags: string[]
  githubUrl: string
  shape: ShapeType
}
