import styled from '@emotion/styled';

import { MBTI_POSITION_LIST } from '@/components/members/upload/sections/TmiSection/constants';
import { MbtiIndex, MbtiIndicatorPosition } from '@/components/members/upload/sections/TmiSection/types';
import { colors } from '@/styles/colors';

interface MbtiToggleProps {
  onClick: (index: MbtiIndex, position: MbtiIndicatorPosition) => void;
  index: MbtiIndex;
  selectedPosition: MbtiIndicatorPosition | null;
}

export default function MbtiToggle({ index, selectedPosition, onClick }: MbtiToggleProps) {
  return (
    <Container>
      <LeftButton
        onClick={() => {
          onClick(index, 'left');
        }}
        isSelected={selectedPosition === 'left'}
      >
        {MBTI_POSITION_LIST[index].left}
      </LeftButton>
      <RightButton
        onClick={() => {
          onClick(index, 'right');
        }}
        isSelected={selectedPosition === 'right'}
      >
        {MBTI_POSITION_LIST[index].right}
      </RightButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Button = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? colors.purple100 : colors.black60)};
  cursor: pointer;
  padding: 14px 0;
  width: 76px;
  color: ${({ isSelected }) => (isSelected ? colors.white : colors.gray80)};

  &:hover {
    color: ${colors.white};
  }
`;

const LeftButton = styled(Button)`
  position: relative;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;

  &::after {
    position: absolute;
    top: 10px;
    right: -0.5px;
    background-color: ${colors.black40};
    width: 1px;
    height: 24px;
    content: '';
  }
`;

const RightButton = styled(Button)`
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
`;
