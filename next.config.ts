const nextConfig: NextConfig = {
  turbopack: false,
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
}

