import ProgressBar from '@badrap/bar-of-progress';
import { colors } from '@sopt-makers/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from '@toss/use-overlay';
import { LazyMotion } from 'framer-motion';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import NextAdapterPages from 'next-query-params/pages';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';
import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import AmplitudeProvider from '@/components/eventLogger/providers/AmplitudeProvider';
import * as gtm from '@/components/googleTagManager/gtm';
import GoogleTagManagerScript from '@/components/googleTagManager/Script';
import { AMPLITUDE_API_KEY, DEBUG, ORIGIN } from '@/constants/env';
import GlobalStyle from '@/styles/GlobalStyle';
import { getLayout } from '@/utils/layout';

const Debugger = dynamic(() => import('@/components/debug/Debugger'), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 300000, refetchOnWindowFocus: false, staleTime: 300000, retry: 1 } },
});

const progress = new ProgressBar({ color: colors.success, size: 3 });
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

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const $existingMeta = document.querySelector('meta[name="viewport"]');

    /** 모바일 환경에서 input focus 시 화면이 확대되는 현상을 막아요 */
    if (isMobile) {
      const $meta = $existingMeta ?? document.createElement('meta');

      $meta.setAttribute('name', 'viewport');
      $meta.setAttribute(
        'content',
        'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      );

      if (!$existingMeta) {
        document.head.appendChild($meta);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextSeo
        title='SOPT Playground'
        description='솝트와 연결되고 싶으신가요?'
        openGraph={{
          title: 'SOPT Playground',
          description: '솝트와 연결되고 싶으신가요?',
          images: [{ url: `${ORIGIN}/icons/img/og_playground.jpeg` }],
        }}
      />
      <Head>
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content={colors.gray400} />
      </Head>
      <GoogleTagManagerScript />

      <QueryParamProvider adapter={NextAdapterPages}>
        <RecoilRoot>
          <AmplitudeProvider apiKey={AMPLITUDE_API_KEY}>
            <LazyMotion features={() => import('framer-motion').then((mod) => mod.domAnimation)}>
              <ToastProvider>
                <GlobalStyle />
                <ResponsiveProvider>
                  <OverlayProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </OverlayProvider>
                </ResponsiveProvider>
                {DEBUG && <Debugger />}
              </ToastProvider>
            </LazyMotion>
          </AmplitudeProvider>
        </RecoilRoot>
      </QueryParamProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
