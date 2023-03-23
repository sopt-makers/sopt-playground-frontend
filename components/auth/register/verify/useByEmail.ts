import { to } from 'await-to-js';
import { AxiosError, default as axios } from 'axios';
import { useState } from 'react';

import { postRegistrationEmail } from '@/api/auth';
import { ByEmailStates } from '@/components/auth/register/verify/view/ByEmailView';

const useByEmail = (onSuccess?: () => void) => {
  const [state, setState] = useState<ByEmailStates>({ type: 'idle' });

  async function submit(email: string) {
    setState({
      type: 'loading',
    });

    const [err, _] = await to(postRegistrationEmail(email));

    if (err) {
      if (axios.isAxiosError(err)) {
        setState({
          type: 'error',
          message: (err as AxiosError<ErrorResponse>).response?.data?.message ?? '',
        });

        return;
      }

      setState({
        type: 'error',
        message: '오류가 발생했습니다.',
      });

      return;
    }

    setState({
      type: 'success',
    });
    onSuccess?.();
  }

  return { state, submit };
};

export default useByEmail;

interface ErrorResponse {
  success: false;
  message: string;
}
