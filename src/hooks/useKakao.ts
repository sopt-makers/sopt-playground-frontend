import { useEffect } from 'react';

export default function useKakao() {
  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized()) {
    } else {
      const checkKakao = setInterval(() => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          clearInterval(checkKakao);
          handleInitializeKakao();
        }
      }, 100);
    }
  }, []);

  const handleInitializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_TALK_PLUGIN_KEY);
      console.debug('Kakao SDK initialized');
    }
  };

  const handleKakaoChat = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Channel.chat({
        channelPublicId: '_sxaIWG',
      });
    } else {
      console.debug('Kakao SDK is not initialized');
    }
  };

  return { handleKakaoChat, handleInitializeKakao };
}
