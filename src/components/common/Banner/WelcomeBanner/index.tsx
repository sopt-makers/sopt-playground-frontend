import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import desktopBackground from '@/public/icons/img/Desktop.gif';
import mobileBackground from '@/public/icons/img/Mobile.gif';
import Balloon from '@/public/icons/welcome-banner-balloon.svg';
import Rocket from '@/public/icons/welcome-banner-rocket.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
    <WelcomeBannerWrapper>
      <ContentWrapper>{randomInt === 1 ? <Rocket /> : <Balloon />}</ContentWrapper>
      <Responsive only='desktop'>
        <img src={desktopBackground.src} width='1920px' height='212px' alt='환영 배너 배경' />
      </Responsive>
      <Responsive only='mobile'>
        <img src={mobileBackground.src} width='375px' height='164px' alt='환영 배너 배경' />
      </Responsive>
    </WelcomeBannerWrapper>
  );
};

export default WelcomeBanner;

const WelcomeBannerWrapper = styled.header`
  margin-top: 53px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 212px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 164px;
  }
`;
