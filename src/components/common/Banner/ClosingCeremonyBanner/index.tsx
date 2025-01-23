import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import ResolutionReadModal from '@/components/resolution/read/ResolutionReadModal';
import { LATEST_GENERATION } from '@/constants/generation';
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

  const { data: myData, isLoading } = useGetMemberOfMe();
  const is35 = myData?.generation === LATEST_GENERATION;

  const Banner: BannerType = {
    desktop: desktopBanner.src,
    mobile: { default: mobileBanner.src, resolution: mobileResolutionBanner.src },
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
                // TODO: 마이 솝트 리포트 라우터로 수정
                <>
                  <Button color='secondary' onClick={() => router.push('')}>
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
                // TODO: 마이 솝트 리포트 라우터로 수정
                <Button color='primary' onClick={() => router.push('')}>
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
            <StyledBanner src={is35 ? Banner.mobile.resolution : Banner.mobile.default} />
          </Responsive>
        </ClosingCeremonyBannerWrapper>
      )}

      {isOpenResolutionModal && <ResolutionReadModal onClose={onCloseResolutionModal} />}
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

const Button = styled.button<{ color: 'primary' | 'secondary' }>`
  display: flex;
  border-radius: 100px;
  background-color: ${({ color }) => (color === 'primary' ? '#BDEC00' : colors.white)};
  padding: 10px 16px;
  width: fit-content;
`;
