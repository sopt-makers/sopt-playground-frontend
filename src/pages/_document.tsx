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
        <link rel='preload' href='/fonts/SUIT-Regular.woff2' as='font' type='font/woff2' crossOrigin='' />
        <link rel='preload' href='/fonts/SUIT-Light.woff2' as='font' type='font/woff2' crossOrigin='' />
        <script
          dangerouslySetInnerHTML={{
            __html: `const inappdeny_exec_vanillajs = (callback) => {
              if (document.readyState !== 'loading') {
                callback();
              } else {
                document.addEventListener('DOMContentLoaded', callback);
              }
            };
            inappdeny_exec_vanillajs(() => {
              function copytoclipboard(val) {
                const t = document.createElement('textarea');
                document.body.appendChild(t);
                t.value = val;
                t.select();
                document.execCommand('copy');
                document.body.removeChild(t);
              }
              function inappbrowserout() {
                copytoclipboard(window.location.href);
                alert(
                  'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.',
                );
                location.href = 'x-web-search://?';
              }

              const useragt = navigator.userAgent.toLowerCase();
              const target_url = location.href;

              if (useragt.match(/kakaotalk/i)) {
                // MEMO: 카카오톡 외부브라우저로 호출
                location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
              }
            })`,
          }}
        />
      </Head>
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
