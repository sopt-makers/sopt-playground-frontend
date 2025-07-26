import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import Image from 'next/image';

import Responsive from '@/components/common/Responsive';
import luckyResultDesktop from '@/public/icons/img/luckyDraw/result_desktop.png';
import luckyResultMobile from '@/public/icons/img/luckyDraw/result_mobile.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type BannerType = {
  desktop: string;
  mobile: string;
};

const lurckResultImg: BannerType = {
  desktop: luckyResultDesktop.src,
  mobile: luckyResultMobile.src,
};

interface Props {
  onClickNext: () => void;
}

const LuckyWinnerGuide = ({ onClickNext }: Props) => {
  return (
    <Wrapper>
      <HeaderSection>
        <StyledTitle>
          카카오톡 플러스친구에
          <MobileLineBreak /> SOPT makers를
          <DesktopLineBreak /> 추가하고,
          <MobileLineBreak /> 캡쳐한 당첨 화면을 보내주세요
        </StyledTitle>
        <StyledSubTitle>보내주시면, 상품 수령을 위한 가이드를 전달 드려요</StyledSubTitle>
      </HeaderSection>
      <BannerWrapper>
        <Responsive only='desktop'>
          <StyledImg src={lurckResultImg.desktop} alt={`데스크탑 환영 배너`} width={400} height={364} priority />
        </Responsive>
        <Responsive only='mobile'>
          <StyledImg src={lurckResultImg.mobile} alt={`모바일 환영 배너`} width={320} height={397} priority />
        </Responsive>
      </BannerWrapper>
      <ButtonWrapper>
        <StyledButton onClick={onClickNext}>SOPT makers 채널에 인증하기</StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default LuckyWinnerGuide;

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
  white-space: pre-line;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B}
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const BannerWrapper = styled.div``;

const StyledImg = styled(Image)`
  object-fit: contain;
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

const MobileLineBreak = styled.br`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: inline;
  }
`;

const DesktopLineBreak = styled.br`
  display: inline;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
