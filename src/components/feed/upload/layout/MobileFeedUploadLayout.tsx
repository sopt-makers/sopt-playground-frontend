import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
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

const HeaderWrapper = styled.header`
  border-bottom: 1px solid ${colors.gray800};
`;

const BodyWrapper = styled.section`
  margin-top: 10px;
  width: 100%;
`;

const FooterWrapper = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  padding: 0 16px;
  width: 100%;
`;
