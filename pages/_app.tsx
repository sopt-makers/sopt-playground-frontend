import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import Debugger from '@/components/debug/Debugger';
import GoogleTagManagerScript from '@/components/googleTagManager/Script';
import GlobalStyle from '@/styles/GlobalStyle';
import { getLayout } from '@/utils/layout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

function MyApp({ Component, pageProps }: AppProps) {
  const layout = getLayout(Component);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <GoogleTagManagerScript />
        <title>SOPT Playground</title>
      </Head>
      <RecoilRoot>
        <GlobalStyle />
        {layout({ children: <Component {...pageProps} /> })}
        <Debugger />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
