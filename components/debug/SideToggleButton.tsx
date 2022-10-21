import styled from '@emotion/styled';
import { FC } from 'react';

interface SideToggleButtonProps {
  onClick(): void;
}

const SideToggleButton: FC<SideToggleButtonProps> = ({ onClick }) => {
  return <StyledSideToggleButton onClick={onClick}>DEBUG</StyledSideToggleButton>;
};

export default SideToggleButton;

const StyledSideToggleButton = styled.button`
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: white;
  cursor: pointer;
  color: black;
`;
