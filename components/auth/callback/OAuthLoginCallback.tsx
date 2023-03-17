import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import LoginCallbackView from '@/components/auth/callback/LoginCallbackView';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';

interface OAuthLoginCallbackProps {
  oauthKey: string;
  processParam: ProcessParamFn;
  onSuccess: () => void;
}

export type ProcessParamFn = (
  url: URL,
) => Promise<{ success: true; accessToken: string } | { success: false; error: ErrorTypes }>;
type ErrorTypes = 'invalidNonce' | 'invalidURL' | 'notMember' | 'unknown';

const OAuthLoginCallback: FC<OAuthLoginCallbackProps> = ({ oauthKey: oauthType, processParam, onSuccess }) => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    setUrl(new URL(self.location.href));
  }, []);

  const { data, status, fetchStatus } = useQuery(
    ['oauthLoginCallbackQuery', oauthType],
    async () => {
      if (url === null) {
        throw new Error('Invalid state');
      }
      return processParam(url);
    },
    {
      enabled: url !== null,
      onSuccess(result) {
        if (result.success) {
          setAccessToken(result.accessToken);
          onSuccess?.();
        }
      },
    },
  );

  if (url === null || fetchStatus === 'idle' || status === 'loading') {
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
    } else if (data.error === 'invalidURL') {
      return <LoginCallbackView mode={{ type: 'error', errorMessage: '잘못된 접근입니다. (INVALID_URL)' }} />;
    } else {
      return <LoginCallbackView mode={{ type: 'error', errorMessage: '알 수 없는 오류입니다.' }} />;
    }
  }

  return <LoginCallbackView mode={{ type: 'loading' }} />;
};

export default OAuthLoginCallback;
