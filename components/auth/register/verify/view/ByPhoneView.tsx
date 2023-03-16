import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';

import VerifySubmitButton from '@/components/auth/register/verify/VerifySubmitButton';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export type ByPhoneStates =
  | {
      type: 'phoneReady';
    }
  | {
      type: 'phoneLoading';
    }
  | {
      type: 'phoneError';
      message: string;
    }
  | {
      type: 'codeReady';
    }
  | {
      type: 'codeLoading';
    }
  | {
      type: 'codeError';
      message: string;
    };

type ByPhoneProps = {
  onSubmitPhone?: (phone: string) => void;
  onSubmitCode?: (code: string) => void;
} & ByPhoneStates;

const PHONE_REGEX = /^01\d-\d{3,4}-\d{4}$/;

const ByPhoneView: FC<ByPhoneProps> = (props) => {
  const { type, onSubmitPhone, onSubmitCode } = props;

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const isPhoneValid = phone.length > 0 && PHONE_REGEX.test(phone);

  function handleSubmitPhone(e: FormEvent) {
    e.preventDefault();

    if (isPhoneValid) {
      onSubmitPhone?.(phone);
    }
  }

  function handleSubmitCode(e: FormEvent) {
    e.preventDefault();

    onSubmitCode?.(code);
  }

  return (
    <StyledByEmail>
      <Label htmlFor='phone'>전화번호</Label>
      <InputArea onSubmit={handleSubmitPhone}>
        <StyledPhoneInput
          name='phone'
          placeholder='010-XXXX-XXXX'
          error={(phone !== '' && !isPhoneValid) || type === 'phoneError'}
          autoFocus
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SubmitPhoneButton disabled={type === 'phoneLoading'}>인증번호 받기</SubmitPhoneButton>
      </InputArea>

      <form onSubmit={handleSubmitCode}>
        <AnimatePresence initial={false}>
          {(type === 'codeReady' || type === 'codeError' || type === 'codeLoading') && (
            <m.div
              initial='hide'
              animate='show'
              exit='hide'
              variants={{ hide: { height: 0, transition: { delay: 0.2 } }, show: { height: 'auto' } }}
            >
              <StyledCodeInput
                placeholder='인증번호를 입력해주세요.'
                variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
                error={type === 'codeError'}
              />
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {(type === 'phoneError' || type === 'codeError') && (
            <ErrorMessageHolder
              initial='hide'
              animate='show'
              exit='hide'
              variants={{ hide: { height: 0, opacity: 0 }, show: { height: 'auto', opacity: 1 } }}
            >
              <ErrorMessage message={props.message} />
            </ErrorMessageHolder>
          )}
        </AnimatePresence>

        <SubmitCodeButton disabled={type !== 'codeReady'}>SOPT 회원 인증 완료</SubmitCodeButton>
      </form>
    </StyledByEmail>
  );
};

export default ByPhoneView;

const StyledByEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 18px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const InputArea = styled.form`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  row-gap: 10px;
`;

const StyledPhoneInput = styled(Input)`
  flex-grow: 1;

  & input[type='text'] {
    border-radius: 10px;
  }
`;

const ErrorMessageHolder = styled(m.div)`
  & > * {
    padding-top: 10px;
    padding-left: 2px;
  }
`;

const StyledCodeInput = styled(m(Input))`
  & input[type='text'] {
    margin-top: 18px;
    border-radius: 10px;

    ${textStyles.SUIT_16_M}

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 10px;
      ${textStyles.SUIT_14_M}
    }
  }
`;

const SubmitPhoneButton = styled(VerifySubmitButton)`
  min-width: 50px;
`;

const SubmitCodeButton = styled(VerifySubmitButton)`
  margin-top: 48px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 30px;

    ${textStyles.SUIT_14_M}
  }
`;
