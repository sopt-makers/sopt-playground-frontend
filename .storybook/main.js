const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    config.module.rules.push({
      test: /\.(css|scss)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // MEMO: 스토리북에선 svg를 file-loader로 읽어오는데, 이를 svgr로 읽어오도록 설정
    const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      '@': path.resolve(__dirname),
    };

    return config;
  },
  staticDirs: ['../public'],
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
