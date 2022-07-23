import Input from '@/components/common/Input';
import SquareLink from '@/components/common/SquareLink';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import axios, { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';

interface ErrorResponse {
  success: false;
  message: string;
}

const VerifyByEmail: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const verify = useMutation<unknown, AxiosError<ErrorResponse>>(async () => {
    return axios.post('http://localhost:5000/api/v1/register/sendEmail', {
      email: emailInput,
    });
  });

  return (
    <Container>
      <Title>SOPT 회원인증</Title>
      <Description>SOPT 지원시 입력했던 이메일을 입력해주세요</Description>
      <Label>이메일</Label>
      <Input placeholder='이메일을 입력해주세요' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
      <ErrorMessage show={verify.isError}>
        {expoIcon} {verify.error?.response?.data.message + ''}
      </ErrorMessage>
      <SendButton variant='primary' onClick={() => verify.mutate()}>
        SOPT 회원 인증메일 발송
      </SendButton>
    </Container>
  );
};

export default VerifyByEmail;

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

const expoIcon = (
  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='14' height='14' rx='7' fill='#BD372F' />
    <path d='M7.00586 4L7.00586 7' stroke='#FCFCFC' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M7.00586 10L6.99919 10' stroke='#FCFCFC' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const SendButton = styled(SquareLink)`
  align-self: stretch;
`;
