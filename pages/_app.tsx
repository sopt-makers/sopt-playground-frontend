import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import GlobalStyle from '@/styles/GlobalStyle';
import AuthProvider from '@/components/auth/AuthProvider';
import { getLayout } from '@/utils/layout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

function MyApp({ Component, pageProps }: AppProps) {
  const layout = getLayout(Component);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyle />
          {layout(<Component {...pageProps} />)}
        </RecoilRoot>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
