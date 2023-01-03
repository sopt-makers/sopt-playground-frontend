import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/components/googleTagManager/Noscript';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preload' href='/fonts/SUIT-ExtraBold.ttf' as='font' type='font/ttf' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Bold.ttf' as='font' type='font/ttf' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-SemiBold.ttf' as='font' type='font/ttf' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Medium.ttf' as='font' type='font/ttf' crossOrigin='' />
      </Head>
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
