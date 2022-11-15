const productionMode = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

function getSecurityHeaders() {
  const hash = 'hasj';
  const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'none';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 'sha256-${hash}';
  object-src 'none';
  font-src 'self' *.googleapis.com *.gstatic.com;
  img-src * 'self';
  script-src-attr 'none';
  style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com;
  connect-src 'self' *.googleapis.com *.gstatic.com google-analytics.com *.googletagmanager.com;
`;

  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin',
    },
    // {
    //   key: 'Content-Security-Policy',
    //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    // },
  ];
  return securityHeaders;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  images: {
    domains: ['linodeobjects.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: getSecurityHeaders(),
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
