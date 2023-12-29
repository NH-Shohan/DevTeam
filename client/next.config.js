/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
