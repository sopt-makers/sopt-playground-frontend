import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import desktopBackground from '@/public/icons/img/Desktop.gif';
import mobileBackground from '@/public/icons/img/Mobile.gif';

const WelcomeBanner = () => {
  // 이미지 랜덤 생성을 위한 코드
  const [randomInt, setRandomInt] = useState(1);

  const getRandomArbitrary = () => {
    setRandomInt(Math.floor(Math.random() * (3 - 1) + 1));
  };

  useEffect(() => {
    getRandomArbitrary();
  }, []);

  return (
    <>
      <Responsive only='desktop'>
        <img src={desktopBackground.src} width={desktopBackground.width} alt='환영 배너 배경' />
      </Responsive>
      <Responsive only='mobile'>
        <img src={mobileBackground.src} width={mobileBackground.width} alt='환영 배너 배경' />
      </Responsive>
    </>
  );
};

export default WelcomeBanner;
