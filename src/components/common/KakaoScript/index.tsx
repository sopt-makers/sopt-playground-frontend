import Script from 'next/script';

import useKakao from '@/hooks/useKakao';

export default function KakaoScript() {
  const { handleInitializeKakao } = useKakao();

  return (
    <Script
      src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js'
      integrity='sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01'
      crossOrigin='anonymous'
      onLoad={handleInitializeKakao}
    />
  );
}
