import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';
import { useSetRecoilState } from 'recoil';

import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useURLStringQuery from '@/components/auth/useURLQuery';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { colors } from '@/styles/colors';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
  const lastUnauthorized = useLastUnauthorized();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const { query: queryData, status: queryStatus } = useURLStringQuery(['code', 'state'] as const);

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
    return (
      <StyledFacebookLoginCallback>
        잘못된 접근입니다.
        <Link href='/auth/login' replace passHref>
          <RetryLink>로그인 페이지로 이동</RetryLink>
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
    if (data.error === 'invalidNonce') {
      message = '잘못된 접근입니다. (INVALID_NONCE)';
    } else if (data.error === 'notMember') {
      message = 'SOPT.org 회원이 아닙니다.\n먼저 회원 가입후, 다시 로그인해주세요.';
    } else {
      message = '알 수 없는 오류입니다.';
    }

    return (
      <StyledFacebookLoginCallback>
        <ErrorMessage>{message}</ErrorMessage>
        <Link href='/auth/login' replace passHref>
          <RetryLink>다시 시도</RetryLink>
        </Link>
      </StyledFacebookLoginCallback>
    );
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

const ErrorMessage = styled.p`
  text-align: center;
  line-height: 150%;
  white-space: pre-wrap;
`;

const RetryLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #90ace3;

  &:hover {
    text-decoration: underline;
  }
`;
