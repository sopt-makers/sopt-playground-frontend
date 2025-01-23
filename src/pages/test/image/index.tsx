import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ModalButton } from '@/components/common/Modal/parts';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';

function ImageContent() {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('now-sopt');

  return (
    <>
      <Content ref={imageRef}>
        <ResolutionWrapper>
          <ResolutionMessage />
        </ResolutionWrapper>
      </Content>
      <Footer align='stretch'>
        <ModalButton onClick={onDownloadButtonClick}>이미지로 저장하기</ModalButton>
      </Footer>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ResolutionWrapper = styled.div`
  width: fit-content;
`;

const Footer = styled.div<{ align: 'left' | 'right' | 'stretch'; stack?: 'horizontal' | 'vertical' }>`
  display: grid;
  margin-top: 24px;
  padding: 0 24px;

  ${({ align }) =>
    align === 'stretch' &&
    css`
      grid-auto-columns: minmax(10px, 1fr);
    `}

  @media screen and (max-width: 768px) {
    grid-auto-columns: minmax(10px, 1fr);
  }
`;

export default ImageContent;
