import Text from '@/components/common/Text';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { IconCheck } from '@sopt-makers/icons';
import { fonts } from '@sopt-makers/fonts';

interface RadioBoxProps {
  content: string;
  voteCount: number;
  votePercent: number;
  isSelected: boolean;
  isWinner: boolean;
  isResult: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  mode: 'select' | 'view';
}

const RadioBox = ({
  content,
  voteCount,
  votePercent,
  isSelected,
  isResult,
  isWinner,
  onClick,
  mode,
}: RadioBoxProps) => {
  return (
    <Container onClick={onClick} role='button' mode={mode} isSelected={isSelected}>
      {isSelected && <CheckedIcon />}
      <Text typography='SUIT_14_R' color={colors.gray10} style={{ zIndex: 1 }}>
        {content}
      </Text>
      {isResult && (
        <>
          <Bar votePercent={votePercent} isWinner={isWinner} />
          <VoteResult isWinner={isWinner}>
            {votePercent}% ({voteCount}표)
          </VoteResult>
        </>
      )}
    </Container>
  );
};

export default RadioBox;

const Container = styled.div<{ mode: 'select' | 'view'; isSelected: boolean }>`
  display: flex;
  position: relative;
  gap: 4px;
  align-items: center;
  border-radius: 8px;
  background: ${colors.gray800};
  padding: 8px 12px;
  width: 100%;
  height: 38px;
  overflow: hidden;

  ${(props) =>
    props.mode === 'select' &&
    `
    cursor: pointer;
    &:hover {
        background: ${colors.gray700};

    }
    `}

  ${(props) => props.mode === 'select' && props.isSelected && `background: ${colors.gray700};`}
`;

const CheckedIcon = styled(IconCheck)`
  z-index: 1;
  width: 16px;
  height: 16px;
  color: ${colors.secondary};
`;

const VoteResult = styled.span<{ isWinner: boolean }>`
  position: absolute;
  right: 12px;
  z-index: 1;
  color: ${({ isWinner }) => (isWinner ? colors.secondary : colors.gray100)};
  font: ${fonts.BODY_13_M};
`;

const createWidthAnimation = (percent: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${percent}%;
  }
`;

const Bar = styled.div<{ votePercent: number; isWinner: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ isWinner }) => (isWinner ? colors.orangeAlpha300 : colors.gray700)};
  height: 100%;
  animation: ${({ votePercent }) => createWidthAnimation(votePercent)} 0.8s ease-out forwards;
`;
