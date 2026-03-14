'use client'

interface Props {
  started: boolean
  fontSize: string
}

export default function AnimatedSignature({ started, fontSize }: Props) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.85 }}>
      {/* Invisible ghost — holds layout size */}
      <span aria-hidden style={{
        fontFamily: 'Clash Display, sans-serif',
        fontSize, fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'transparent',
        display: 'block',
        userSelect: 'none',
      }}>
        SMIT
      </span>

      {/* Revealed text — clip-path sweeps left → right */}
      <span style={{
        position: 'absolute', inset: 0,
        fontFamily: 'Clash Display, sans-serif',
        fontSize, fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        clipPath: started ? undefined : 'inset(0 100% 0 0)',
        animation: started ? 'sig-reveal 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards' : 'none',
      }}>
        SMIT
      </span>

      {/* Traveling cyan curtain line */}
      {started && (
        <span aria-hidden style={{
          position: 'absolute',
          top: '8%', bottom: '8%', width: 3,
          background: 'linear-gradient(to bottom, transparent, #00f0ff 30%, #00f0ff 70%, transparent)',
          boxShadow: '0 0 14px 3px rgba(0,240,255,0.65)',
          animation: 'sig-line 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  )
}
