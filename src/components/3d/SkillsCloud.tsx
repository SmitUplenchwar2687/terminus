'use client'
import { SKILLS } from '@/lib/constants'

export default function SkillsCloud() {
  const items = SKILLS.map((skill) => skill.name)
  const ticker = [...items, ...items]

  return (
    <div className="ticker-shell py-6">
      <div className="ticker-track">
        {ticker.map((skill, index) => (
          <span key={`${skill}-${index}`} className="ticker-item">
            {skill}
            <span className="text-muted"> · </span>
          </span>
        ))}
      </div>
    </div>
  )
}
