'use client';
import { themes } from '@storybook/theming';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from '@toss/use-overlay';
import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import NextAdapterPages from 'next-query-params/pages';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

import { colors } from '@sopt-makers/colors';
import ResponsiveProvider from '../src/components/common/Responsive/ResponsiveProvider';
import StorybookToastProvider from '../src/components/common/Toast/providers/StorybookToastProvider';
import StorybookEventLoggerProvider from '../src/components/eventLogger/providers/StorybookEventLoggerProvider';
import GlobalStyle from '../src/styles/GlobalStyle';

initialize();

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
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
    dark: { name: 'darker', value: colors.gray950 },
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
      <QueryParamProvider adapter={NextAdapterPages}>
        <RecoilRoot>
          <LazyMotion features={() => import('framer-motion').then((mod) => mod.domAnimation)}>
            <StorybookEventLoggerProvider>
              <StorybookToastProvider>
                <GlobalStyle />
                <ResponsiveProvider>
                  <OverlayProvider>
                    <Story />
                  </OverlayProvider>
                </ResponsiveProvider>
              </StorybookToastProvider>
            </StorybookEventLoggerProvider>
          </LazyMotion>
        </RecoilRoot>
      </QueryParamProvider>
    </QueryClientProvider>
  ),
  mswDecorator,
];
