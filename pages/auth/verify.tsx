import Input from '@/components/common/Input';
import SquareLink from '@/components/common/SquareLink';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import axios from 'axios';
import { FC, useState } from 'react';

export const VerifyPage: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [output, setOutput] = useState('');

  async function register() {
    setOutput('Loading...');
    try {
      const ret = await axios.post('http://localhost:5000/api/v1/register/sendEmail', {
        email: emailInput,
      });
      setOutput(`email sent: ${JSON.stringify(ret.data)}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setOutput(`Error occured: ${JSON.stringify(e.response?.data)}`);
      }
    }
  }

  return (
    <StyledVerifyPage>
      <Title>SOPT 회원인증</Title>
      <Description>SOPT 지원시 입력했던 이메일을 입력해주세요</Description>
      <Container>
        <Label>이메일</Label>
        <Input placeholder='이메일을 입력해주세요' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
        <SendButton variant='primary' onClick={register}>
          SOPT 회원 인증메일 발송
        </SendButton>
        <p>{output}</p>
      </Container>
    </StyledVerifyPage>
  );
};

export default VerifyPage;

const StyledVerifyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;

const Title = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 45px;
  ${textStyles.SUIT_16_M};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
`;

const Label = styled.label`
  margin-bottom: 18px;
  color: ${colors.gray80};
  ${textStyles.SUIT_14_M};
`;

const SendButton = styled(SquareLink)`
  margin-top: 60px;
`;
