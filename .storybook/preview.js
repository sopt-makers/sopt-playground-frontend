import { themes } from '@storybook/theming';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClientProvider, QueryClient } from 'react-query';
import GlobalStyle from '../styles/common/GlobalStyle';
import { colors } from '../styles/common/colors';

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
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Story />
    </QueryClientProvider>
  ),
  mswDecorator,
];
