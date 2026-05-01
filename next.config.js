/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA-ready: allow service worker at root
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
