import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

interface DesktopFeedUploadLayoutProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function DesktopFeedUploadLayout({ header, body, footer }: DesktopFeedUploadLayoutProps) {
  return (
    <Layout>
      <TopLayout>
        <HeaderWrapper>{header}</HeaderWrapper>
        <BodyContainer>
          <BodyWrapper>{body}</BodyWrapper>
        </BodyContainer>
      </TopLayout>
      <FooterContainer>
        <FooterWrapper>{footer}</FooterWrapper>
      </FooterContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-around;
  height: 100vh;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;

const TopLayout = styled.div`
  width: 100%;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.gray800};
  padding: 15px 32px;
  width: 100%;
  height: 64px;
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

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  max-width: 640px;
`;

const FooterContainer = styled.footer`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
`;
