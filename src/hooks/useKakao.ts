import { useEffect, useState } from 'react';

export default function useKakao() {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      setIsKakaoInitialized(true);
    } else {
      const checkKakao = setInterval(() => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          setIsKakaoInitialized(true);
          clearInterval(checkKakao);
        }
      }, 100);
    }
  }, []);

  const handleKakaoChat = () => {
    if (window.Kakao && isKakaoInitialized) {
      window.Kakao.Channel.chat({
        channelPublicId: '_sxaIWG',
      });
    } else {
      alert('Kakao SDK is not initialized');
    }
  };

  return { handleKakaoChat };
}
