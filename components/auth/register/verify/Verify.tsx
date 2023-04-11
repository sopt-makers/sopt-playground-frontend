import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC } from 'react';

import HelpCard from '@/components/auth/register/verify/HelpCard';
import useByEmail from '@/components/auth/register/verify/useByEmail';
import useByPhone from '@/components/auth/register/verify/useByPhone';
import VerifyFrame from '@/components/auth/register/verify/VerifyFrame';
import ByEmailView from '@/components/auth/register/verify/view/ByEmailView';
import ByPhoneView from '@/components/auth/register/verify/view/ByPhoneView';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MEMBER_REQUEST_FORM_URL, playgroundLink } from '@/constants/links';

interface VerifyProps {}

const Verify: FC<VerifyProps> = ({}) => {
  const { logSubmitEvent } = useEventLogger();

  const router = useRouter();

  const {
    state: phoneState,
    submitCode,
    submitPhone,
  } = useByPhone({
    onCodeSuccess: (registerToken) => {
      router.push({
        pathname: playgroundLink.connectSocialAuth(),
        query: {
          token: registerToken,
        },
      });
      logSubmitEvent('verify', { by: 'phone' });
    },
    onSkip: (registerToken) => {
      router.push({
        pathname: playgroundLink.connectSocialAuth(),
        query: {
          token: registerToken,
        },
      });
    },
  });

  const { state: emailState, submit: submitEmail } = useByEmail(() => {
    logSubmitEvent('verify', { by: 'email' });
  });

  return (
    <div>
      <VerifyFrame
        byPhone={<ByPhoneView {...phoneState} onSubmitCode={submitCode} onSubmitPhone={submitPhone} />}
        byEmail={<ByEmailView {...emailState} onSubmitEmail={submitEmail} />}
      />
      <StyledHelpCard
        href={MEMBER_REQUEST_FORM_URL}
        highlight={phoneState.type === 'codeError' || phoneState.type === 'phoneError' || emailState.type === 'error'}
        title='SOPT 회원 인증에 실패하셨나요?'
        content={'인증이 어려우신 경우 추가 정보 인증을 통해 \n 가입을 도와드리고 있어요!'}
      />
    </div>
  );
};

export default Verify;

const StyledHelpCard = styled(HelpCard)`
  margin-top: 48px;
`;
