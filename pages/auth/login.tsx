import FacebookButton from '@/components/auth/idp/facebook/FacebookButton';
import useFacebookAuth from '@/components/auth/idp/useFacebookAuth';
import SquareLink from '@/components/common/SquareLink';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

const LoginPage: FC = () => {
  const facebookAuth = useFacebookAuth();

  return (
    <StyledLoginPage>
      <LoginTitle>SOPT 회원 로그인</LoginTitle>
      <LoginDescription>SOPT에 로그인하고 프로젝트를 공유해보세요</LoginDescription>
      <LinkContainer>
        <FacebookButton onClick={facebookAuth.login}>페이스북으로 로그인</FacebookButton>
        <Link href='/auth/verify' passHref>
          <SquareLink>회원가입</SquareLink>
        </Link>
      </LinkContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20rem;
`;

export const LoginTitle = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

export const LoginDescription = styled.p`
  margin-top: 12px;
  margin-bottom: 80px;
  ${textStyles.SUIT_16_M};
`;

const LinkContainer = styled.div`
  & > * {
    margin-bottom: 20px;
    width: 420px;
  }
`;
