import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import AuthProvider from '@/components/auth/AuthProvider';
import Debugger from '@/components/debug/Debugger';
import GlobalStyle from '@/styles/GlobalStyle';
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
          <Debugger />
        </RecoilRoot>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
