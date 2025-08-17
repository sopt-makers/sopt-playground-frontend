import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';

import LottiePlayer from '@/components/luckydraw/LottiePlayer';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface LuckyLoadingProps {
  onComplete: () => void;
}

const LuckyLoading = ({ onComplete }: LuckyLoadingProps) => {
  return (
    <Wrapper>
      <StyledTitle>타임캡솝을 뽑고 있어요</StyledTitle>
      <LottiePlayer
        keyId='onboarding'
        src='/lottie/lucky.lottie'
        style={{ maxWidth: '575px', maxHeight: '560px' }}
        onComplete={onComplete}
      />
    </Wrapper>
  );
};

export default LuckyLoading;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    padding-top: 48px;
    height: calc(100vh - 64px);
  }
`;

const StyledTitle = styled.h1`
  ${fonts.HEADING_28_B}

  text-align: center;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B}

    margin-bottom: 72px;
  }
`;
