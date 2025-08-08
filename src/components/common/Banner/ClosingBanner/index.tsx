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
import closingBannerDesktop from '@/public/icons/img/banner_closing_desktop.jpg';
import closingBannerMobile from '@/public/icons/img/banner_closing_mobile.jpg';
import bannerOthersDesktop from '@/public/icons/img/welcome-banner_other_desktop.gif';
import bannerOthersMobile from '@/public/icons/img/welcome-banner_other_mobile.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { IconChevronRight } from '@sopt-makers/icons';

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
  title: string;
  subtitle: string;
  buttonContent: string;
};

export const ClosingBanner = () => {
  const router = useRouter();

  const {
    isOpen: isOpenResolutionModal,
    onClose: onCloseResolutionModal,
    onOpen: onOpenResolutionModal,
  } = useModalState();

  const { data: myData, isLoading } = useGetMemberOfMe();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;

  const Banner: BannerType = {
    default: {
      desktop: bannerOthersDesktop.src,
      mobile: bannerOthersMobile.src,
    },
    resolution: {
      desktop: closingBannerDesktop.src,
      mobile: closingBannerMobile.src,
    },
  };

  const text: textType = {
    title: 'AT SOPT 수료를 축하드려요!',
    subtitle: 'SOPT playground가 준비한 타임캡솝 선물 받아가세요',
    buttonContent: '타임캡솝 열고, 행운 뽑기',
  };

  return (
    <>
      {!isLoading && (
        <ClosingCeremonyBannerWrapper>
          {isLastGeneration && (
            <Contents>
              <TextWrapper>
                <Text typography='SUIT_18_B' color={colors.white}>
                  {text.title}
                </Text>
                <Text typography='SUIT_12_M' color={colors.gray300}>
                  {text.subtitle}
                </Text>
              </TextWrapper>
              <ButtonWrapper>
                <LoggingClick eventKey='bannerOpenResolution'>
                  <StyledButton color='primary' onClick={onOpenResolutionModal}>
                    <Text typography='SUIT_14_SB' color={colors.black}>
                      {text.buttonContent}
                    </Text>
                    <IconChevronRight />
                  </StyledButton>
                </LoggingClick>
              </ButtonWrapper>
            </Contents>
          )}
          <Responsive only='desktop'>
            <StyledBanner src={isLastGeneration ? Banner.resolution.desktop : Banner.default.desktop} />
          </Responsive>
          <Responsive only='mobile'>
            <StyledBanner src={isLastGeneration ? Banner.resolution.mobile : Banner.default.mobile} />
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
  width: 100%; /* 부모의 가로 길이를 모두 차지합니다. */
  height: 100%; /* 부모의 세로 길이를 모두 차지합니다. */
  object-fit: cover; /* 이미지의 가로세로 비율을 유지하며 컨테이너를 꽉 채우고, 넘치는 부분은 잘라냅니다. */
  object-position: center;
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
  border-radius: 9999px;
  background: linear-gradient(90deg, #d5d6e3 0%, #939aab 100%);
  padding: 10px 16px;
  width: fit-content;

  &:hover {
    background-color: ${({ color }) => (color === 'primary' ? '#84BAFF' : '#B3D4FF')};
  }

  & svg {
    width: 16px;
    height: 16px;
    color: ${colors.black};
  }
`;
