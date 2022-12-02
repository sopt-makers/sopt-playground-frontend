import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import Debugger from '@/components/debug/Debugger';
import GoogleAnalyticsScript from '@/components/googleAnalytics/GoogleAnalyticsScript';
import * as gtag from '@/components/googleAnalytics/gtag';
import GlobalStyle from '@/styles/GlobalStyle';
import { getLayout } from '@/utils/layout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

function MyApp({ Component, pageProps }: AppProps) {
  const layout = getLayout(Component);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>SOPT Playground</title>
      </Head>
      <GoogleAnalyticsScript />
      <RecoilRoot>
        <GlobalStyle />
        {layout(<Component {...pageProps} />)}
        <Debugger />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
