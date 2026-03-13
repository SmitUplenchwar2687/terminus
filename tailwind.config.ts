import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050510',
        // Override "cyan" to map to the primary cosmic purple —
        // all existing text-cyan / border-cyan / etc. classes retheme automatically.
        cyan: {
          DEFAULT: '#7c3aed',
          500: '#7c3aed',
        },
        // Override "magenta" → nebula pink
        magenta: {
          DEFAULT: '#f472b6',
          500: '#f472b6',
        },
        // New accent
        'cosmic-blue': {
          DEFAULT: '#60a5fa',
          500: '#60a5fa',
        },
        'cosmic-purple': {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dim: 'rgba(124,58,237,0.15)',
        },
      },
      fontFamily: {
        // Variable names unchanged — section components keep working.
        // Space Grotesk replaces Orbitron; Inter replaces Rajdhani.
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        mono: ['var(--font-share-tech-mono)', 'monospace'],
      },
      keyframes: {
        // ── Shimmer — traveling highlight across text ──────────────────────
        'shimmer-travel': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        // ── Gentle float ───────────────────────────────────────────────────
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        // ── Slow pulse for glow rings ──────────────────────────────────────
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 8px rgba(124,58,237,0.4), 0 0 20px rgba(124,58,237,0.2), inset 0 0 8px rgba(124,58,237,0.06)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(124,58,237,0.7), 0 0 40px rgba(124,58,237,0.35), 0 0 60px rgba(96,165,250,0.2), inset 0 0 15px rgba(124,58,237,0.12)',
          },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':       { transform: 'translateY(8px)', opacity: '0.5' },
        },
        // ── Twinkle for star accents ───────────────────────────────────────
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.3', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'shimmer-travel': 'shimmer-travel 4s linear infinite',
        'cosmic-float':   'cosmic-float 6s ease-in-out infinite',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        'scroll-bounce':  'scroll-bounce 1.8s ease-in-out infinite',
        twinkle:          'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
