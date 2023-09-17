import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { forwardRef } from 'react';

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
  background-color: ${colors.blue50};
  cursor: pointer;
  padding: 5px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_B}

  &:hover {
    background-color: ${colors.blue40};
  }
`;
