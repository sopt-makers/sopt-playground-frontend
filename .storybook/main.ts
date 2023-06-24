import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    if (!config.resolve) {
      throw new Error('Webpack Error');
    }

    // config.resolve.plugins = [
    //   ...(config.resolve.plugins || []),
    //   new TsconfigPathsPlugin({
    //     extensions: config.resolve.extensions,
    //   }),
    // ];

    // config.module.rules.push({
    //   test: /\.(css|scss)$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    // });

    // MEMO: 스토리북에선 svg를 file-loader로 읽어오는데, 이를 svgr로 읽어오도록 설정
    // const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    // fileLoaderRule.exclude = /\.svg$/;
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });

    config.resolve.alias = {
      '@': path.resolve(__dirname),
    };
    return config;
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
