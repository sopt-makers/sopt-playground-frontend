import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MobileCoffeechatUploadLayoutProps {
  main: ReactNode;
  submitButton: ReactNode;
}

export default function MobileCoffeechatUploadLayout({ main, submitButton }: MobileCoffeechatUploadLayoutProps) {
  return (
    <Layout>
      <>{main}</>
      <Footer>{submitButton}</Footer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-bottom: 180px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 48px;
  }

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const Footer = styled.footer`
  margin: 40px 0 56px;
  width: 100%;
`;
