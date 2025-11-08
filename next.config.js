/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Update this to match your GitHub repository name
  // For example, if your repo is github.com/username/my-website
  // then basePath should be '/my-website'
  basePath: process.env.NODE_ENV === 'production' ? '/Naveen-Profile' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Naveen-Profile' : '',
  trailingSlash: true,
}

module.exports = nextConfig

