import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import ScanlineOverlay from '@/components/ui/ScanlineOverlay'
import GridBackground from '@/components/ui/GridBackground'

// ─── Fonts ──────────────────────────────────────────────────────────────────
// CSS variable names are preserved so all font-orbitron / font-rajdhani
// Tailwind classes in section components continue to work unchanged.

// Space Grotesk → premium, geometric, premium — replaces Orbitron
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-orbitron',   // keeps existing Tailwind class working
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

// Inter → clean, legible, modern — replaces Rajdhani
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-rajdhani',   // keeps existing Tailwind class working
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
  weight: '400',
  display: 'swap',
})

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Smit Uplenchwar — Backend & Distributed Systems Engineer',
  description:
    'Portfolio of Smit Uplenchwar. Application Engineer at Radiant, M.S. CS University at Buffalo. Distributed systems, Go, gRPC, and cloud infrastructure.',
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${shareTechMono.variable}`}
    >
      <body className="bg-background font-rajdhani antialiased relative overflow-x-hidden">
        {/* Vignette radial gradient — deep edges, lighter centre */}
        <GridBackground />
        {/* Subtle star-field noise texture at ~3% opacity */}
        <ScanlineOverlay />
        {children}
      </body>
    </html>
  )
}
