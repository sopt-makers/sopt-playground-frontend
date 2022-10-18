import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';

interface DebugDrawerProps {
  isOpen: boolean;
  onClose(): void;
  children?: ReactNode;
}

const DebugDrawer: FC<DebugDrawerProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const keydownHandler = () => {
      onClose();
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [onClose]);

  return (
    <StyledDebugDrawer isOpen={isOpen}>
      <Header>
        <HeaderTitle>Debug Panel</HeaderTitle>
        <CloseButton onClick={() => onClose()}>X</CloseButton>
      </Header>
      <Content>{children}</Content>
    </StyledDebugDrawer>
  );
};

export default DebugDrawer;

const StyledDebugDrawer = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  transition: transform 0.3s ease-in 0s;
  z-index: 99999999;
  border-right: 1px solid gray;
  background-color: white;
  width: 500px;
  overflow: visible;
  color: black;

  ${(props) =>
    props.isOpen
      ? css`
          right: 0;
          transform: none;
        `
      : css`
          transform: translateX(100%);
        `}
`;

const Header = styled.div`
  display: flex;
`;

const HeaderTitle = styled.h2`
  flex-grow: 1;
`;

const Content = styled.div``;

const CloseButton = styled.button`
  color: black;
`;
