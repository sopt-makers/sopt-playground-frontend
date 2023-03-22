import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
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
`;

const Button = styled.button<{ isSelected: boolean }>`
  border-radius: 13px;
  background-color: ${({ isSelected }) => (isSelected ? colors.purple100 : colors.black60)};
  cursor: pointer;
  padding: 14px 0;
  width: 122px;
  color: ${({ isSelected }) => (isSelected ? colors.white : colors.gray80)};

  ${textStyles.SUIT_16_SB}
`;

const Versus = styled.div`
  color: ${colors.white};

  ${textStyles.SUIT_16_SB};
`;
