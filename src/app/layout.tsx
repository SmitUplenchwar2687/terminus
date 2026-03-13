import type { Metadata } from 'next'
import { Orbitron, Rajdhani, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import ScanlineOverlay from '@/components/ui/ScanlineOverlay'
import GridBackground from '@/components/ui/GridBackground'

// ─── Fonts ─────────────────────────────────────────────────────────────────
// All fonts loaded here once via next/font and exposed as CSS variables.
// Tailwind's fontFamily config consumes these vars.

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '800', '900'],
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
  weight: '400',
  display: 'swap',
})

// ─── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Smit Uplenchwar — Backend & Distributed Systems Engineer',
  description:
    'Portfolio of Smit Uplenchwar. Application Engineer at Radiant, M.S. CS University at Buffalo. Specializing in distributed systems, Go, gRPC, and cloud infrastructure.',
  openGraph: {
    title: 'Smit Uplenchwar — Backend & Distributed Systems Engineer',
    description:
      'Distributed systems, backend infrastructure, open-source tooling, and AI pipelines.',
    type: 'website',
  },
}

// ─── Root layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
    >
      <body className="bg-background font-rajdhani antialiased relative overflow-x-hidden">
        {/* Fixed decorative layers — rendered behind everything */}
        <GridBackground />
        <ScanlineOverlay />

        {/* Page content sits above the fixed layers */}
        {children}
      </body>
    </html>
  )
}
