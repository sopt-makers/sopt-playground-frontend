import styled from '@emotion/styled';

import { legacyColors } from '@/styles/colors';
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
  background-color: ${({ isSelected }) => (isSelected ? legacyColors.purple100 : legacyColors.black60)};
  cursor: pointer;
  padding: 14px 0;
  width: 76px;
  color: ${({ isSelected }) => (isSelected ? legacyColors.white : legacyColors.gray80)};

  ${textStyles.SUIT_16_SB}

  &:hover {
    color: ${legacyColors.white};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${({ isSelected }) => (isSelected ? legacyColors.purple100 : legacyColors.black80)};
    width: 50%;
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
    background-color: ${legacyColors.black40};
    width: 1px;
    height: 24px;
    content: '';
  }
`;

const RightButton = styled(Button)`
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
`;
