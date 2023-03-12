import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { FC, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';

import { postRegistrationEmail } from '@/api/auth';
import SendingMailSuccess from '@/components/auth/register/SendingMailSuccess';
import Stepper from '@/components/auth/register/Stepper';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import SquareLink from '@/components/common/SquareLink';
import { MEMBER_REQUEST_FORM_URL } from '@/constants/links';
import IconArrowRight from '@/public/icons/icon-arrow-right.svg';
import IconWarning from '@/public/icons/icon-warning.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ErrorResponse {
  success: false;
  message: string;
}

const VerifyByEmail: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const verify = useMutation<unknown, AxiosError<ErrorResponse>>(async () => {
    return postRegistrationEmail(emailInput);
  });

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    if (verify.isLoading) {
      return;
    }
    verify.mutate();
  };

  if (verify.isSuccess) {
    return <SendingMailSuccess />;
  }

  return (
    <FormContainer onSubmit={handleSend}>
      <StyledStepper step={1} />
      <Title>SOPT 회원인증</Title>
      <Description>SOPT 지원시 입력했던 이메일을 입력해주세요</Description>
      <Label>이메일</Label>
      <StyledInput
        placeholder='이메일을 입력해주세요'
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        disabled={verify.isLoading}
      />
      <ErrorMessage show={verify.isError}>
        <IconWarning /> {formatErrorMessage(verify.error)}
      </ErrorMessage>
      <SendButton as='button' variant='primary'>
        {verify.isLoading ? <Loading /> : <>SOPT 회원 인증메일 전송</>}
      </SendButton>
      <ErrorNotice href={MEMBER_REQUEST_FORM_URL} target='_blank'>
        <NoticeTitle>
          <div className='question'>이메일로 SOPT 회원 인증이 안된다면?</div>
          <IconArrowRight />
        </NoticeTitle>
        <ErrorNoticeDescription>
          {`SOPT 정보 등록 시 기입한 이메일의 확인이 어려운 경우,\n구글폼을 통해 가입을 도와드리고 있어요!`}
        </ErrorNoticeDescription>
      </ErrorNotice>
    </FormContainer>
  );
};

export default VerifyByEmail;

function formatErrorMessage(error: AxiosError<ErrorResponse> | null) {
  const innerMessage = error?.response?.data?.message;
  return innerMessage ?? '서버와의 접속이 실패했습니다.';
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 24px;
  }
`;

const StyledStepper = styled(Stepper)`
  margin-bottom: 50px;
`;

const Title = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 45px;
  ${textStyles.SUIT_16_M};
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 18px;
  color: ${colors.gray80};
  ${textStyles.SUIT_14_M};
`;

const ErrorMessage = styled.p<{ show: boolean }>`
  display: flex;
  align-items: center;
  align-self: flex-start;
  opacity: ${(props) => (props.show ? 1 : 0)};
  margin-top: 16px;
  margin-bottom: 30px;
  height: 15px;
  color: ${colors.red100};
  ${textStyles.SUIT_14_M};

  & > svg {
    margin-right: 6px;
    height: 100%;
  }
`;

const SendButton = styled(SquareLink)`
  align-self: stretch;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ErrorNotice = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background-color 0.3s;
  margin-top: 60px;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 19px 0 18px 20px;
  width: 420px;

  &:hover {
    background-color: ${colors.black40};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ErrorNoticeDescription = styled.div`
  line-height: 140%;
  white-space: pre-line;
  color: ${colors.gray60};
  font-size: 12px;
  font-weight: 500;
`;

const NoticeTitle = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;

  .text {
    color: ${colors.gray10};

    ${textStyles.SUIT_14_M}
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
