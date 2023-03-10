import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { postSSOCode } from '@/api/auth';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import Loading from '@/components/common/Loading';

interface OAuthCallbackProps {
  url: URL;
}

type Modes = { type: 'loading' } | { type: 'error'; message: string };

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
        setMode({ type: 'error', message: 'redirect_uri 가 설정되지 않았습니다.' });
        return;
      }

      if (!REDIRECT_URI_WHITELISTS.includes(redirectUri)) {
        console.error('허용되지 않은 redirect_uri 입니다.');
        setMode({ type: 'error', message: '허용되지 않은 redirect_uri 입니다.' });
        return;
      }

      if (!accessToken) {
        lastUnauthorized.setPath(url.href);
        router.replace('/auth/login');
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

      location.href = callback.href;

      if (!['http:', 'https:'].includes(callback.protocol)) {
        setTimeout(() => {
          location.href = '/';
        }, 0);
      }
    })();
  }, [url, accessToken, router, lastUnauthorized]);

  if (mode.type === 'error') {
    return <ErrorMessage>OAuth Error: {mode.message}</ErrorMessage>;
  }

  return <Loading />;
};

export default OAuthCallback;

const REDIRECT_URI_WHITELISTS = ['http://localhost:3000'];

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
