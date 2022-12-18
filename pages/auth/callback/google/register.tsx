import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';
import { useSetRecoilState } from 'recoil';

import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { colors } from '@/styles/colors';

const GoogleRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const googleAuth = useGoogleAuth();
  const lastUnauthorized = useLastUnauthorized();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const { status: queryStatus, query: queryData } = useStringRouterQuery(['state', 'code'] as const);

  const { data, status } = useQuery(
    ['googleRegisterCallback'],
    async () => {
      if (queryStatus !== 'success') {
        throw new Error('Invalid state');
      }
      const registerToken = localStorage.getItem('registerToken') ?? '';

      return googleAuth.sendRegisterRequest(queryData.code, registerToken, queryData.state);
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
    return (
      <StyledFacebookLoginCallback>
        잘못된 접근입니다.
        <Link href={playgroundLink.login()} replace passHref>
          <LoginLink>로그인 페이지로 이동</LoginLink>
        </Link>
      </StyledFacebookLoginCallback>
    );
  }

  if (queryStatus === 'loading' || status === 'idle' || status === 'loading') {
    return (
      <StyledFacebookLoginCallback>
        <ClipLoader color={colors.purple40} size={30} />
      </StyledFacebookLoginCallback>
    );
  }

  if (status === 'error') {
    return <StyledFacebookLoginCallback>알 수 없는 오류입니다.</StyledFacebookLoginCallback>;
  }

  if (!data.success) {
    let message = '';
    message = '알 수 없는 오류입니다.';

    return (
      <StyledFacebookLoginCallback>
        <ErrorMessage>{message}</ErrorMessage>
        <Link href={playgroundLink.login()} replace passHref>
          <LoginLink>로그인 페이지로 이동</LoginLink>
        </Link>
      </StyledFacebookLoginCallback>
    );
  }

  return <StyledFacebookLoginCallback>잠시 후 이동합니다..</StyledFacebookLoginCallback>;
};

export default GoogleRegisterCallbackPage;

const StyledFacebookLoginCallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  line-height: 150%;
  white-space: pre-wrap;
`;

const LoginLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #90ace3;

  &:hover {
    text-decoration: underline;
  }
`;
