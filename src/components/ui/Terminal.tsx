'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { EXPERIENCE, SKILL_CATEGORIES, PROJECTS } from '@/lib/constants'
import { useIsMobile } from '@/hooks/useIsMobile'

const LAUNCH_DATE = new Date('2026-03-14')
function getUptime() { return Math.max(0, Math.floor((Date.now() - LAUNCH_DATE.getTime()) / 86400000)) }
function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

const GLITCH_CHARS = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01ABCDEF$#@!%^&*'
function randomGibberish() {
  return Array.from({ length: 48 + Math.floor(Math.random() * 18) }, () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  ).join('')
}

type Line = { id: number; content: ReactNode }
let _id = 0
const mk = (content: ReactNode): Line => ({ id: _id++, content })

const HELP_TEXT = `  help            List all commands
  whoami          Who is visiting?
  about           Smit's bio
  ls              List portfolio contents
  ls projects     List all projects
  cat resume.txt  View resume link
  skills          Tech stack by category
  experience      Work history (condensed)
  cd [section]    Navigate to section
  clear           Clear terminal
  echo [text]     Echo text
  date            Current date and time
  uptime          Portfolio uptime
  github          Open GitHub profile
  linkedin        Open LinkedIn profile
  email           Open email client
  history         Command history
  neofetch        System info
  sudo [?]        elevated clearance required
  rm -rf [?]      classified — use at own risk
  ↑↑↓↓←→←→BA     desktop only`

const HIRE_BOX = `╔═══════════════════════════════════════════════╗
║                                               ║
║   HIRE REQUEST APPROVED.                      ║
║                                               ║
║   Candidate: Smit Uplenchwar                  ║
║   Clearance: FULL STACK + DISTRIBUTED SYS     ║
║   Threat Level: Will mass refactor to Go      ║
║                                               ║
╚═══════════════════════════════════════════════╝`

function Neofetch({ uptime }: { uptime: number }) {
  return (
    <pre style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.75rem', lineHeight: 1.8, margin: 0, color: '#00f0ff' }}>
{`  ╔══════════════════════════════╗
  ║  SMIT UPLENCHWAR             ║
  ╚══════════════════════════════╝
  OS:      Terminus v2.0
  Role:    Software Engineer @ Radiant
  Stack:   Go · Python · PostgreSQL · AWS
  Shell:   zsh 5.9
  Uptime:  ${uptime} day${uptime !== 1 ? 's' : ''}
  GitHub:  smituplenchwar2687`}
    </pre>
  )
}

interface Props { onTriggerMatrix: () => void }

export default function Terminal({ onTriggerMatrix }: Props) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const [inputVal, setInputVal] = useState('')
  const [lines, setLines] = useState<Line[]>([
    mk(<span style={{ color: '#00f0ff' }}>Welcome to Terminus v2.0 — type <span style={{ color: '#e0e0e0' }}>help</span> for available commands.</span>)
  ])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)
  const onTriggerMatrixRef = useRef(onTriggerMatrix)
  onTriggerMatrixRef.current = onTriggerMatrix

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key === '`') {
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function addLine(content: ReactNode) {
    setLines(prev => [...prev, mk(content)])
  }

  const handleCommand = useCallback(async (raw: string) => {
    if (busyRef.current) return
    const input = raw.trim()
    addLine(<span><span style={{ color: '#00f0ff' }}>visitor@smit.dev:~$</span>{' '}{input}</span>)
    if (!input) return
    setCmdHistory(prev => [input, ...prev])
    setHistoryIdx(-1)

    const parts = input.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Easter egg: sudo hire smit
    if (input.toLowerCase() === 'sudo hire smit') {
      busyRef.current = true
      for (let i = 0; i < 13; i++) {
        await sleep(55)
        addLine(<span style={{ color: '#00ff41', fontSize: '0.68rem' }}>{randomGibberish()}</span>)
      }
      await sleep(180)
      addLine(<span style={{ color: '#e0e0e0' }}>[SUDO] Password: <span style={{ color: '#333' }}>************</span></span>)
      await sleep(320)
      addLine(<span style={{ color: '#00f0ff' }}>[AUTH] Access granted.</span>)
      await sleep(180)
      addLine(
        <pre style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.72rem', lineHeight: 1.7, margin: 0, color: '#00f0ff' }}>
          {HIRE_BOX.replace('HIRE REQUEST APPROVED.', '')}
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>{'HIRE REQUEST APPROVED.'}</span>
          {HIRE_BOX.split('HIRE REQUEST APPROVED.').slice(1).join('')}
        </pre>
      )
      addLine(<span style={{ color: '#00f0ff', paddingLeft: '2ch' }}>  → <a href="mailto:smituplenchwar02@gmail.com" style={{ color: '#00f0ff', textDecoration: 'underline' }}>smituplenchwar02@gmail.com</a></span>)
      addLine(<span style={{ color: '#00f0ff', paddingLeft: '2ch' }}>  → <a href="https://linkedin.com/in/smit-uplenchwar" target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff', textDecoration: 'underline' }}>linkedin.com/in/smit-uplenchwar</a></span>)
      busyRef.current = false
      return
    }

    // Easter egg: rm -rf /
    if (cmd === 'rm' && args.includes('-rf')) {
      document.body.classList.add('page-glitch')
      setTimeout(() => document.body.classList.remove('page-glitch'), 1600)
      addLine(<span style={{ color: '#f59e0b' }}>nice try. 😏</span>)
      return
    }

    // Easter egg: matrix
    if (cmd === 'matrix') {
      onTriggerMatrixRef.current()
      addLine(<span style={{ color: '#00ff41' }}>Initiating matrix protocol...</span>)
      return
    }

    switch (cmd) {
      case 'help':
        addLine(<span style={{ color: '#e0e0e0' }}>Available commands:</span>)
        addLine(<pre style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.74rem', lineHeight: 1.85, margin: 0, color: '#555' }}>{HELP_TEXT}</pre>)
        break

      case 'whoami':
        addLine(<span style={{ color: '#666' }}>visitor — currently exploring smit&apos;s portfolio</span>)
        break

      case 'about':
        addLine(<span style={{ color: '#888', lineHeight: 1.8 }}>Backend &amp; Distributed Systems Engineer with 4+ years building high-throughput fault-tolerant systems. Currently at Radiant. M.S. Computer Science, University at Buffalo. Specializes in Go, Python, distributed infrastructure, and event-driven architectures.</span>)
        break

      case 'ls':
        if (args[0] === 'projects') {
          PROJECTS.forEach(p => addLine(
            <span>
              <span style={{ color: '#00f0ff' }}>{p.name.toLowerCase()}</span>
              <span style={{ color: '#2a2a2a' }}>  —  </span>
              <span style={{ color: '#555' }}>{p.description.slice(0, 72)}…</span>
            </span>
          ))
        } else {
          addLine(<span style={{ color: '#00f0ff' }}>about/{'  '}experience/{'  '}projects/{'  '}skills/{'  '}contact/{'  '}<span style={{ color: '#666' }}>resume.pdf</span></span>)
        }
        break

      case 'cat':
        if (args[0] === 'resume.txt') {
          addLine(<span>Resume: <a href="https://drive.google.com/smit-resume" target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff', textDecoration: 'underline' }}>drive.google.com/smit-resume</a></span>)
        } else {
          addLine(<span style={{ color: '#f59e0b' }}>cat: {args[0] ?? '(no file)'}: No such file or directory</span>)
        }
        break

      case 'skills':
        SKILL_CATEGORIES.forEach(cat => addLine(
          <span>
            <span style={{ color: '#00f0ff', opacity: 0.7 }}>{cat.label}:</span>
            {' '}
            <span style={{ color: '#666' }}>{cat.skills.join('  ·  ')}</span>
          </span>
        ))
        break

      case 'experience':
        EXPERIENCE.forEach(job => addLine(
          <span style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ color: '#e0e0e0', minWidth: '13ch' }}>{job.company}</span>
            <span style={{ color: '#00f0ff', opacity: 0.8, minWidth: '26ch' }}>{job.role}</span>
            <span style={{ color: '#444' }}>{job.period}</span>
          </span>
        ))
        break

      case 'cd': {
        const target = (args[0] ?? '').replace(/^\//, '').toLowerCase()
        const valid = ['about', 'experience', 'projects', 'skills', 'contact', 'hero']
        if (valid.includes(target)) {
          addLine(<span style={{ color: '#666' }}>Navigating to /{target}…</span>)
          setTimeout(() => { document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }, 300)
        } else {
          addLine(<span style={{ color: '#f59e0b' }}>cd: {target || '(missing target)'}: No such section</span>)
          addLine(<span style={{ color: '#444' }}>Available: about  experience  projects  skills  contact</span>)
        }
        break
      }

      case 'clear':
        setLines([])
        break

      case 'echo':
        addLine(<span style={{ color: '#666' }}>{args.join(' ')}</span>)
        break

      case 'date':
        addLine(<span style={{ color: '#666' }}>{new Date().toString()}</span>)
        break

      case 'uptime':
        addLine(<span style={{ color: '#666' }}>Portfolio has been live for <span style={{ color: '#00f0ff' }}>{getUptime()} days</span></span>)
        break

      case 'github':
        window.open('https://github.com/smituplenchwar2687', '_blank')
        addLine(<span style={{ color: '#666' }}>Opening GitHub profile…</span>)
        break

      case 'linkedin':
        window.open('https://linkedin.com/in/smit-uplenchwar', '_blank')
        addLine(<span style={{ color: '#666' }}>Opening LinkedIn profile…</span>)
        break

      case 'email':
        window.location.href = 'mailto:smituplenchwar02@gmail.com'
        addLine(<span style={{ color: '#666' }}>Opening email client…</span>)
        break

      case 'history':
        if (cmdHistory.length === 0) {
          addLine(<span style={{ color: '#444' }}>No history yet.</span>)
        } else {
          [...cmdHistory].reverse().forEach((h, i) =>
            addLine(<span style={{ color: '#444' }}>{String(i + 1).padStart(3, ' ')}{'  '}{h}</span>)
          )
        }
        break

      case 'neofetch':
        addLine(<Neofetch uptime={getUptime()} />)
        break

      default:
        addLine(<span style={{ color: '#f59e0b' }}>command not found: <span style={{ color: '#e0e0e0' }}>{cmd}</span>. Type <span style={{ color: '#e0e0e0' }}>help</span> for available commands.</span>)
    }
  }, [cmdHistory])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      if (cmdHistory[next] !== undefined) setInputVal(cmdHistory[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInputVal(next === -1 ? '' : (cmdHistory[next] ?? ''))
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(p => !p)}
        data-cursor-grow="true"
        aria-label="Toggle terminal"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000,
          width: 48, height: 48,
          background: open ? 'rgba(0,240,255,0.08)' : '#000',
          border: `1px solid ${open ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.2)'}`,
          color: '#00f0ff',
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: '0.82rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 0 20px rgba(0,240,255,0.2)' : '0 0 8px rgba(0,240,255,0.06)',
          transition: 'all 0.2s ease',
        }}
      >
        {open ? '×' : '>_'}
      </button>

      {/* Terminal panel */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: open ? (isMobile ? 'clamp(320px, 55vh, 520px)' : 'clamp(300px, 42vh, 420px)') : 0,
        zIndex: 999,
        background: '#000',
        borderTop: open ? '1px solid rgba(0,240,255,0.25)' : 'none',
        boxShadow: open ? '0 -6px 40px rgba(0,240,255,0.06)' : 'none',
        display: 'flex', flexDirection: 'column',
        transition: 'height 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        fontFamily: 'var(--font-jetbrains-mono)',
      }}>
        {/* Tab bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '0.4rem 1.25rem',
          borderBottom: '1px solid #0d0d0d',
          flexShrink: 0,
        }}>
          <span style={{ color: '#00f0ff', fontSize: '0.6rem', letterSpacing: '0.18em' }}>TERMINAL</span>
          <span style={{ flex: 1 }} />
          <span style={{ color: '#222', fontSize: '0.58rem', letterSpacing: '0.08em' }}>
            {isMobile ? 'tap × to close' : '` to toggle  ·  esc to close'}
          </span>
        </div>

        {/* Output */}
        <div ref={outputRef} style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
          {lines.map(line => (
            <div key={line.id} style={{ fontSize: '0.76rem', lineHeight: 1.75 }}>{line.content}</div>
          ))}
        </div>

        {/* Input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1.25rem',
          borderTop: '1px solid #0d0d0d',
          flexShrink: 0,
        }}>
          <span style={{ color: '#00f0ff', fontSize: '0.76rem', whiteSpace: 'nowrap' }}>visitor@smit.dev:~$</span>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: '#e0e0e0', fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '0.76rem', caretColor: '#00f0ff',
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            enterKeyHint="send"
            inputMode="text"
          />
        </div>
      </div>
    </>
  )
}
