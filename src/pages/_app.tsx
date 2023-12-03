import ProgressBar from '@badrap/bar-of-progress';
import { colors } from '@sopt-makers/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from '@toss/use-overlay';
import { LazyMotion } from 'framer-motion';
import NextAdapterPages from 'next-query-params/pages';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

import InAppBrowserImpossibleBanner from '@/components/common/Banner/InAppBrowserImpossibleBanner';
import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';
import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import AmplitudeProvider from '@/components/eventLogger/providers/AmplitudeProvider';
import * as gtm from '@/components/googleTagManager/gtm';
import GoogleTagManagerScript from '@/components/googleTagManager/Script';
import NavigationProvider from '@/components/navigation/NavigationProvider';
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

  useEffect(() => {
    const inappdeny_exec_vanillajs = (callback: () => void) => {
      if (document.readyState !== 'loading') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    };
    inappdeny_exec_vanillajs(() => {
      const useragt = navigator.userAgent.toLowerCase();
      const target_url = location.href;

      if (useragt.match(/kakaotalk/i)) {
        // MEMO: 카카오톡 외부브라우저로 호출
        location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
      } else if (
        useragt.match(
          /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i,
        )
      ) {
        // MEMO: 그외 다른 인앱들
        if (useragt.match(/iphone|ipad|ipod/i)) {
          // MEMO: 아이폰은 강제로 사파리를 실행할 수 없으므로, 모바일 대응 뷰 마운트
          return <InAppBrowserImpossibleBanner />;
        } else {
          // MEMO: 안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
          location.href =
            'intent://' + target_url.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end';
        }
      }
    });
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
                    <NavigationProvider>
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </NavigationProvider>
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
