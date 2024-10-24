'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { ModalButton } from '@/components/common/Modal/parts';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';

const Image: FC<{}> = () => {
  const [isDocumentLoadded, setIsDocumentLoadded] = useState(false);

  useEffect(() => {
    window.onload = () => {
      setIsDocumentLoadded(true);
    };
  }, []);

  return isDocumentLoadded ? <ImageContent /> : null;
};

function ImageContent() {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('now-sopt');

  return (
    <Content ref={imageRef}>
      <ResolutionMessage />
      <Footer align='stretch'>
        <ModalButton onClick={onDownloadButtonClick}>이미지로 저장하기</ModalButton>
      </Footer>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Footer = styled.div<{ align: 'left' | 'right' | 'stretch'; stack?: 'horizontal' | 'vertical' }>`
  display: grid;
  margin-top: 24px;
  padding: 0 24px;

  ${(props) =>
    props.stack !== 'vertical' &&
    css`
      grid-auto-flow: column;
      column-gap: 8px;
    `}

  ${(props) =>
    props.align === 'stretch' &&
    css`
      grid-auto-columns: minmax(10px, 1fr);
    `}
  ${(props) =>
    props.align === 'left' &&
    css`
      grid-auto-columns: max-content;
    `}
    ${(props) =>
    props.align === 'right' &&
    css`
      grid-auto-columns: max-content;
      justify-content: end;
    `}

    @media screen and (max-width: 768px) {
    grid-auto-columns: minmax(10px, 1fr);
  }
`;

export default Image;
