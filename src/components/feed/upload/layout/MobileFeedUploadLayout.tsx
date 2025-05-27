import FooterHeightProvider from '@/components/feed/upload/layout/provider/FooterHeightProvider';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

interface MobileFeedUploadLayoutProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function MobileFeedUploadLayout({ header, body, footer }: MobileFeedUploadLayoutProps) {
  return (
    <FooterHeightProvider>
      {(footerRef) => (
        <>
          <HeaderWrapper>{header}</HeaderWrapper>
          <BodyWrapper>{body}</BodyWrapper>
          <FooterWrapper ref={footerRef}>{footer}</FooterWrapper>
        </>
      )}
    </FooterHeightProvider>
  );
}

const HeaderWrapper = styled.header`
  border-bottom: 1px solid ${colors.gray800};
  padding-top: 44px;
`;

const BodyWrapper = styled.section`
  margin-bottom: var(--footer-height, 50px);
  padding-top: 16px;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  gap: 8px;
  background: ${colors.background};
  padding: 16px;
  width: 100%;
`;
