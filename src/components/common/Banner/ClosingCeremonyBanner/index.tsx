import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { isResSent } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import ResolutionReadModal from '@/components/resolution/read/ResolutionReadModal';
import desktopBanner from '@/public/icons/img/banner_closing-ceremony_desktop.png';
import mobileBanner from '@/public/icons/img/banner_closing-ceremony_mobile.png';
import mobileResolutionBanner from '@/public/icons/img/banner_closing-ceremony_mobile_resolution.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type BannerType = {
  desktop: string;
  mobile: { [key: string]: string };
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

  const { data } = useGetResolutionValidation();
  const isRegistration = data?.isRegistration;

  const Banner: BannerType = {
    desktop: desktopBanner.src,
    mobile: { default: mobileBanner.src, resolution: mobileResolutionBanner.src },
  };

  const text: textType = {
    default: {
      title: 'NOW SOPT 종무식을 축하합니다!',
      subtitle: 'NOW SOPT 활동 후기가 궁금하다면?',
      buttonContent: '34기 활동 후기 보러가기',
    },
    resolution: {
      title: {
        desktop: 'SOPT에서 외쳤던 다짐, 모두 이루셨나요?',
        mobile: `SOPT에서 외쳤던 다짐,\n모두 이루셨나요?`,
      },
      subtitle: 'NOW SOPT를 처음 만났던 순간으로 돌아가보기',
      buttonContentPrimary: '내 다짐 보러가기',
      buttonContentSecondary: '활동 후기 작성하기',
    },
  };

  return (
    <>
      <ClosingCeremonyBannerWrapper>
        <Contents>
          <TextWrapper>
            <Text typography='SUIT_18_B' color={colors.white}>
              {isRegistration ? (
                <>
                  <Responsive only='desktop'>{text.resolution.title.desktop}</Responsive>
                  <Responsive only='mobile'>{text.resolution.title.mobile}</Responsive>
                </>
              ) : (
                text.default.title
              )}
            </Text>
            <Text typography='SUIT_12_M' color={colors.gray300}>
              {isRegistration ? text.resolution.subtitle : text.default.subtitle}
            </Text>
          </TextWrapper>
          <ButtonWrapper>
            {isRegistration ? (
              <>
                <Button color='secondary' onClick={() => router.push(playgroundLink.remember())}>
                  <Text typography='SUIT_12_EB' color={colors.gray700}>
                    {text.resolution.buttonContentSecondary}
                  </Text>
                </Button>
                <Button color='primary' onClick={onOpenResolutionModal}>
                  <Text typography='SUIT_12_EB' color={colors.gray700}>
                    {text.resolution.buttonContentPrimary}
                  </Text>
                </Button>
              </>
            ) : (
              <Button color='primary' onClick={() => router.push(playgroundLink.remember())}>
                <Text typography='SUIT_12_EB' color={colors.gray700}>
                  {text.default.buttonContent}
                </Text>
              </Button>
            )}
          </ButtonWrapper>
        </Contents>
        <Responsive only='desktop'>
          <StyledBanner src={Banner.desktop} />
        </Responsive>
        <Responsive only='mobile'>
          <StyledBanner src={isRegistration ? Banner.mobile.resolution : Banner.mobile.default} />
        </Responsive>
      </ClosingCeremonyBannerWrapper>
      {isOpenResolutionModal && <ResolutionReadModal onClose={onCloseResolutionModal} />}
    </>
  );
};

const ClosingCeremonyBannerWrapper = styled.header`
  display: flex;
  position: relative;
  justify-content: center;
  border-bottom: 1px solid ${colors.gray800};
  width: 100%;
  height: 168px;
`;

const StyledBanner = styled.img`
  width: 100%;
  max-height: 100%;
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

const Button = styled.button<{ color: 'primary' | 'secondary' }>`
  display: flex;
  border-radius: 100px;
  background-color: ${({ color }) => (color === 'primary' ? '#BDEC00' : colors.white)};
  padding: 10px 16px;
  width: fit-content;
`;
