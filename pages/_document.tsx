import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/components/googleTagManager/NoScript';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <GoogleTagManagerNoscript />
      </body>
    </Html>
  );
}
