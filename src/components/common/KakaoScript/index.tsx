import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScript() {
  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        console.log('Kakao SDK initialized');
      }
    };

    if (document.readyState === 'complete') {
      initializeKakao();
    } else {
      window.addEventListener('load', initializeKakao);
      return () => window.removeEventListener('load', initializeKakao);
    }
  }, []);

  const handleAddChannel = () => {
    console.debug('Kakao SDK script loaded');
  };

  return (
    <Script
      src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js'
      integrity='sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01'
      crossOrigin='anonymous'
      onLoad={handleAddChannel}
    />
  );
}
