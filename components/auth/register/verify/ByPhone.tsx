import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { FC, useState } from 'react';

import HelpCard from '@/components/auth/register/verify/HelpCard';
import VerifySubmitButton from '@/components/auth/register/verify/VerifySubmitButton';
import Input from '@/components/common/Input';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ByPhoneProps {
  status: 'init' | 'sent';
  highlightHelp?: boolean;
  onSubmitPhone?: (phone: string) => void;
  onSubmitCode?: (code: string) => void;
}

const PHONE_REGEX = /^01\d-\d{3,4}-\d{4}$/;

const ByPhone: FC<ByPhoneProps> = ({ status, highlightHelp, onSubmitPhone }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const isPhoneValid = phone.length > 0 && PHONE_REGEX.test(phone);

  function handleSubmitPhone() {
    if (isPhoneValid) {
      onSubmitPhone?.(phone);
    }
  }

  return (
    <StyledByEmail>
      <Label htmlFor='phone'>전화번호</Label>
      <InputArea>
        <StyledPhoneInput
          name='phone'
          placeholder='전화번호를 입력해 주세요'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SubmitPhoneButton disabled={!(status === 'init' || status === 'sent') || !isPhoneValid}>
          인증번호 받기
        </SubmitPhoneButton>
      </InputArea>
      <AnimatePresence initial={false}>
        {status === 'sent' && (
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
            />
          </m.div>
        )}
      </AnimatePresence>

      <SubmitCodeButton disabled onClick={handleSubmitPhone}>
        SOPT 회원 인증 완료
      </SubmitCodeButton>

      <StyledHelpCard
        highlight={highlightHelp}
        title='전화번호로 SOPT 회원 인증에 실패하셨나요?'
        content={
          '전화번호가 바뀌었거나, 전화번호 인증이 어려우신 경우 \n추가 정보 인증을 통해 가입을 도와드리고 있어요!'
        }
      />
    </StyledByEmail>
  );
};

export default ByPhone;

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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const StyledPhoneInput = styled(Input)`
  flex-grow: 1;

  & input[type='text'] {
    border-radius: 10px;
  }
`;

const StyledCodeInput = styled(m(Input))`
  margin-top: 18px;

  & input[type='text'] {
    border-radius: 10px;

    ${textStyles.SUIT_16_M}

    @media ${MOBILE_MEDIA_QUERY} {
      ${textStyles.SUIT_14_M}
    }
  }
`;

const SubmitPhoneButton = styled(VerifySubmitButton)`
  min-width: 50px;
`;

const SubmitCodeButton = styled(VerifySubmitButton)`
  margin-top: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 30px;

    ${textStyles.SUIT_14_M}
  }
`;

const StyledHelpCard = styled(HelpCard)`
  margin-top: 48px;
`;
