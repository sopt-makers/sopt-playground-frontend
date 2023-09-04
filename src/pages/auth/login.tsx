import styled from '@emotion/styled';
import { m, Variants } from 'framer-motion';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import AppleAuthButton from '@/components/auth/identityProvider/apple/AppleAuthButton';
import useAppleAuth from '@/components/auth/identityProvider/apple/useAppleAuth';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import { lastLoginMethodAtom } from '@/components/auth/states/lastLoginMethodAtom';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
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
  const { logClickEvent } = useEventLogger();

  const lastLoginMethod = useRecoilValue(lastLoginMethodAtom);

  const googleAuth = useGoogleAuth();
  const appleAuth = useAppleAuth();

  const [lastLoginMessage, setLastLoginMessage] = useState<null | string>(null);

  useEffect(() => {
    switch (lastLoginMethod) {
      case 'google':
        setLastLoginMessage('Google');
        break;
      case 'facebook':
        setLastLoginMessage('Facebook');
        break;
      default:
    }
  }, [lastLoginMethod]);

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
          {googleAuth.isAvailable && <GoogleAuthButton onClick={googleAuth.login}>Google로 로그인</GoogleAuthButton>}
          {appleAuth.isAvailable && <AppleAuthButton onClick={appleAuth.login}>Apple로 로그인</AppleAuthButton>}
        </LinkContainer>
        <ResetLoginCard href={playgroundLink.resetLogin()}>
          <StyledWarningIcon />
          <ResetLoginDescription>
            Facebook 정책이 변경되어, 앞으로 Facebook 로그인이 불가해요. 다른 계정으로 재설정 부탁드려요.
          </ResetLoginDescription>
          <ResetLoginAction>소셜 계정 재설정하기 {'>'}</ResetLoginAction>
        </ResetLoginCard>
        <RegisterInfo>
          Playground가 처음이신가요?{' '}
          <RegisterLink href={playgroundLink.register()} onClick={() => logClickEvent('registerLink')}>
            회원가입하기
          </RegisterLink>
        </RegisterInfo>

        <LastLogin
          initial='hide'
          animate={lastLoginMessage ? 'show' : 'hide'}
          variants={{
            show: {
              opacity: 1,
            },
            hide: {
              opacity: 0,
            },
          }}
        >
          마지막으로 로그인한 계정은 {lastLoginMessage}이에요.
        </LastLogin>
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
  row-gap: 20px;
  margin-top: 50px;
  width: 420px;

  @media ${MOBILE_MEDIA_QUERY} {
    row-gap: 10px;
    width: 100%;
  }
`;

const ResetLoginCard = styled(Link)`
  display: grid;
  grid:
    'icon description' auto
    'icon action' auto
    / auto 1fr;
  row-gap: 8px;
  column-gap: 14px;
  margin-top: 12px;
  border-radius: 10px;
  background: rgb(24 119 242 / 20%);
  padding: 16px;
  max-width: 420px;
`;

const StyledWarningIcon = styled(WarningIcon)`
  grid-area: icon;
  margin-top: 2px;
  width: 14px;
  height: 14px;
`;

const ResetLoginDescription = styled.div`
  grid-area: description;
  line-height: 135%;
  color: #e4edff; /* TODO: 컬러 시스템 완성되면 변경 필요 */

  ${textStyles.SUIT_14_M}
`;

const ResetLoginAction = styled.div`
  grid-area: action;

  ${textStyles.SUIT_14_M}
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

const LastLogin = styled(m.div)`
  margin-top: 25px;
  color: ${colors.purple100};

  ${textStyles.SUIT_16_SB}
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
  margin-top: 10px;
  height: 53px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 35px;
  }
`;

function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={14} height={14} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 0a7 7 0 100 14A7 7 0 007 0zm.572 4.143a.571.571 0 00-1.143 0v3.214a.571.571 0 101.143 0V4.143zM7 10.572a.714.714 0 100-1.43.714.714 0 000 1.43z'
        fill='#E4EDFF'
      />
    </svg>
  );
}
