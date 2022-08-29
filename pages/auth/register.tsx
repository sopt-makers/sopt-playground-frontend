import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import Register from '@/components/auth/register/Register';
import useStringParam from '@/components/auth/useStringParam';
import { useQuery } from 'react-query';
import { auth } from '@/api/auth';

export const RegisterPage: FC = () => {
  const params = useStringParam(['token'] as const);

  const query = useQuery(['registerTokenInfo', params?.token], () => auth.getRegisterTokenInfo(params?.token ?? ''), {
    enabled: params !== null,
  });

  useEffect(() => {
    localStorage.setItem('registerToken', params?.token ?? '');
  });

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
