import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import desktopBanner1 from '@/public/icons/img/banner_34_desktop_ver1.gif';
import desktopBanner2 from '@/public/icons/img/banner_34_desktop_ver2.gif';
import mobileBanner1 from '@/public/icons/img/banner_34_mobile_ver1.gif';
import mobileBanner2 from '@/public/icons/img/banner_34_mobile_ver2.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const WelcomeBanner = () => {
  // 이미지 랜덤 생성을 위한 코드
  const [bannerVersion, setBannerVersion] = useState(1);

  const getRandomArbitrary = () => {
    setBannerVersion(Math.floor(Math.random() * (3 - 1) + 1));
  };

  useEffect(() => {
    getRandomArbitrary();
  }, []);

  return (
    <WelcomeBannerWrapper>
      <ButtonWrapper>
        <ResolutionButton type='button'>NOW, 다짐하러 가기</ResolutionButton>
      </ButtonWrapper>
      <BannerWrapper>
        <Responsive only='desktop'>
          {bannerVersion === 1 ? (
            <img src={desktopBanner1.src} alt='데스크탑 환영 배너 v1' />
          ) : (
            <img src={desktopBanner2.src} alt='데스크탑 환영 배너 v2' />
          )}
        </Responsive>
        <Responsive only='mobile'>
          {bannerVersion === 1 ? (
            <img src={mobileBanner1.src} alt='모바일 환영 배너 v1' />
          ) : (
            <img src={mobileBanner2.src} alt='모바일 환영 배너 v2' />
          )}
        </Responsive>
      </BannerWrapper>
    </WelcomeBannerWrapper>
  );
};

export default WelcomeBanner;

const BannerWrapper = styled.div`
  width: 1440px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 375px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 168px;
`;

const ResolutionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  border-radius: 100px;
  background: linear-gradient(90deg, #effdb4 0%, #bdec00 100%);
  padding: 10px 16px;
  color: ${colors.gray800};
  ${textStyles.SUIT_12_EB};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 28px;
  }
`;

const WelcomeBannerWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 168px;
  overflow: hidden;
`;
