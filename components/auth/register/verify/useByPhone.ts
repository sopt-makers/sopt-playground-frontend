import { to } from 'await-to-js';
import { useRef, useState } from 'react';

import { postSMSCode, postSMSToken } from '@/api/auth';
import { ByPhoneStates } from '@/components/auth/register/verify/view/ByPhoneView';

const useByPhone = (onSuccess?: (registerToken: string) => void) => {
  const [state, setState] = useState<ByPhoneStates>({ type: 'phoneReady' });
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  async function submitPhone(phone: string) {
    setState({
      type: 'phoneLoading',
    });

    const [err, _] = await to(postSMSCode({ phone: phone.replace(/-/g, '') }));

    if (err) {
      setState({
        type: 'phoneError',
        message: 'ERROR',
      });
      return;
    }

    setState({
      type: 'codeReady',
      phoneDisabled: true,
    });

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setState((state) => {
        if (state.type === 'codeReady' && state.phoneDisabled) {
          return { type: 'codeReady', phoneDisabled: false };
        }
        return state;
      });
    }, 2000);
  }

  async function submitCode(code: string) {
    setState({
      type: 'codeLoading',
    });

    const [err, result] = await to(postSMSToken({ code }));

    if (err) {
      setState({
        type: 'codeError',
        message: 'ERROR',
      });
      return;
    }

    onSuccess?.(result.registerToken);
  }

  return { state, submitCode, submitPhone };
};

export default useByPhone;
