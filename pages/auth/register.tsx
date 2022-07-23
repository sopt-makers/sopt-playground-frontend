import useFacebookAuth from '@/components/auth/idp/useFacebookAuth';
import { useStringParam } from '@/components/auth/hooks';
import axios from 'axios';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { textStyles } from '@/styles/typography';
import FacebookButton from '@/components/auth/idp/facebook/FacebookButton';
import { colors } from '@/styles/colors';

export const RegisterPage: FC = () => {
  const facebookAuth = useFacebookAuth();

  const [info, setInfo] = useState<{ name: string; generation: number } | null>(null);

  useStringParam(['token'], async ({ token }) => {
    const res = await axios.post('http://localhost:5000/api/v1/register/checkToken', {
      registerToken: token,
    });

    setInfo({
      name: res.data.name,
      generation: res.data.generation,
    });
    localStorage.setItem('registerToken', token);
  });

  return (
    <StyledRegisterPage>
      <Title>회원가입</Title>
      <Description>
        반갑습니다 {info?.name}님,
        <br />
        소셜 로그인을 진행하여 회원가입을 완료해주세요
      </Description>
      <Container>
        <FacebookButton onClick={facebookAuth.register}>페이스북으로 로그인</FacebookButton>
        <Info>현재는 페이스북 로그인만 지원하고 있어요</Info>
      </Container>
    </StyledRegisterPage>
  );
};

export default RegisterPage;

const StyledRegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20rem;
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
