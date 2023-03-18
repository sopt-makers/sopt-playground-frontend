import { themes } from '@storybook/theming';
import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';
import StorybookToastProvider from '@/components/common/Toast/providers/StorybookToastProvider';
import StorybookEventLoggerProvider from '@/components/eventLogger/providers/StorybookEventLoggerProvider';
import { colors } from '@/styles/colors';
import GlobalStyle from '@/styles/GlobalStyle';

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
    dark: { name: 'darker', value: colors.black100 },
  },
  darkMode: {
    current: 'dark',
    dark: { ...themes.dark, appBg: colors.black80 },
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
