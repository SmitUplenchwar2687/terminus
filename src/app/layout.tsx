import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import NoirCursor from '@/components/ui/NoirCursor'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
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
    <html lang="en" className={jetBrainsMono.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="bg-background font-rajdhani antialiased relative overflow-x-hidden">
        <NoirCursor />
        {children}
      </body>
    </html>
  )
}
