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
          DEFAULT: '#ffffff',
          500: '#ffffff',
        },
        magenta: {
          DEFAULT: '#ff6600',
          500: '#ff6600',
        },
        muted: {
          DEFAULT: '#666666',
          500: '#666666',
        },
      },
      fontFamily: {
        orbitron: ['"Clash Display"', 'sans-serif'],
        rajdhani: ['"Satoshi"', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
