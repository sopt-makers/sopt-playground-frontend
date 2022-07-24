import { FC } from 'react';
import styled from '@emotion/styled';
import Register from '@/components/auth/register/Register';
import { useStringParam } from '@/components/auth/hooks';
import axios from 'axios';
import { useQuery } from 'react-query';

export const RegisterPage: FC = () => {
  const params = useStringParam(['token'] as const);

  const query = useQuery(
    ['registerTokenInfo', 123],
    () =>
      axios.post<{ name: string; generation: number }>('http://localhost:5000/api/v1/register/checkToken', {
        registerToken: params?.token,
      }),
    {
      enabled: params !== null,
    },
  );

  if (query.isLoading || query.isIdle) {
    return <StyledRegisterPage>잠시만 기다려주세요...</StyledRegisterPage>;
  }

  if (query.isError || !query.data) {
    return <StyledRegisterPage>올바르지 않은 접근입니다.</StyledRegisterPage>;
  }

  return (
    <StyledRegisterPage>
      <Register userInfo={query.data.data} />
    </StyledRegisterPage>
  );
};

export default RegisterPage;

const StyledRegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
