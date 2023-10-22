import React from 'react';
import { themes } from '@storybook/theming';
import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import ResponsiveProvider from '../src/components/common/Responsive/ResponsiveProvider';
import StorybookToastProvider from '../src/components/common/Toast/providers/StorybookToastProvider';
import StorybookEventLoggerProvider from '../src/components/eventLogger/providers/StorybookEventLoggerProvider';
import { colors } from '@sopt-makers/colors';
import GlobalStyle from '../src/styles/GlobalStyle';

initialize();

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'darker',
    dark: { name: 'darker', value: colors.gray900 },
  },
  darkMode: {
    current: 'dark',
    dark: { ...themes.dark, appBg: colors.gray800 },
    light: { ...themes.normal, appBg: '#fff' },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <LazyMotion strict features={() => import('framer-motion').then((mod) => mod.domAnimation)}>
          <StorybookEventLoggerProvider>
            <StorybookToastProvider>
              <GlobalStyle />
              <ResponsiveProvider>
                <Story />
              </ResponsiveProvider>
            </StorybookToastProvider>
          </StorybookEventLoggerProvider>
        </LazyMotion>
      </RecoilRoot>
    </QueryClientProvider>
  ),
  mswDecorator,
];
