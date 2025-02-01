import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  children: React.ReactNode;
}

const Popup = ({ isOpen, onClose, onDownload, children }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>{children}</PopupContainer>
      <Buttons>
        <Button size='lg' theme='black' onClick={onClose}>
          {' '.repeat(12)}닫기{' '.repeat(12)}
        </Button>
        <Button size='lg' onClick={onDownload}>
          {' '.repeat(1)} 이미지 저장하기{' '.repeat(1)}
        </Button>
      </Buttons>
    </Backdrop>
  );
};

export default Popup;

const Backdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgb(0 0 0 / 50%);
  width: 100%;
  height: 100%;
`;

const PopupContainer = styled.div`
  position: relative;
  transform: scale(0.7);
  border-radius: 16px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 25%);
  background-color: #1a1a1a;
  padding: 40px 30px 160px;
`;

const Buttons = styled.div`
  display: flex;
  position: absolute;
  gap: 7px;
  justify-content: space-between;
  margin-top: 680px;
  width: 375px;
`;
