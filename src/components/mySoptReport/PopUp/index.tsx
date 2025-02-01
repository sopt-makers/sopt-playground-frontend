import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
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
        <Responsive only='desktop'>
          <Button size='lg' theme='black' onClick={onClose}>
            {' '.repeat(12)}닫기{' '.repeat(12)}
          </Button>
        </Responsive>
        <Responsive only='desktop'>
          <Button size='lg' onClick={onDownload}>
            이미지 저장하기
          </Button>
        </Responsive>

        <Responsive only='mobile'>
          <Button size='md' theme='black' onClick={onClose}>
            {' '.repeat(10)}닫기{' '.repeat(10)}
          </Button>
        </Responsive>
        <Responsive only='mobile'>
          <Button size='md' onClick={onDownload}>
            이미지 저장하기
          </Button>
        </Responsive>
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

  @media ${MOBILE_MEDIA_QUERY} {
    transform: scale(0.6);
  }
`;

const Buttons = styled.div`
  display: flex;
  position: absolute;
  gap: 7px;
  justify-content: space-between;
  margin-top: 680px;
  width: 375px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 600px;
    width: 315px;
  }
`;

const MoButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
  justify-content: space-between;
  width: 315px;
`;
