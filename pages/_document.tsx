import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/components/googleTagManager/Noscript';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preload' href='/fonts/SUIT-ExtraBold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Bold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-SemiBold.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Medium.woff2' as='font' type='font/woff2' crossOrigin='' />
      </Head>
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
