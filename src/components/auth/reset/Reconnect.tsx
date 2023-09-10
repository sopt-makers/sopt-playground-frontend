import styled from '@emotion/styled';
import { FC } from 'react';

import AppleAuthButton from '@/components/auth/identityProvider/apple/AppleAuthButton';
import useAppleAuth from '@/components/auth/identityProvider/apple/useAppleAuth';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import Stepper from '@/components/auth/register/Stepper';
import { textStyles } from '@/styles/typography';

interface RegisterProps {
  userInfo: {
    name: string;
  };
}

export const Reconnect: FC<RegisterProps> = ({ userInfo }) => {
  const googleAuth = useGoogleAuth();
  const appleAuth = useAppleAuth();

  return (
    <StyledRegister>
      <Title>소셜 계정 재설정</Title>
      <Description>
        반갑습니다 {userInfo.name}님,
        <br />
        새로 연결할 소셜 계정으로 로그인해주세요.
      </Description>
      <Container>
        {googleAuth.isAvailable && (
          <GoogleAuthButton
            onClick={() => {
              googleAuth.register();
            }}
          >
            Google로 로그인
          </GoogleAuthButton>
        )}
        {appleAuth.isAvailable && (
          <AppleAuthButton
            onClick={() => {
              appleAuth.register();
            }}
          >
            Apple로 로그인
          </AppleAuthButton>
        )}
      </Container>
    </StyledRegister>
  );
};

export default Reconnect;

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
