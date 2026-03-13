'use client'
import { useEffect, useState } from 'react'

const LINES = [
  "$ cat skills.json | jq '.categories[]'",
  '> languages: go, python',
  '> infra: grpc, docker, kubernetes, aws, kafka',
  '> databases: postgresql, redis, firebase',
  '> distributed: raft consensus',
  '> frontend: react',
  '> ai/ml: langchain',
  '> tooling: git',
]

export default function SkillsCloud() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<string[]>([''])

  useEffect(() => {
    if (lineIndex >= LINES.length) return

    const currentLine = LINES[lineIndex]
    const timeout = setTimeout(() => {
      const nextCharIndex = charIndex + 1
      const updated = [...visibleLines]
      updated[lineIndex] = currentLine.slice(0, nextCharIndex)
      setVisibleLines(updated)

      if (nextCharIndex >= currentLine.length) {
        setLineIndex((value) => value + 1)
        setCharIndex(0)
        setVisibleLines((value) => [...value, ''])
      } else {
        setCharIndex(nextCharIndex)
      }
    }, lineIndex === 0 ? 16 : 10)

    return () => clearTimeout(timeout)
  }, [charIndex, lineIndex, visibleLines])

  return (
    <div className="text-left">
      {visibleLines.map((line, index) => (
        <div key={index} className="terminal-line text-sm md:text-base text-cyan/84">
          {line}
          {index === lineIndex && lineIndex < LINES.length ? <span className="typewriter-cursor">_</span> : null}
        </div>
      ))}
    </div>
  )
}
