const path = require('path');

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: shouldAnalyzeBundles,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // rect가 path로 렌더링되지 않도록
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };

    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    dirs: ['api', 'components', 'constants', 'hooks', 'pages', 'styles', 'types', 'utils'],
  },

  // well-known 형식 파일 정상제공하도록 헤더 추가
  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
