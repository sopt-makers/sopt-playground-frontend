import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { colors } from '@/styles/colors';

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
  right: 10px;
  bottom: 10px;
  z-index: 100009;
  border-radius: 7px;
  background-color: ${colors.purple60};
  cursor: pointer;
  padding: 5px;
  color: ${colors.gray100};
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.purple100};
  }
`;
