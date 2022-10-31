const withPWA = require('next-pwa')({
  dest: 'public',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['upcdn.io'],
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
