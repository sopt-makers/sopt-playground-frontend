import { themes } from '@storybook/theming';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClientProvider, QueryClient } from 'react-query';
import GlobalStyle from '@/styles/GlobalStyle';
import { colors } from '@/styles/colors';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { RecoilRoot } from 'recoil';
import StorybookEventLoggerProvider from '@/components/eventLogger/providers/StorybookEventLoggerProvider';
import StorybookToastProvider from '@/components/common/Toast/providers/StorybookToastProvider';
import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';

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
    default: 'dark',
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
        <StorybookEventLoggerProvider>
          <StorybookToastProvider>
            <GlobalStyle />
            <ResponsiveProvider>
              <Story />
            </ResponsiveProvider>
          </StorybookToastProvider>
        </StorybookEventLoggerProvider>
      </RecoilRoot>
    </QueryClientProvider>
  ),
  mswDecorator,
];
