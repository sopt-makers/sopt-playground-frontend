import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface DesktopCoffeechatUploadLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  submitButton: ReactNode;
}

export default function DesktopCoffeechatUploadLayout({
  main,
  aside,
  submitButton,
}: DesktopCoffeechatUploadLayoutProps) {
  return (
    <Layout>
      <Main>
        <Body>{main}</Body>
        <Footer>{submitButton}</Footer>
      </Main>
      <Aside>{aside}</Aside>
    </Layout>
  );
}

const Footer = styled.footer`
  margin: 62px 0 50px;
`;

const Layout = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 0 30px;
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 40px;
`;

const Aside = styled.aside``;
