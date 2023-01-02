import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/components/googleTagManager/Noscript';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
