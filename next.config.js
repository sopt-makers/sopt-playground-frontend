/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'stories.tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
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
};

module.exports = nextConfig;
