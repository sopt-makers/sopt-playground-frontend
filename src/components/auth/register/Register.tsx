import styled from '@emotion/styled';
import { FC } from 'react';

import AppleAuthButton from '@/components/auth/identityProvider/apple/AppleAuthButton';
import useAppleAuth from '@/components/auth/identityProvider/apple/useAppleAuth';
import FacebookButton from '@/components/auth/identityProvider/facebook/FacebookButton';
import useFacebookAuth from '@/components/auth/identityProvider/facebook/useFacebookAuth';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import Stepper from '@/components/auth/register/Stepper';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { textStyles } from '@/styles/typography';

interface RegisterProps {
  userInfo: {
    name: string;
  };
}

export const Register: FC<RegisterProps> = (props) => {
  const { userInfo } = props;
  const { logClickEvent } = useEventLogger();

  const facebookAuth = useFacebookAuth();
  const googleAuth = useGoogleAuth();
  const appleAuth = useAppleAuth();

  return (
    <StyledRegister>
      <StyledStepper step={2} />
      <Title>소셜 계정 연동</Title>
      <Description>
        반갑습니다 {userInfo.name}님,
        <br />
        소셜 로그인을 진행하여 회원가입을 완료해주세요
      </Description>
      <Container>
        <FacebookButton
          onClick={() => {
            facebookAuth.register();
            logClickEvent('registerWith', { method: 'facebook' });
          }}
        >
          페이스북으로 로그인
        </FacebookButton>
        {googleAuth.isAvailable && (
          <GoogleAuthButton
            onClick={() => {
              googleAuth.register();
              logClickEvent('registerWith', { method: 'google' });
            }}
          >
            Google로 로그인
          </GoogleAuthButton>
        )}
        {appleAuth.isAvailable && (
          <AppleAuthButton
            onClick={() => {
              appleAuth.register();
              logClickEvent('registerWith', { method: 'apple' });
            }}
          >
            Apple로 로그인
          </AppleAuthButton>
        )}
      </Container>
    </StyledRegister>
  );
};

export default Register;

const StyledRegister = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  padding: 64px 24px;
  max-width: 420px;
`;

const StyledStepper = styled(Stepper)``;

const Title = styled.h2`
  margin-top: 40px;
  text-align: center;

  ${textStyles.SUIT_32_SB}
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 50px;
  text-align: center;
  line-height: 24px;
  ${textStyles.SUIT_16_M};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;

  & > * {
    margin-bottom: 20px;
    width: 420px;
  }
`;
