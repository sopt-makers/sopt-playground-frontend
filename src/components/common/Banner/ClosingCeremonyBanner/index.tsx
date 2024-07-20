import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import desktopBanner from '@/public/icons/img/banner_closing-ceremony_desktop.png';
import mobileBanner from '@/public/icons/img/banner_closing-ceremony_mobile.png';
import mobileResolutionBanner from '@/public/icons/img/banner_closing-ceremony_mobile_resolution.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type BannerType = {
  desktop: string;
  mobile: { [key: string]: string };
};

export const ClosingCeremonyBanner = () => {
  const Banner: BannerType = {
    desktop: desktopBanner.src,
    mobile: { default: mobileBanner.src, resolution: mobileResolutionBanner.src },
  };

  return (
    <ClosingCeremonyBannerWrapper>
      <Responsive only='desktop'>
        <Contents>
          <TextWrapper>
            <Text typography='SUIT_18_B' color={colors.white}>
              SOPT에서 외쳤던 다짐, 모두 이루셨나요?
            </Text>
            <Text typography='SUIT_12_M' color={colors.gray300}>
              NOW SOPT를 처음 만났던 순간으로 돌아가보기
            </Text>
          </TextWrapper>
          <ButtonWrapper>
            <Button color='secondary'>
              <Text typography='SUIT_12_EB' color={colors.gray700}>
                활동 후기 작성하기
              </Text>
            </Button>
            <Button color='primary'>
              <Text typography='SUIT_12_EB' color={colors.gray700}>
                내 다짐 보러가기
              </Text>
            </Button>
          </ButtonWrapper>
        </Contents>
        <StyledBanner src={Banner.desktop} />
      </Responsive>
    </ClosingCeremonyBannerWrapper>
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
