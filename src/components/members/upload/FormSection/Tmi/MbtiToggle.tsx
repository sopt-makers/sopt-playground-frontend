import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MbtiToggleProps<T> {
  left: T;
  right: T;
  selected: T | null;
  onSelect: (value: T | null) => void;
}

export default function MbtiToggle<T extends string | null>({ left, right, selected, onSelect }: MbtiToggleProps<T>) {
  const handleClick = (target: T) => {
    onSelect(target === selected ? null : target);
  };

  return (
    <Container>
      <LeftButton onClick={() => handleClick(left)} isSelected={left === selected}>
        {left}
      </LeftButton>
      <RightButton onClick={() => handleClick(right)} isSelected={right === selected}>
        {right}
      </RightButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 48%;
  }
`;

const Button = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? colors.gray10 : colors.gray700)};
  cursor: pointer;
  padding: 14px 0;
  width: 76px;
  color: ${({ isSelected }) => (isSelected ? colors.gray950 : colors.gray10)};

  ${textStyles.SUIT_16_SB}

  ${({ isSelected }) =>
    isSelected &&
    css`
      &:hover {
        background-color: ${colors.gray50};
        color: ${colors.gray950};
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 50%;
  }
`;

const LeftButton = styled(Button)`
  position: relative;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
`;

const RightButton = styled(Button)`
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
`;
