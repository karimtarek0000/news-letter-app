import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
}
