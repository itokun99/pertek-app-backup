const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const shouldAnalyzeBundle = process.env.ANALYZE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['upcdn.io'],
  },
  pwa: withPWA(),
};

if (shouldAnalyzeBundle) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;

// module.exports = withBundleAnalyzer(
//   withPWA({
//     nextConfig
//     nextConfig: {
//       ...nextConfig,
//     },
//   })
// );

// module.exports = {
//   ...nextConfig,
// };
