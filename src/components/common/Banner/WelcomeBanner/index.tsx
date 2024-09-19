import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useEffect, useLayoutEffect, useState } from 'react';

import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import ResolutionSubmitModal from '@/components/resolution/submit/ResolutionSubmitModal';
import { useOpenResolutionModal } from '@/components/resolution/submit/useOpenResolutionModal';
import banner35Desktop1 from '@/public/icons/img/welcome-banner_35_desktop_ver1.gif';
import banner35Desktop2 from '@/public/icons/img/welcome-banner_35_desktop_ver2.gif';
import banner35Mobile1 from '@/public/icons/img/welcome-banner_35_mobile_ver1.gif';
import banner35Mobile2 from '@/public/icons/img/welcome-banner_35_mobile_ver2.gif';
import bannerOthersDesktop from '@/public/icons/img/welcome-banner_other_desktop.gif';
import bannerOthersMobile from '@/public/icons/img/welcome-banner_other_mobile.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type Banner35Type = {
  desktop: { [ver: number]: string };
  mobile: { [ver: number]: string };
};
type BannerOthersType = {
  desktop: string;
  mobile: string;
};

interface WelcomeBannerProp {
  is35: boolean;
}

const WelcomeBanner = ({ is35 }: WelcomeBannerProp) => {
  // 이미지 랜덤 생성을 위한 코드
  const [bannerVersion, setBannerVersion] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getRandomArbitrary = () => {
    setBannerVersion(Math.floor(Math.random() * 2 + 1));
  };

  useLayoutEffect(() => {
    getRandomArbitrary();
  }, []);

  const Welcome35Banner: Banner35Type = {
    desktop: { 1: banner35Desktop1.src, 2: banner35Desktop2.src },
    mobile: { 1: banner35Mobile1.src, 2: banner35Mobile2.src },
  };

  const WelcomeOthersBanner: BannerOthersType = {
    desktop: bannerOthersDesktop.src,
    mobile: bannerOthersMobile.src,
  };

  const { isOpenResolutionModal, onCloseResolutionModal, handleResolutionModalOpen, profileImage, isRegistration } =
    useOpenResolutionModal();

  return (
    <WelcomeBannerContainer>
      <WelcomeBannerWrapper>
        {isMounted ? (
          <>
            {is35 ? (
              <>
                <ButtonWrapper>
                  <LoggingClick
                    eventKey='welcomeBannerResolution'
                    param={{ isAlreadySubmitted: isRegistration ?? false }}
                  >
                    <ResolutionButton type='button' onClick={handleResolutionModalOpen}>
                      NOW, 다짐하러 가기
                    </ResolutionButton>
                  </LoggingClick>
                  {isOpenResolutionModal && (
                    <ResolutionSubmitModal profileImageUrl={profileImage ?? ''} onClose={onCloseResolutionModal} />
                  )}
                </ButtonWrapper>
                <BannerWrapper>
                  <Responsive only='desktop'>
                    <Banner src={Welcome35Banner.desktop[bannerVersion]} alt={`데스크탑 환영 배너 v${bannerVersion}`} />
                  </Responsive>
                  <Responsive only='mobile'>
                    <Banner src={Welcome35Banner.mobile[bannerVersion]} alt={`모바일 환영 배너 v${bannerVersion}`} />
                  </Responsive>
                </BannerWrapper>
              </>
            ) : (
              <BannerWrapper>
                <Responsive only='desktop'>
                  <Banner src={WelcomeOthersBanner.desktop} alt={`데스크탑 환영 배너 v${bannerVersion}`} />
                </Responsive>
                <Responsive only='mobile'>
                  <Banner src={WelcomeOthersBanner.mobile} alt={`모바일 환영 배너 v${bannerVersion}`} />
                </Responsive>
              </BannerWrapper>
            )}
          </>
        ) : (
          <Loading />
        )}
      </WelcomeBannerWrapper>
    </WelcomeBannerContainer>
  );
};

export default WelcomeBanner;

const BannerWrapper = styled.div``;

const Banner = styled.img`
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

const WelcomeBannerContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 168px;
  overflow: hidden;
`;

const WelcomeBannerWrapper = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  z-index: 2;
  border-bottom: 1px solid ${colors.gray800};
  width: 100%;
  min-height: 168px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    border-bottom: 0;
  }
`;
