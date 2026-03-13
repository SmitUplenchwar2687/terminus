import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required: three.js and R3F use ES module syntax that Next.js webpack
  // cannot handle in SSR context without transpilation.
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}

export default nextConfig
