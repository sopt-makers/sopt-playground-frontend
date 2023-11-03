import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { postRegistrationInfo } from '@/api/endpoint_LEGACY/auth';
import Reconnect from '@/components/auth/reset/Reconnect';
import { registerTokenAtom } from '@/components/auth/states/registerTokenAtom';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

export const ReconnectPage: FC = () => {
  const { query: params, status } = useStringRouterQuery(['token'] as const);
  const setRegisterToken = useSetRecoilState(registerTokenAtom);

  const query = useQuery({
    queryKey: ['registerTokenInfo', params?.token],
    queryFn: () => postRegistrationInfo(params?.token ?? ''),
    enabled: params !== null,
  });

  useEffect(() => {
    if (status === 'success') {
      setRegisterToken({ type: 'reset', value: params.token });
    }
  }, [params, status, setRegisterToken]);

  if (query.isLoading || query.fetchStatus === 'fetching') {
    return <StyledRegisterPage>잠시만 기다려주세요...</StyledRegisterPage>;
  }

  if (query.isError || !query.data) {
    return <StyledRegisterPage>올바르지 않은 접근입니다.</StyledRegisterPage>;
  }

  return (
    <StyledRegisterPage>
      <Reconnect userInfo={{ name: query.data.name }} />
    </StyledRegisterPage>
  );
};

setLayout(ReconnectPage, 'fullScreen');

export default ReconnectPage;

const StyledRegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
