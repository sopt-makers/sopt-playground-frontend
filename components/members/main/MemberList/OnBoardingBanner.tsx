import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface OnBoardingBannerProps {
  className?: string;
  name: string;
}

const OnBoardingBanner: FC<OnBoardingBannerProps> = ({ className, name }) => {
  const { logClickEvent } = useEventLogger();

  return (
    <IntroducePanel className={className}>
      <LeftContainer>
        <StyledImage src='/icons/icon-doublestar.svg' alt='' width='84' />
        <Responsive only='desktop'>
          <TextContainer>
            <Text typography='SUIT_20_R'>{name}님, 안녕하세요!</Text>
            <Text typography='SUIT_24_B'>내 프로필도 등록해보시겠어요?</Text>
          </TextContainer>
        </Responsive>
        <Responsive only='mobile'>
          <TextContainer>
            <Text typography='SUIT_22_R'>{name}님, 안녕하세요!</Text>
            <Text typography='SUIT_22_B'>내 프로필도 등록해보시겠어요?</Text>
          </TextContainer>
        </Responsive>
      </LeftContainer>
      <ButtonContainer>
        <Link href={playgroundLink.projectUpload()} passHref legacyBehavior>
          <UploadButton onClick={() => logClickEvent('onboardingBannerProjectUpload', {})}>
            프로젝트 업로드
          </UploadButton>
        </Link>
        <Link href={playgroundLink.memberUpload()} passHref legacyBehavior>
          <ProfileButton onClick={() => logClickEvent('onboardingBannerProfileUpload', {})}>프로필 추가</ProfileButton>
        </Link>
      </ButtonContainer>
    </IntroducePanel>
  );
};

export default OnBoardingBanner;

const IntroducePanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 42px;
  background-color: ${colors.black80};
  padding: 59px 64px;
  width: 100%;
  height: 208px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    flex-direction: column;
    padding: 30px;
    row-gap: 30px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    background-color: ${colors.black100};
    padding: 0;
    height: auto;
  }
`;

const StyledImage = styled.img`
  width: 84px;
  height: 84px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 20px;
    width: 40px;
    height: 40px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row-reverse;
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    margin-top: 24px;
  }
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 15px 0;
  width: 160px;

  ${textStyles.SUIT_14_SB}
`;

const UploadButton = styled.a`
  ${buttonStyle}

  background-color: ${colors.black60};
  color: ${colors.gray30};
`;

const ProfileButton = styled.a`
  ${buttonStyle}

  background-color: ${colors.purpledim100};
  color: ${colors.purple40};
`;
