import Input from '@/components/common/Input';
import SquareLink from '@/components/common/SquareLink';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import IconWarning from '@/public/icons/icon-warning.svg';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { auth } from '@/api/auth';
import SendingMailSuccess from '@/components/auth/register/SendingMailSuccess';
import { ClipLoader } from 'react-spinners';

interface ErrorResponse {
  success: false;
  message: string;
}

const VerifyByEmail: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const verify = useMutation<unknown, AxiosError<ErrorResponse>>(async () => {
    return auth.sendVerificationEmail(emailInput);
  });

  const handleSend = () => {
    if (verify.isLoading) {
      return;
    }
    verify.mutate();
  };

  if (verify.isSuccess) {
    return <SendingMailSuccess />;
  }

  return (
    <Container>
      <Title>SOPT 회원인증</Title>
      <Description>SOPT 지원시 입력했던 이메일을 입력해주세요</Description>
      <Label>이메일</Label>
      <Input
        placeholder='이메일을 입력해주세요'
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        disabled={verify.isLoading}
      />
      <ErrorMessage show={verify.isError}>
        <IconWarning /> {formatErrorMessage(verify.error)}
      </ErrorMessage>
      <SendButton variant='primary' onClick={handleSend}>
        {verify.isLoading ? <ClipLoader color='#ffffff' size={25} /> : <>SOPT 회원 인증메일 전송</>}
      </SendButton>
    </Container>
  );
};

export default VerifyByEmail;

function formatErrorMessage(error: AxiosError<ErrorResponse> | null) {
  const innerMessage = error?.response?.data?.message;
  return innerMessage ?? '서버와의 접속이 실패했습니다.';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
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
`;
