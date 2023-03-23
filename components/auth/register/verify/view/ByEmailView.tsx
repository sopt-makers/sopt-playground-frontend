import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';

import SendingMailSuccess from '@/components/auth/register/verify/SendingMailSuccess';
import VerifySubmitButton from '@/components/auth/register/verify/VerifySubmitButton';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export type ByEmailStates =
  | {
      type: 'idle';
    }
  | {
      type: 'loading';
    }
  | {
      type: 'error';
      message: string;
    }
  | {
      type: 'success';
    };

type ByEmailViewProps = {
  onSubmitEmail?: (email: string) => void;
} & ByEmailStates;

const ByEmailView: FC<ByEmailViewProps> = (props) => {
  const { onSubmitEmail, type } = props;

  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email.length > 0) {
      onSubmitEmail?.(email);
    }
  }

  if (type === 'success') {
    return <SendingMailSuccess />;
  }

  return (
    <StyledByEmailView onSubmit={handleSubmit}>
      <Label htmlFor='phone'>이메일</Label>
      <StyledInput
        placeholder='이메일을 입력해 주세요.'
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={type === 'error'}
      />
      <AnimatePresence initial={false}>
        {type === 'error' && (
          <ErrorMessageHolder
            initial='hide'
            animate='show'
            exit='hide'
            variants={{ hide: { height: 0, opacity: 0 }, show: { height: 'auto', opacity: 1 } }}
          >
            <ErrorMessage message={props.message ?? ''} />
          </ErrorMessageHolder>
        )}
      </AnimatePresence>
      <SubmitButton disabled={type === 'loading'}>SOPT 회원 인증메일 전송</SubmitButton>
    </StyledByEmailView>
  );
};

export default ByEmailView;

const StyledByEmailView = styled.form``;

const Label = styled.label`
  display: block;
  margin-bottom: 18px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const StyledInput = styled(m(Input))`
  & input[type='text'] {
    border-radius: 10px;

    ${textStyles.SUIT_16_M}

    @media ${MOBILE_MEDIA_QUERY} {
      ${textStyles.SUIT_14_M}
    }
  }
`;

const ErrorMessageHolder = styled(m.div)`
  & > * {
    padding-top: 10px;
    padding-left: 2px;
  }
`;

const SubmitButton = styled(VerifySubmitButton)`
  margin-top: 25px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;
