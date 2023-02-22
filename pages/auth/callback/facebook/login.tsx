import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import LoginCallbackView from '@/components/auth/callback/LoginCallbackView';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
  const lastUnauthorized = useLastUnauthorized();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const { query: queryData, status: queryStatus } = useStringRouterQuery(['code', 'state'] as const);

  const { data, status } = useQuery(
    ['facebookLoginCallback'],
    async () => {
      if (queryStatus !== 'success') {
        throw new Error('Invalid state');
      }
      return facebookAuth.sendLoginRequest(queryData.code, queryData.state);
    },
    {
      enabled: queryStatus === 'success',
      onSuccess(result) {
        if (result.success) {
          setAccessToken(result.accessToken);
          router.replace(lastUnauthorized.popPath() ?? '/');
        }
      },
    },
  );

  if (queryStatus === 'error') {
    return <LoginCallbackView mode={{ type: 'error', errorMessage: '잘못된 접근입니다.' }} />;
  }

  if (queryStatus === 'loading' || status === 'idle' || status === 'loading') {
    return <LoginCallbackView mode={{ type: 'loading' }} />;
  }

  if (status === 'error') {
    return <LoginCallbackView mode={{ type: 'error', errorMessage: '알 수 없는 오류입니다.' }} />;
  }

  if (!data.success) {
    if (data.error === 'invalidNonce') {
      return <LoginCallbackView mode={{ type: 'error', errorMessage: '잘못된 접근입니다. (INVALID_NONCE)' }} />;
    } else if (data.error === 'notMember') {
      return (
        <LoginCallbackView
          mode={{ type: 'error', errorMessage: 'SOPT.org 회원이 아닙니다.\n먼저 회원 가입후, 다시 로그인해주세요.' }}
        />
      );
    } else {
      return <LoginCallbackView mode={{ type: 'error', errorMessage: '알 수 없는 오류입니다.' }} />;
    }
  }

  return <StyledFacebookLoginCallback>잠시 후 이동합니다..</StyledFacebookLoginCallback>;
};

export default FacebookLoginCallbackPage;

const StyledFacebookLoginCallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
