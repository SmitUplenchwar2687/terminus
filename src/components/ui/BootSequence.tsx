'use client'
import { useEffect, useRef, useState } from 'react'

const LINES = [
  { prefix: '[BIOS]', rest: ' TERMINUS v2.0.26 — SYSTEM BOOT', prefixColor: '#e0e0e0' },
  { prefix: '[OK]',   rest: ' Loading kernel modules...',        prefixColor: '#00f0ff' },
  { prefix: '[OK]',   rest: ' Initializing neural mesh...',      prefixColor: '#00f0ff' },
  { prefix: '[OK]',   rest: ' Mounting /dev/portfolio...',       prefixColor: '#00f0ff' },
  { prefix: '[OK]',   rest: ' Establishing secure connection...', prefixColor: '#00f0ff' },
  { prefix: '[OK]',   rest: ' Compiling experience data...',     prefixColor: '#00f0ff' },
  { prefix: '[WARN]', rest: ' Talent level: EXCEPTIONAL',        prefixColor: '#f59e0b' },
  { prefix: '[OK]',   rest: ' Rendering interface...',           prefixColor: '#00f0ff' },
  { prefix: '[OK]',   rest: ' sudo protocols: armed. rm -rf: do not.',   prefixColor: '#00f0ff' },
  { prefix: '>',      rest: ' READY',                            prefixColor: '#ffffff' },
]

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

interface Props {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: Props) {
  // show is only true when boot is actually playing — never on second visits or SSR
  const [show, setShow] = useState(false)
  const [fading, setFading] = useState(false)
  const [completedLines, setCompletedLines] = useState<typeof LINES>([])
  const [typingText, setTypingText] = useState('')
  const [typingPrefixLen, setTypingPrefixLen] = useState(0)
  const [typingPrefixColor, setTypingPrefixColor] = useState('#00f0ff')
  // Use a ref for onComplete to avoid re-triggering the effect when the callback reference changes
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const dead = useRef(false)

  useEffect(() => {
    dead.current = false

    if (sessionStorage.getItem('boot-played')) {
      // Already played — skip overlay entirely, just unblock the site
      onCompleteRef.current()
      return
    }

    // First visit — show the overlay and play the sequence
    setShow(true)

    async function run() {
      for (const line of LINES) {
        if (dead.current) return
        // Short delay between lines: feels snappy, not slow
        await sleep(80 + Math.random() * 120)

        const full = line.prefix + line.rest
        setTypingPrefixLen(line.prefix.length)
        setTypingPrefixColor(line.prefixColor)

        // 8ms per character — fast enough to feel like a machine, total ~2.5s
        for (let i = 1; i <= full.length; i++) {
          if (dead.current) return
          await sleep(8)
          setTypingText(full.slice(0, i))
        }

        setCompletedLines(prev => [...prev, line])
        setTypingText('')
      }

      await sleep(350)
      setFading(true)
      sessionStorage.setItem('boot-played', '1')
      await sleep(700)
      setShow(false)
      onCompleteRef.current()
    }

    run()
    return () => { dead.current = true }
  }, []) // stable — onComplete accessed via ref

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.7s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <div style={{ width: 'min(600px, calc(100vw - 3rem))' }}>
        {completedLines.map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
            lineHeight: 2.1,
            letterSpacing: '0.04em',
          }}>
            <span style={{ color: line.prefixColor }}>{line.prefix}</span>
            <span style={{ color: line.prefix === '>' ? '#00f0ff' : '#555' }}>{line.rest}</span>
          </div>
        ))}

        {typingText.length > 0 && (
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
            lineHeight: 2.1,
            letterSpacing: '0.04em',
          }}>
            <span style={{ color: typingPrefixColor }}>{typingText.slice(0, typingPrefixLen)}</span>
            <span style={{ color: '#555' }}>{typingText.slice(typingPrefixLen)}</span>
            <span style={{
              display: 'inline-block', width: 8, height: '1em',
              background: '#00f0ff', marginLeft: 2,
              verticalAlign: 'text-bottom',
              animation: 'blink 0.9s step-end infinite',
            }} />
          </div>
        )}
      </div>
    </div>
  )
}
