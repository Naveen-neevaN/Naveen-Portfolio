/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Updated to match your GitHub repository name
  basePath: process.env.NODE_ENV === 'production' ? '/Naveen-Profile' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Naveen-Profile' : '',
  trailingSlash: true,
}

module.exports = nextConfig


