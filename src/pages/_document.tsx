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
            __html: `  
            const inappdeny_exec_vanillajs = (callback: { (): void; (this: Document, ev: Event): unknown }) => {
              if (document.readyState !== 'loading') {
                callback();
              } else {
                document.addEventListener('DOMContentLoaded', callback);
              }
            };
            inappdeny_exec_vanillajs(() => {
              function copytoclipboard(val: string) {
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
                location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
              } else if (useragt.match(/line/i)) {
                if (target_url.indexOf('?') !== -1) {
                  location.href = target_url + '&openExternalBrowser=1';
                } else {
                  location.href = target_url + '?openExternalBrowser=1';
                }
              } else if (
                useragt.match(
                  /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i,
                )
              ) {
                if (useragt.match(/iphone|ipad|ipod/i)) {
                  const mobile = document.createElement('meta');
                  mobile.name = 'viewport';
                  mobile.content =
                    'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
                  document.getElementsByTagName('head')[0].appendChild(mobile);
                  document.body.innerHTML =
                    "<style>body{margin:0;padding:0;font-family: 'SUIT'; sans-serif;overflow: hidden;height: 100%;}</style><article style='text-align:center; font-size:14px; font-weight: 400; line-height: 22px; letter-spacing: -0.14px; word-break:keep-all;color:#FCFCFC;'>인앱브라우저에서는 소셜로그인이 불가능해요 😭 <br/> 링크를 복사해 기본 브라우저에서 다시 시도해주시겠어요?</article>";
                } else {
                  location.href =
                    'intent://' +
                    target_url.replace(/https?:\/\//i, '') +
                    '#Intent;scheme=http;package=com.android.chrome;end';
                }
              }
            });
          }
          `,
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
