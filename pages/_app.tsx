import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { DEBUG } from '@/constants/Config';
import GlobalStyle from '@/styles/GlobalStyle';
import { getLayout } from '@/utils/layout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

const Debugger = dynamic(() => import('@/components/debug/Debugger'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  const layout = getLayout(Component);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>SOPT Playground</title>
      </Head>
      <RecoilRoot>
        <GlobalStyle />
        {layout({ children: <Component {...pageProps} /> })}
        {DEBUG && <Debugger />}
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
