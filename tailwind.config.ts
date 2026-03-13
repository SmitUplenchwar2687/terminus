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
        background: '#0a0a0f',
        cyan: {
          DEFAULT: '#00f0ff',
          500: '#00f0ff',
        },
        magenta: {
          DEFAULT: '#ff00e5',
          500: '#ff00e5',
        },
        'electric-blue': {
          DEFAULT: '#0040ff',
          500: '#0040ff',
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        mono: ['var(--font-share-tech-mono)', 'monospace'],
      },
      keyframes: {
        'glitch-before': {
          '0%, 89%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '90%': { transform: 'translateX(-4px)', opacity: '0.8' },
          '92%': { transform: 'translateX(4px)', opacity: '0.9' },
          '94%': { transform: 'translateX(-2px)' },
          '96%': { transform: 'translateX(0)' },
        },
        'glitch-after': {
          '0%, 84%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '85%': { transform: 'translateX(3px)', opacity: '0.8' },
          '87%': { transform: 'translateX(-3px)', opacity: '0.9' },
          '89%': { transform: 'translateX(1px)' },
          '91%': { transform: 'translateX(0)' },
        },
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff, inset 0 0 5px rgba(0,240,255,0.1)',
          },
          '50%': {
            boxShadow:
              '0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 60px rgba(0,240,255,0.4), inset 0 0 10px rgba(0,240,255,0.2)',
          },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
      },
      animation: {
        'glitch-before': 'glitch-before 3s infinite',
        'glitch-after': 'glitch-after 3s infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'scroll-bounce': 'scroll-bounce 1.5s ease-in-out infinite',
        flicker: 'flicker 4s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
