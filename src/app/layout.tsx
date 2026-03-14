import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import NoirCursor from '@/components/ui/NoirCursor'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://terminus-smit.vercel.app'),
  title: 'Smit Uplenchwar — Backend Engineer',
  description: 'Backend & Distributed Systems Engineer. 4+ years building high-throughput distributed systems in Go and Python. M.S. Computer Science, University at Buffalo.',
  openGraph: {
    title: 'Smit Uplenchwar — Backend Engineer',
    description: 'Backend & Distributed Systems Engineer. 4+ years building high-throughput distributed systems in Go and Python.',
    url: 'https://terminus-smit.vercel.app',
    siteName: 'Smit Uplenchwar',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Smit Uplenchwar — Backend Engineer' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smit Uplenchwar — Backend Engineer',
    description: 'Backend & Distributed Systems Engineer. Go, Python, distributed systems.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-satoshi">
        <NoirCursor />
        {children}
      </body>
    </html>
  )
}
