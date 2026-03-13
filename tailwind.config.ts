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
        background: '#000000',
        cyan: {
          DEFAULT: '#00ff41',
          500: '#00ff41',
        },
        magenta: {
          DEFAULT: '#39ff14',
          500: '#39ff14',
        },
        'dim-green': {
          DEFAULT: '#0a3d0a',
          500: '#0a3d0a',
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'monospace'],
        rajdhani: ['var(--font-orbitron)', 'monospace'],
        mono: ['var(--font-orbitron)', 'monospace'],
      },
      keyframes: {
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.55' },
        },
      },
      animation: {
        'scroll-bounce': 'scroll-bounce 1.6s steps(2, end) infinite',
      },
    },
  },
  plugins: [],
}

export default config
