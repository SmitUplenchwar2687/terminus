import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Smit Uplenchwar — Backend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#000000',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scanline texture via box shadow rows */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 3px)',
          display: 'flex',
        }} />

        {/* Accent line top */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'rgba(0,240,255,0.4)',
          display: 'flex',
        }} />

        {/* Hash tag */}
        <div style={{
          fontSize: '14px',
          color: 'rgba(0,240,255,0.5)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '32px',
          display: 'flex',
        }}>
          smit@terminus:~/portfolio
        </div>

        {/* Name */}
        <div style={{
          fontSize: '80px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '24px',
          display: 'flex',
        }}>
          SMIT UPLENCHWAR
        </div>

        {/* Role */}
        <div style={{
          fontSize: '22px',
          color: '#00f0ff',
          letterSpacing: '0.06em',
          marginBottom: '48px',
          display: 'flex',
        }}>
          Backend &amp; Distributed Systems Engineer
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Go', 'Python', 'Distributed Systems', 'Kubernetes', 'AWS'].map((tag) => (
            <div key={tag} style={{
              fontSize: '14px',
              color: 'rgba(0,240,255,0.7)',
              border: '1px solid rgba(0,240,255,0.25)',
              padding: '6px 16px',
              display: 'flex',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '80px',
          fontSize: '14px',
          color: '#333',
          letterSpacing: '0.1em',
          display: 'flex',
        }}>
          terminus-smit.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
