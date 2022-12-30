const path = require('path');

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: shouldAnalyzeBundles,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'stories.tsx'],
  webpack: (config, { isServer }) => {
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

    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        ...(config.optimization.splitChunks && {
          splitChunks: {
            ...config.optimization.splitChunks,
            cacheGroups: {
              ...config.optimization.splitChunks.cacheGroups,
              components: {
                chunks: 'all',
                test: /[\\/]components[\\/]/,
              },
              lodash: {
                chunks: 'all',
                test: /[\\/]node_modules[\\/]lodash/,
              },
              recoil: {
                chunks: 'all',
                test: /[\\/]node_modules[\\/]recoil/,
              },
            },
          },
        }),
      };
    }

    return config;
  },
  eslint: {
    dirs: ['components', 'constants', 'hooks', 'pages', 'styles', 'types', 'utils'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
