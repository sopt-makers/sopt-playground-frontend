import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { postSSOCode } from '@/api/endpoint_LEGACY/auth';
import { REDIRECT_URI_WHITELISTS } from '@/components/auth/oauth/whitelists';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import Loading from '@/components/common/Loading';
import { playgroundLink } from '@/constants/links';

interface OAuthCallbackProps {
  url: URL;
}

type Modes = { type: 'loading' } | { type: 'error'; message: string } | { type: 'success'; redirect: string };

const OAuthCallback: FC<OAuthCallbackProps> = ({ url }) => {
  const router = useRouter();
  const [mode, setMode] = useState<Modes>({ type: 'loading' });
  const accessToken = useRecoilValue(accessTokenAtom);
  const lastUnauthorized = useLastUnauthorized();

  useEffect(() => {
    (async () => {
      const state = url.searchParams.get('state') ?? '';
      const redirectUri = url.searchParams.get('redirect_uri');

      if (!redirectUri) {
        console.error('redirect_uri 가 설정되지 않았습니다.');
        setMode({ type: 'error', message: `redirect_uri 가 설정되지 않았습니다.\nReceived: ${url.href}` });
        return;
      }

      if (!REDIRECT_URI_WHITELISTS.includes(redirectUri)) {
        console.error('허용되지 않은 redirect_uri 입니다.');
        setMode({ type: 'error', message: `허용되지 않은 redirect_uri 입니다.\nReceived: ${redirectUri}` });
        return;
      }

      if (!accessToken) {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');

        if (returnUrl) {
          lastUnauthorized.setPath(decodeURIComponent(returnUrl));
        } else {
          lastUnauthorized.setPath(url.href);
        }
        location.href = playgroundLink.login();

        return;
      }

      const code = await postSSOCode({ accessToken })
        .then((r) => r.code)
        .catch(() => null);

      if (!code) {
        console.error('Code 발급에 실패했습니다.');
        setMode({ type: 'error', message: 'Code 발급에 실패했습니다.' });
        return;
      }

      const callback = new URL(redirectUri);
      callback.searchParams.set('state', state);
      callback.searchParams.set('code', code);

      setMode({ type: 'success', redirect: callback.href });

      location.href = callback.href;
    })();
  }, [url, accessToken, router, lastUnauthorized]);

  if (mode.type === 'error') {
    return <ErrorMessage>OAuth Error: {mode.message}</ErrorMessage>;
  }

  if (mode.type === 'success') {
    return (
      <SuccessMessage>
        <ReturnToHomeLink href={playgroundLink.memberList()}>홈으로 돌아가기</ReturnToHomeLink>
      </SuccessMessage>
    );
  }

  return <Loading />;
};

export default OAuthCallback;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  white-space: pre;
`;

const ReturnToHomeLink = styled(Link)`
  text-decoration: underline;
  color: #9e6dff;
`;
