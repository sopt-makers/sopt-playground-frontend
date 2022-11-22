import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';

import { postRegistrationInfo } from '@/api/registration';
import Register from '@/components/auth/register/Register';
import useQueryStringParam from '@/components/auth/useQueryString';
import { setLayout } from '@/utils/layout';

export const RegisterPage: FC = () => {
  const params = useQueryStringParam(['token'] as const);

  const query = useQuery(['registerTokenInfo', params?.token], () => postRegistrationInfo(params?.token ?? ''), {
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
      <Register userInfo={{ name: query.data.name }} />
    </StyledRegisterPage>
  );
};

setLayout(RegisterPage, 'empty');

export default RegisterPage;

const StyledRegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
