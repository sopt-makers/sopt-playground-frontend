import styled from '@emotion/styled';

import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface FavorToggleProps<T extends string> {
  left: T;
  right: T;
  selected: T | null;
  onSelect: (value: T | null) => void;
}

export default function FavorToggle<T extends string>({ left, right, selected, onSelect }: FavorToggleProps<T>) {
  const handleClick = (target: T) => {
    onSelect(target === selected ? null : target);
  };

  return (
    <Container>
      <Button onClick={() => handleClick(left)} isSelected={left === selected}>
        {left}
      </Button>
      <Versus>vs</Versus>
      <Button onClick={() => handleClick(right)} isSelected={right === selected}>
        {right}
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

const Button = styled.button<{ isSelected: boolean }>`
  border-radius: 13px;
  background-color: ${({ isSelected }) => (isSelected ? legacyColors.purple100 : legacyColors.black60)};
  cursor: pointer;
  padding: 14px 0;
  width: 122px;
  color: ${({ isSelected }) => (isSelected ? legacyColors.white : legacyColors.gray80)};

  ${textStyles.SUIT_16_SB}

  &:hover {
    color: ${legacyColors.white};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${({ isSelected }) => (isSelected ? legacyColors.purple100 : legacyColors.black80)};
    width: calc(50% - 14px);
  }
`;

const Versus = styled.div`
  width: 28px;
  text-align: center;
  color: ${legacyColors.white};

  ${textStyles.SUIT_16_SB};
`;
