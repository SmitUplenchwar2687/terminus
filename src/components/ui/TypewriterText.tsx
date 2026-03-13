'use client'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3'
  start?: boolean
  delay?: number
  speed?: number
  cursor?: boolean
}

export default function TypewriterText({
  text,
  className = '',
  as: Tag = 'span',
  start = true,
  delay = 0,
  speed = 18,
  cursor = false,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!start || started) return
    setStarted(true)

    let index = 0
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))

        if (index >= text.length && interval) {
          clearInterval(interval)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [delay, speed, start, started, text])

  return (
    <Tag className={className} aria-label={text}>
      {displayed}
      {cursor && displayed.length < text.length ? <span className="typewriter-cursor">_</span> : null}
    </Tag>
  )
}
