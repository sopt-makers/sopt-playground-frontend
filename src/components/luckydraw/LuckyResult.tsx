import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

import loserImage from '@/public/icons/img/luckyDraw/LoserImage.png';
import winnerImage from '@/public/icons/img/luckyDraw/WinnerImage.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface LuckyResultProps {
  isWinner: boolean;
  username: string;
  onClickButton: () => void;
}

const LuckyResult = ({ isWinner, username, onClickButton }: LuckyResultProps) => {
  return (
    <Wrapper>
      <StyledTitle>
        {isWinner ? (
          <>
            축하해요 <StyledSpan>{username}</StyledSpan>님!
            <br />
            해당 화면을 <StyledSpan>캡쳐</StyledSpan>하고
            <MobileLineBreak /> 수료 선물을 받아보세요
          </>
        ) : (
          <>
            꽝! 아쉬워요.ㅠ.ㅠ
            <br />
            AT SOPT과 함께한 추억
            <MobileLineBreak />
            잊지 않을게요
          </>
        )}
      </StyledTitle>
      <StyledImg src={isWinner ? winnerImage.src : loserImage.src} />
      <StyledButton onClick={onClickButton}>{isWinner ? '화면 캡쳐하고 다음으로 >' : '홈으로 돌아가기 >'}</StyledButton>
    </Wrapper>
  );
};

export default LuckyResult;

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

const StyledImg = styled.img`
  width: 400px;
  height: 448px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 304px;
    height: 344px;
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

const StyledSpan = styled.span`
  color: ${colors.secondary};
`;

const MobileLineBreak = styled.br`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: inline;
  }
`;
