import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { m } from 'framer-motion';
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
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

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
      <BackgroundLayer>
        <StyledBackImage />
      </BackgroundLayer>
      <ContentLayer>
        <LoginBox>
          <LoginTitle>
            SOPT 회원으로 인증된
            <br />
            사용자만 로그인할 수 있어요
          </LoginTitle>
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

          {lastLoginMessage != null && (
            <LastLogin
              initial='hide'
              animate='show'
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
          )}
          <HLine />
          <RegisterInfo>Playground가 처음이신가요?</RegisterInfo>
          <RegisterLink href={playgroundLink.register()} onClick={() => logClickEvent('registerLink')}>
            <span>회원 인증하고 Playground 가입하러 가기</span>
            <RegisterIcon />
          </RegisterLink>
        </LoginBox>

        <MadeByMakersLink href={playgroundLink.makers()}>
          <MadeByTitle>이 서비스를 만든 SOPT makers가 궁금하다면?</MadeByTitle>
          <StyledMakersLogo src='/logos/logo-makers-full.svg' alt='makers-logo' />
        </MadeByMakersLink>
      </ContentLayer>
    </StyledLoginPage>
  );
};

export default LoginPage;

setLayout(LoginPage, 'fullScreen');

export const StyledLoginPage = styled.div`
  position: relative;
  height: 100%;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const ContentLayer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  min-height: 600px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 20px;
  }
`;

const StyledBackImage = styled(BackGraphic)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 447px;
  height: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    transform: translateY(-60px);
    width: 180px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h2`
  text-align: center;
  ${fonts.HEADING_32_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_24_SB}
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 36px;
  width: 420px;

  @media ${MOBILE_MEDIA_QUERY} {
    row-gap: 8px;
    margin-top: 24px;
    width: 100%;
  }
`;

const ResetLoginCard = styled(Link)`
  display: grid;
  grid:
    'icon description' auto
    'icon action' auto
    / auto 1fr;
  row-gap: 14px;
  column-gap: 9px;
  margin-top: 12px;
  border-radius: 10px;
  background: rgb(24 119 242 / 20%);
  padding: 16px;
  max-width: 420px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
  }
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

  ${fonts.BODY_14_R}
`;

const ResetLoginAction = styled.div`
  grid-area: action;

  ${fonts.BODY_14_M}
`;

const LastLogin = styled(m.div)`
  padding-top: 25px;
  overflow: hidden;
  color: ${colors.gray100};

  ${fonts.BODY_18_M}

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 20px;

    ${fonts.BODY_14_M}
  }
`;

const HLine = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${colors.gray700};
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 16px 0;
  }
`;

const RegisterInfo = styled.div`
  color: ${colors.gray500};

  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M}
  }
`;

const RegisterLink = styled(Link)`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  transition: 0.3s background-color;
  margin-top: 13px;
  border-radius: 100px;
  background-color: ${colors.gray900};
  padding: 14px;
  color: ${colors.gray300};

  ${fonts.LABEL_16_SB}

  &:hover {
    background-color: ${colors.gray800};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;

    ${fonts.BODY_14_M}
  }
`;

const RegisterIcon = styled(ArrowIcon)`
  width: 30px;
  height: 30px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 20px;
    height: 20px;

    ${fonts.BODY_14_M}
  }
`;

const MadeByTitle = styled.h3`
  color: ${colors.gray600};
  ${fonts.BODY_16_R}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_R}
  }
`;

const MadeByMakersLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
`;

const StyledMakersLogo = styled.img`
  height: 51px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 26px;
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

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.07 11.696c-.895.895-2.526.895-3.422 0l-.367-.367-.734.734.367.367c.651.651 1.548.977 2.445.977l-4.53 4.53.734.735 4.53-4.53c0 .896.326 1.793.977 2.444l.367.367.735-.734-.368-.367c-.895-.896-.895-2.527 0-3.422l.368-.367-.735-.735-.367.368z'
        fill='#808087'
      />
      <circle cx={15.5} cy={15} r={9.953} transform='rotate(-45 15.5 15)' stroke='#808087' strokeWidth={0.864} />
    </svg>
  );
}

function BackGraphic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 617 811' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g opacity={0.05}>
        <path
          d='M766.126 420.261L399.881 810.572h100.62l366.851-390.311H766.126zM497.518 497.14l-289.95 313.432h100.114L497.517 602.88l.001-105.74zM278.576 503.05L.461 807.611h100.616l177.499-191.415V503.05zM366.706-114.941L.461 275.371H101.08l366.851-390.312H366.706z'
          fill='#989BA0'
        />
        <path
          d='M101.054 275.369v532.242H.459V275.369h100.595zM305.202 278.329v532.243H204.607V278.329h100.595zM500.474 278.329v532.243H399.879V278.329h100.595z'
          fill='#FCFCFC'
        />
        <path
          d='M570.855-111.985L204.61 278.326h100.619L672.08-111.985H570.855zM766.126-111.985L399.881 278.326h100.62l366.851-390.311H766.126z'
          fill='#989BA0'
        />
      </g>
    </svg>
  );
}
