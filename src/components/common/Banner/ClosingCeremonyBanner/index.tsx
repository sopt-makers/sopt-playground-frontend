import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import ResolutionReadModal from '@/components/resolution/read/ResolutionReadModal';
import { LATEST_GENERATION } from '@/constants/generation';
import closingCeremonyBannerDesktop from '@/public/icons/img/banner_closing-ceremony_desktop.png';
import closingCeremonyBannerMobile from '@/public/icons/img/banner_closing-ceremony_mobile.png';
import mySoptReportBannerDesktop from '@/public/icons/img/banner_my-sopt-report_desktop.png';
import mySoptReportBannerMobile from '@/public/icons/img/banner_my-sopt-report_mobile.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type BannerType = {
  default: {
    desktop: string;
    mobile: string;
  };
  resolution: {
    desktop: string;
    mobile: string;
  };
};

type textType = {
  default: {
    title: string;
    subtitle: string;
    buttonContent: string;
  };
  resolution: {
    title: {
      desktop: string;
      mobile: string;
    };
    subtitle: string;
    buttonContentPrimary: string;
    buttonContentSecondary: string;
  };
};

export const ClosingCeremonyBanner = () => {
  const router = useRouter();

  const {
    isOpen: isOpenResolutionModal,
    onClose: onCloseResolutionModal,
    onOpen: onOpenResolutionModal,
  } = useModalState();

  const { data: myData, isLoading } = useGetMemberOfMe();
  const is35 = myData?.generation === LATEST_GENERATION;

  const Banner: BannerType = {
    default: {
      desktop: mySoptReportBannerDesktop.src,
      mobile: mySoptReportBannerMobile.src,
    },
    resolution: {
      desktop: closingCeremonyBannerDesktop.src,
      mobile: closingCeremonyBannerMobile.src,
    },
  };

  const text: textType = {
    default: {
      title: '2024년, SOPT와 플그 속 나는?',
      subtitle: '작년을 담은 회원님만의 리포트를 준비했어요',
      buttonContent: '마이 솝트 리포트 보기',
    },
    resolution: {
      title: {
        desktop: 'SOPT에서 외쳤던 다짐, 모두 이루셨나요?',
        mobile: `SOPT에서 외쳤던 다짐,\n모두 이루셨나요?`,
      },
      subtitle: 'AND SOPT를 처음 만났던 순간으로 돌아가봐요',
      buttonContentPrimary: '나의 다짐 보기',
      buttonContentSecondary: '마이 솝트 리포트 보기',
    },
  };

  return (
    <>
      {!isLoading && (
        <ClosingCeremonyBannerWrapper>
          <Contents>
            <TextWrapper>
              <Text typography='SUIT_18_B' color={colors.white}>
                {is35 ? (
                  <>
                    <Responsive only='desktop'>{text.resolution.title.desktop}</Responsive>
                    <Responsive only='mobile'>{text.resolution.title.mobile}</Responsive>
                  </>
                ) : (
                  text.default.title
                )}
              </Text>
              <Text typography='SUIT_12_M' color={colors.gray300}>
                {is35 ? text.resolution.subtitle : text.default.subtitle}
              </Text>
            </TextWrapper>
            <ButtonWrapper>
              {is35 ? (
                <>
                  <LoggingClick eventKey='bannerOpenMyReport'>
                    <StyledButton color='secondary' onClick={() => router.push(playgroundLink.mySoptReport())}>
                      <Text typography='SUIT_12_EB' color={colors.gray700}>
                        {text.resolution.buttonContentSecondary}
                      </Text>
                    </StyledButton>
                  </LoggingClick>
                  <LoggingClick eventKey='bannerOpenResolution'>
                    <StyledButton color='primary' onClick={onOpenResolutionModal}>
                      <Text typography='SUIT_12_EB' color={colors.gray700}>
                        {text.resolution.buttonContentPrimary}
                      </Text>
                    </StyledButton>
                  </LoggingClick>
                </>
              ) : (
                <LoggingClick eventKey='bannerOpenMyReport'>
                  <MySoptReportButton color='primary' onClick={() => router.push(playgroundLink.mySoptReport())}>
                    <Text typography='SUIT_12_EB' color={colors.gray700}>
                      {text.default.buttonContent}
                    </Text>
                  </MySoptReportButton>
                </LoggingClick>
              )}
            </ButtonWrapper>
          </Contents>
          <Responsive only='desktop'>
            <StyledBanner src={is35 ? Banner.resolution.desktop : Banner.default.desktop} />
          </Responsive>
          <Responsive only='mobile'>
            <StyledBanner src={is35 ? Banner.resolution.mobile : Banner.default.mobile} />
          </Responsive>
        </ClosingCeremonyBannerWrapper>
      )}

      <ResolutionReadModal isOpen={isOpenResolutionModal} onClose={onCloseResolutionModal} />
    </>
  );
};

const ClosingCeremonyBannerWrapper = styled.header`
  display: flex;
  position: relative;
  justify-content: center;
  margin-bottom: 16px;
  border-bottom: 1px solid ${colors.gray800};
  width: 100%;
  height: 168px;
`;

const StyledBanner = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: contain;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 375px;
  }
`;

const Contents = styled.section`
  display: flex;
  position: absolute;
  left: 0;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
  white-space: pre;
`;

const ButtonWrapper = styled.section`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button<{ color: 'primary' | 'secondary' }>`
  display: flex;
  border-radius: 100px;
  background-color: ${({ color }) => (color === 'primary' ? '#5BA3FF' : '#C4DEFF')};
  padding: 10px 16px;
  width: fit-content;

  &:hover {
    background-color: ${({ color }) => (color === 'primary' ? '#84BAFF' : '#B3D4FF')};
  }
`;

const MySoptReportButton = styled.button`
  display: flex;
  border-radius: 100px;
  background: linear-gradient(94deg, #d1ff19 0%, #6fb0ff 91.32%);
  padding: 10px 16px;
  width: fit-content;

  &:hover {
    background: linear-gradient(94deg, #e6ff80 0%, #a8cfff 91.32%);
  }
`;
