import ProgressBar from '@badrap/bar-of-progress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LazyMotion } from 'framer-motion';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';
import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import AmplitudeProvider from '@/components/eventLogger/providers/AmplitudeProvider';
import * as gtm from '@/components/googleTagManager/gtm';
import GoogleTagManagerScript from '@/components/googleTagManager/Script';
import { AMPLITUDE_API_KEY, DEBUG } from '@/constants/env';
import { colors } from '@/styles/colors';
import GlobalStyle from '@/styles/GlobalStyle';
import { useChannelService } from '@/utils/channelService/useChannelService';
import { getLayout } from '@/utils/layout';

const Debugger = dynamic(() => import('@/components/debug/Debugger'), { ssr: false });

if (process.env.MOCKING === 'true') {
  require('../mocks');
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

const progress = new ProgressBar({ color: colors.purple80, size: 3 });
Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.finish());
Router.events.on('routeChangeError', () => progress.finish());

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout(Component);

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', gtm.pageview);
    return () => {
      router.events.off('routeChangeComplete', gtm.pageview);
    };
  }, [router.events]);
  useChannelService();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>SOPT Playground</title>
      </Head>
      <GoogleTagManagerScript />
      <RecoilRoot>
        <AmplitudeProvider apiKey={AMPLITUDE_API_KEY}>
          <LazyMotion features={() => import('framer-motion').then((mod) => mod.domAnimation)}>
            <ToastProvider>
              <GlobalStyle />
              <ResponsiveProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ResponsiveProvider>
              {DEBUG && <Debugger />}
            </ToastProvider>
          </LazyMotion>
        </AmplitudeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
