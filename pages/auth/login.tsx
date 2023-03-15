import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import FacebookButton from '@/components/auth/identityProvider/facebook/FacebookButton';
import useFacebookAuth from '@/components/auth/identityProvider/facebook/useFacebookAuth';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const LoginPage: FC = () => {
  const facebookAuth = useFacebookAuth();
  const googleAuth = useGoogleAuth();

  return (
    <StyledLoginPage>
      <LoginBox>
        <LoginTitle>
          <LoginPrefix>SOPT Playground에</LoginPrefix> 오신 것을 환영해요!
        </LoginTitle>
        <LoginDescription>
          Playground는 SOPT 회원만을 위한 공간이에요.
          <br />
          지금 회원가입하고, 역대 SOPT 구성원들과 소통해 보아요!
        </LoginDescription>
        <LinkContainer>
          <FacebookButton onClick={facebookAuth.login}>페이스북으로 로그인</FacebookButton>
          {googleAuth.isAvailable && <GoogleAuthButton onClick={googleAuth.login}>Google로 로그인</GoogleAuthButton>}
        </LinkContainer>
        <RegisterInfo>
          Playground가 처음이신가요? <RegisterLink href={playgroundLink.register()}>회원가입하기</RegisterLink>
        </RegisterInfo>
      </LoginBox>

      <Link href={playgroundLink.makers()} passHref legacyBehavior>
        <MadeByMakersLink>
          <MadeByTitle>made by</MadeByTitle>
          <StyledMakersLogo src='/logos/logo-makers-full.svg' alt='makers-logo' />
        </MadeByMakersLink>
      </Link>
    </StyledLoginPage>
  );
};

export default LoginPage;

setLayout(LoginPage, 'fullScreen');

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 20px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h2`
  text-align: center;
  ${textStyles.SUIT_32_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B}
  }
`;

const LoginPrefix = styled.span`
  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;

export const LoginDescription = styled.p`
  margin-top: 12px;
  text-align: center;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 420px;
  row-gap: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    row-gap: 10px;
  }
`;

const RegisterInfo = styled.div`
  margin-top: 30px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 37px;

    ${textStyles.SUIT_12_M}
  }
`;

const RegisterLink = styled(Link)`
  transition: 0.2s color;
  text-decoration: underline;
  color: ${colors.purple100};

  :hover {
    color: ${colors.purple80};
  }
`;

const MadeByMakersLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  max-width: 234px;
`;

const MadeByTitle = styled.h3`
  ${textStyles.SUIT_20_R};
`;

const StyledMakersLogo = styled.img``;
