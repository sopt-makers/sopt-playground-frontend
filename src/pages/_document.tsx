import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/components/googleTagManager/Noscript';
import { ORIGIN } from '@/constants/env';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preload' href='/fonts/SUIT-ExtraBold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Bold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-SemiBold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Medium.woff2' as='font' type='font/woff2' crossOrigin='' />
        <meta property='og:title' content='SOPT Playground' />
        <meta property='og:description' content='솝트와 연결되고 싶으신가요?' />
        <meta property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
      </Head>
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
