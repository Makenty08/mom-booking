/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zj12qc8g-3000.inc1.devtunnels.ms',
        port: '',
        pathname: '/api/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'zj12qc8g-3000.inc1.devtunnels.ms',
        port: '',
        pathname: '/api/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
