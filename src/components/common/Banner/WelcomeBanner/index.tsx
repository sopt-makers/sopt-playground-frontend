import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import desktop34Banner1 from '@/public/icons/img/banner_34_desktop_ver1.gif';
import desktop34Banner2 from '@/public/icons/img/banner_34_desktop_ver2.gif';
import mobile34Banner1 from '@/public/icons/img/banner_34_mobile_ver1.gif';
import mobile34Banner2 from '@/public/icons/img/banner_34_mobile_ver2.gif';
import desktopOthersBanner1 from '@/public/icons/img/banner_other_desktop_ver1.gif';
import desktopOthersBanner2 from '@/public/icons/img/banner_other_desktop_ver2.gif';
import mobileOthersBanner1 from '@/public/icons/img/banner_other_mobile_ver1.gif';
import mobileOthersBanner2 from '@/public/icons/img/banner_other_mobile_ver2.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type BannerType = {
  desktop: { [ver: number]: string };
  mobile: { [ver: number]: string };
};

interface WelcomeBannerProp {
  is34: boolean;
}

const WelcomeBanner = ({ is34 }: WelcomeBannerProp) => {
  // 이미지 랜덤 생성을 위한 코드
  const [bannerVersion, setBannerVersion] = useState(1);

  const getRandomArbitrary = () => {
    setBannerVersion(Math.floor(Math.random() * 2 + 1));
  };

  useEffect(() => {
    getRandomArbitrary();
  }, []);

  const Welcome34Banner: BannerType = {
    desktop: { 1: desktop34Banner1.src, 2: desktop34Banner2.src },
    mobile: { 1: mobile34Banner1.src, 2: mobile34Banner2.src },
  };

  const WelcomeOthersBanner: BannerType = {
    desktop: { 1: desktopOthersBanner1.src, 2: desktopOthersBanner2.src },
    mobile: { 1: mobileOthersBanner1.src, 2: mobileOthersBanner2.src },
  };

  return (
    <WelcomeBannerWrapper>
      {is34 && (
        <ButtonWrapper>
          <ResolutionButton type='button'>NOW, 다짐하러 가기</ResolutionButton>
        </ButtonWrapper>
      )}
      <BannerWrapper>
        <Responsive only='desktop'>
          <img
            src={is34 ? Welcome34Banner.desktop[bannerVersion] : WelcomeOthersBanner.desktop[bannerVersion]}
            alt={`데스크탑 환영 배너 v${bannerVersion}`}
          />
        </Responsive>
        <Responsive only='mobile'>
          <img
            src={is34 ? Welcome34Banner.mobile[bannerVersion] : WelcomeOthersBanner.mobile[bannerVersion]}
            alt={`모바일 환영 배너 v${bannerVersion}`}
          />
        </Responsive>
      </BannerWrapper>
    </WelcomeBannerWrapper>
  );
};

export default WelcomeBanner;

const BannerWrapper = styled.div`
  border-bottom: 1px solid ${colors.gray800};
  width: 1440px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-bottom: 0;
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
