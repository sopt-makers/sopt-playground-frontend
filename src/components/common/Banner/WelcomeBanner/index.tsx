import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import desktopBackground from '@/public/icons/img/Desktop.gif';
import BalloonImg from '@/public/icons/img/illust_balloon.png';
import Rocket from '@/public/icons/img/illust_rocket.svg';
import mobileBackground from '@/public/icons/img/Mobile.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const WelcomeBanner = () => {
  // 이미지 랜덤 생성을 위한 코드
  const [isShowRocketInt, setIsShowRocketInt] = useState(1);

  const getRandomArbitrary = () => {
    setIsShowRocketInt(Math.floor(Math.random() * (3 - 1) + 1));
  };

  useEffect(() => {
    getRandomArbitrary();
  }, []);

  return (
    <WelcomeBannerWrapper>
      <ContentWrapper>
        {isShowRocketInt === 1 ? <Rocket /> : <BalloonIcon src={BalloonImg.src} alt='풍선 이미지' />}
        <Title>33기 여러분, SOPT에서 만나게 되어 기뻐요!</Title>
        <SubTitle>SOPT의 놀이터, Playground에 오신 걸 환영해요</SubTitle>
      </ContentWrapper>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 212px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 164px;
  }
`;

const Title = styled.div`
  margin-top: 8px;
  color: ${colors.gray10};
  ${textStyles.SUIT_18_B};
`;

const SubTitle = styled.div`
  margin-top: 4px;
  color: ${colors.gray60};
  ${textStyles.SUIT_12_M};
`;

const BalloonIcon = styled.img`
  width: 60px;
  height: 60px;
`;
