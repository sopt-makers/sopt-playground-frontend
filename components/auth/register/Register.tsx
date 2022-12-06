import styled from '@emotion/styled';
import { FC } from 'react';

import FacebookButton from '@/components/auth/identityProvider/facebook/FacebookButton';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import Stepper from '@/components/auth/register/Stepper';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface RegisterProps {
  userInfo: {
    name: string;
  };
}

export const Register: FC<RegisterProps> = (props) => {
  const { userInfo } = props;

  const facebookAuth = useFacebookAuth();
  const googleAuth = useGoogleAuth();

  return (
    <StyledRegister>
      <Stepper step={2} />
      <Title>회원가입</Title>
      <Description>
        반갑습니다 {userInfo.name}님,
        <br />
        소셜 로그인을 진행하여 회원가입을 완료해주세요
      </Description>
      <Container>
        <FacebookButton onClick={facebookAuth.register}>페이스북으로 로그인</FacebookButton>
        <GoogleAuthButton onClick={googleAuth.register}>Google로 로그인</GoogleAuthButton>
        <Info>현재는 페이스북 로그인만 지원하고 있어요</Info>
      </Container>
    </StyledRegister>
  );
};

export default Register;

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
`;

const Title = styled.h2`
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
`;

const Info = styled.p`
  margin-top: 16px;
  text-align: center;
  color: ${colors.gray80};
  ${textStyles.SUIT_12_M};
`;
