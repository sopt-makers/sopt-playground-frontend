import styled from '@emotion/styled';
import { FC } from 'react';

import { textStyles } from '@/styles/typography';

const SendingMailSuccess: FC = () => {
  return (
    <Container>
      <Title>메일 전송 완료</Title>
      <Description>
        SOPT 회원 인증 메일 전송이 완료되었습니다.
        <br />
        메일의 회원가입 계속하기 버튼을 눌러 회원가입을 진행해주세요.
      </Description>
    </Container>
  );
};

export default SendingMailSuccess;

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
  text-align: center;
  line-height: 25px;
  ${textStyles.SUIT_16_M};
`;
