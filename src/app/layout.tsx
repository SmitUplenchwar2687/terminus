import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import ScanlineOverlay from '@/components/ui/ScanlineOverlay'
import GridBackground from '@/components/ui/GridBackground'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '600'],
  display: 'swap',
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={ibmPlexMono.variable}
    >
      <body className="bg-background font-rajdhani antialiased relative overflow-x-hidden">
        <GridBackground />
        <ScanlineOverlay />
        {children}
      </body>
    </html>
  )
}
