/** @type {import('next').NextConfig} */
// Centralize basePath resolution so it can be overridden at build time via
// NEXT_PUBLIC_BASE_PATH (useful for GitHub Pages or repo-subpath hosting).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/Naveen-Portfolio' : '')

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use the computed basePath for both basePath and assetPrefix so client-side
  // resolvers and static exports are consistent.
  basePath: basePath || '',
  assetPrefix: basePath || '',
  // Expose the base path at build time to client code.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
  },
  trailingSlash: true,
}

module.exports = nextConfig