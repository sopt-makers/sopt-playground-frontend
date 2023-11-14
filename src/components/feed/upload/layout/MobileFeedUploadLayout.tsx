import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MobileFeedUploadLayoutProps {
  header: ReactNode;
  aside: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function MobileFeedUploadLayout({ header, aside, body, footer }: MobileFeedUploadLayoutProps) {
  return (
    <>
      <HeaderWrapper>{header}</HeaderWrapper>
      <AsideWrapper>{aside}</AsideWrapper>
      <BodyWrapper>{body}</BodyWrapper>
      <FooterWrapper>{footer}</FooterWrapper>
    </>
  );
}

const HeaderWrapper = styled.header``;

const AsideWrapper = styled.aside`
  display: flex;
  gap: 16px;
  padding: 24px 16px;
`;

const BodyWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 16px 0;
  width: 100%;
`;
