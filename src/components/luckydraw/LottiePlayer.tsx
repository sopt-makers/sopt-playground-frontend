'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  src: string;
  keyId: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const LottiePlayer = ({ src, keyId, style, onComplete }: Props) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    import('@dotlottie/player-component').then(() => {
      const player = playerRef.current;
      if (player && onComplete) {
        const handleComplete = () => {
          onComplete();
        };
        player.addEventListener('complete', handleComplete);

        return () => {
          player.removeEventListener('complete', handleComplete);
        };
      }
    });
  }, [onComplete]);

  return <dotlottie-player key={keyId} ref={playerRef} src={src} autoplay style={style} />;
};

export default LottiePlayer;
