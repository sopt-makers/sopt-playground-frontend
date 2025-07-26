import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import Image from 'next/image';

import luckyReadyImg from '@/public/icons/img/luckyDraw/ready.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface LuckyReadyProps {
  onStart: () => void;
}

const LuckyReady = ({ onStart }: LuckyReadyProps) => {
  return (
    <Wrapper>
      <HeaderSection>
        <StyledTitle>
          행운 가득한
          <br />
          타임캡솝 열고 수료 선물 받기
        </StyledTitle>
        <StyledSubTitle>랜덤으로 소수의 인원에게 AT SOPT 수료 선물이 나와요</StyledSubTitle>
      </HeaderSection>
      <ImgWrapper>
        <StyledImg src={luckyReadyImg.src} alt='행운뽑기' priority fill />
      </ImgWrapper>
      <StyledButton onClick={onStart}>두근두근. 타임캡솝의 주인공은 바로 나!</StyledButton>
    </Wrapper>
  );
};

export default LuckyReady;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: space-between;
    padding: 48px 0 20px;
    height: calc(100vh - 64px);
  }
`;

const StyledTitle = styled.h1`
  ${fonts.HEADING_28_B}

  text-align: center;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B}
  }
`;

const StyledButton = styled(Button)`
  border-radius: 12px;
  background: linear-gradient(90deg, #d5d6e3 0%, #939aab 100%);
  width: 560px;
  height: 56px;
  ${fonts.LABEL_18_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 320px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`;

const StyledSubTitle = styled.p`
  color: ${colors.gray300};
  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M}
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 448px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 304px;
    height: 344px;
  }
`;

const StyledImg = styled(Image)`
  object-fit: contain;
`;
