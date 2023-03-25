import { to } from 'await-to-js';
import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';

import { postSMSCode, postSMSToken } from '@/api/auth';
import { PHONE_REGEX, PHONE_REGEX_SHORT } from '@/components/auth/register/verify/regex';
import { ByPhoneStates } from '@/components/auth/register/verify/view/ByPhoneView';

interface ErrorResponse {
  success: boolean;
  code: string;
  message: string;
}

const phoneErrorMap: Record<string, string> = {
  emptySoptUser:
    '솝트 활동 시 사용한 전화번호가 아니예요.\n인증을 실패하신 경우 하단에서 다른 방법으로 인증할 수 있어요.',
  shouldRetry: '일시적인 오류에요. 다시 시도해주세요.',
  alreadyTaken: '이미 가입된 전화번호에요.',
  unknownError: '알 수 없는 오류가 발생했어요.',
};

const codeErrorMap: Record<string, string> = {
  wrongCode: '인증번호가 일치하지 않아요. 번호를 확인한 후 다시 입력해 주세요.',
  notExistedCode: '인증번호가 일치하지 않아요. 번호를 확인한 후 다시 입력해 주세요.',
  expiredCode: '인증번호가 만료되었어요. 인증번호를 다시 받아주세요.',
};

const useByPhone = ({ onCodeSuccess }: { onCodeSuccess?: (registerToken: string) => void }) => {
  const [state, setState] = useState<ByPhoneStates>({ type: 'phoneReady' });
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  async function submitPhone(phone: string) {
    if (!PHONE_REGEX.test(phone) && !PHONE_REGEX_SHORT.test(phone)) {
      setState({
        type: 'phoneError',
        message: "'-'를 넣어 휴대폰 번호 양식에 맞게 입력해주세요.",
      });

      return;
    }

    setState({
      type: 'phoneLoading',
    });

    const [err, _] = await to(postSMSCode({ phone: phone.replace(/-/g, '') }));

    if (err) {
      if (axios.isAxiosError(err)) {
        const message = (() => {
          const e = err as AxiosError<ErrorResponse>;
          const code = e.response?.data.code;

          if (code && code in phoneErrorMap) {
            return phoneErrorMap[code];
          }
          return '알 수 없는 오류에요.';
        })();

        setState({
          type: 'phoneError',
          message,
        });

        return;
      }

      setState({
        type: 'phoneError',
        message: '알 수 없는 오류에요.',
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
      if (axios.isAxiosError(err)) {
        const message = (() => {
          const e = err as AxiosError<ErrorResponse>;
          const code = e.response?.data.code;

          if (code && code in codeErrorMap) {
            return codeErrorMap[code];
          }
          return '알 수 없는 오류에요.';
        })();

        setState({
          type: 'codeError',
          message,
        });

        return;
      }

      setState({
        type: 'codeError',
        message: '알 수 없는 오류에요.',
      });
      return;
    }

    onCodeSuccess?.(result.registerToken);
  }

  return { state, submitCode, submitPhone };
};

export default useByPhone;
