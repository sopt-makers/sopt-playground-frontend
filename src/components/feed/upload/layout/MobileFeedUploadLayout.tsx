import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MobileFeedUploadLayoutProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function MobileFeedUploadLayout({ header, body, footer }: MobileFeedUploadLayoutProps) {
  return (
    <>
      <HeaderWrapper>{header}</HeaderWrapper>
      <BodyWrapper>{body}</BodyWrapper>
      <FooterWrapper>{footer}</FooterWrapper>
    </>
  );
}

const HeaderWrapper = styled.header``;

const BodyWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  display: flex;
  position: absolute;
  bottom: 8px;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  width: 100%;
`;
