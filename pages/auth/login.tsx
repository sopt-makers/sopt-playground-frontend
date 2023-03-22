import styled from '@emotion/styled';
import { m, Variants } from 'framer-motion';
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

const tooltipVariants: Variants = {
  init: {
    opacity: 0,
    scale: 0.8,
    y: '50%',
  },
  open: {
    opacity: 1,
    y: '0',
    scale: 1,
    transition: {
      type: 'spring',
    },
  },
  hover: {
    y: '-5px',
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
    },
  },
};

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

      <MotionMakersContainer initial='init' animate='open' whileHover='hover'>
        <MadeByMakersLink href={playgroundLink.makers()}>
          <MadeByTitle>made by</MadeByTitle>
          <StyledMakersLogo src='/logos/logo-makers-full.svg' alt='makers-logo' />
        </MadeByMakersLink>
        <TooltipHolder>
          <MotionTooltip variants={tooltipVariants}>
            <TooltipRect>이 서비스를 만든 sopt makers 사람들이 궁금하다면?</TooltipRect>
            <TooltipArrow />
          </MotionTooltip>
        </TooltipHolder>
      </MotionMakersContainer>
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

const MotionMakersContainer = styled(m.div)`
  position: relative;
  margin-top: 40px;
`;

const TooltipHolder = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 20px));
`;

const MotionTooltip = styled(m.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TooltipRect = styled.div`
  border-radius: 12px;
  background-color: ${colors.black60};
  padding: 18px 16px;
  white-space: nowrap;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 15px 20px;

    ${textStyles.SUIT_12_M};
  }
`;

const TooltipArrow = styled.div`
  border: 10px solid transparent;
  border-top: 12px solid ${colors.black60};
  border-bottom: 0;
  width: 0;
  height: 0;
`;

const MadeByMakersLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 234px;
`;

const MadeByTitle = styled.h3`
  ${textStyles.SUIT_20_R};
`;

const StyledMakersLogo = styled.img`
  height: 53px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 35px;
  }
`;
