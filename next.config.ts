import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/green-api/:path*',
        destination: 'https://api.green-api.com/:path*',
      },
    ]
  },
}

export default nextConfig
