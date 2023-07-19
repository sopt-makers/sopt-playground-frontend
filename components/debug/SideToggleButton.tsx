import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface SideToggleButtonProps {
  onClick(): void;
}

const SideToggleButton = forwardRef<HTMLButtonElement, SideToggleButtonProps>(({ onClick }, ref) => {
  return (
    <StyledSideToggleButton ref={ref} onClick={onClick} tabIndex={-1}>
      DEBUG
    </StyledSideToggleButton>
  );
});

export default SideToggleButton;

const StyledSideToggleButton = styled.button`
  position: fixed;
  right: 2px;
  bottom: 2px;
  z-index: 100009;
  border-radius: 7px;
  background-color: ${colors.purple60};
  cursor: pointer;
  padding: 5px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_B}

  &:hover {
    background-color: ${colors.white};
    color: ${colors.purple100};
  }
`;
