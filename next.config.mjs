// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.extensions.push('.json');
    return config;
  },
};

export default nextConfig;
