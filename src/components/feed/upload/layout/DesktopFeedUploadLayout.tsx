import FooterHeightProvider from '@/components/feed/upload/layout/provider/FooterHeightProvider';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

interface DesktopFeedUploadLayoutProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function DesktopFeedUploadLayout({ header, body, footer }: DesktopFeedUploadLayoutProps) {
  return (
    <FooterHeightProvider>
      {(footerRef, ready) => (
        <Layout style={{ visibility: ready ? 'visible' : 'hidden' }}>
          <TopLayout>
            <HeaderWrapper>{header}</HeaderWrapper>
            <BodyContainer>
              <BodyWrapper>{body}</BodyWrapper>
            </BodyContainer>
          </TopLayout>
          <FooterContainer ref={footerRef}>{footer}</FooterContainer>
        </Layout>
      )}
    </FooterHeightProvider>
  );
}

const Layout = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-around;
  height: 100vh;

  @supports (height: 100vh) {
    max-height: 100vh;
  }
`;

const TopLayout = styled.div`
  padding-top: 72px;
  padding-bottom: var(--footer-height, 151px);
  width: 100%;
`;

const HeaderWrapper = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.gray800};
  background: ${colors.background};
  padding: 15px 32px;
  width: 100%;
  height: 72px;
`;

const BodyWrapper = styled.div`
  width: 100%;
`;

const BodyContainer = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 24px;
  width: 100%;
`;

const FooterContainer = styled.footer`
  box-sizing: content-box;
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: flex-end;
  align-items: center;
  justify-content: space-between;
  background: ${colors.background};
  padding: 16px;
  width: 100%;
  max-width: 780px;
`;
