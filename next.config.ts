/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esto permite que el build continue incluso con warnings de ESLint
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
