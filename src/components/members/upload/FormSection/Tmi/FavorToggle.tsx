import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface FavorToggleProps<T extends string> {
  left: T;
  right: T;
  leftLabel?: string;
  rightLabel?: string;
  selected: T | null;
  onSelect: (value: T | null) => void;
  buttonWidth?: number;
}

export default function FavorToggle<T extends string>({
  left,
  right,
  leftLabel,
  rightLabel,
  selected,
  onSelect,
  buttonWidth = 122,
}: FavorToggleProps<T>) {
  const handleClick = (target: T) => {
    onSelect(target === selected ? null : target);
  };

  return (
    <Container>
      <Button onClick={() => handleClick(left)} isSelected={left === selected} buttonWidth={buttonWidth}>
        {leftLabel || left}
      </Button>
      <Versus>vs</Versus>
      <Button onClick={() => handleClick(right)} isSelected={right === selected} buttonWidth={buttonWidth}>
        {rightLabel || right}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-grow: 1;
    width: 100%;
  }
`;

const Button = styled.button<{ isSelected: boolean; buttonWidth: number }>`
  border-radius: 13px;
  background-color: ${({ isSelected }) => (isSelected ? colors.gray10 : colors.gray800)};
  cursor: pointer;
  padding: 14px 0;
  min-width: ${({ buttonWidth }) => buttonWidth}px;
  color: ${({ isSelected }) => (isSelected ? colors.gray950 : colors.gray300)};

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
    width: calc(50% - 14px);
  }
`;

const Versus = styled.div`
  width: 28px;
  text-align: center;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_SB};
`;
