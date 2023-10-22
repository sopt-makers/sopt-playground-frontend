import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode } from 'react';

import Stepper from '@/components/auth/register/Stepper';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface VerifyByPhoneProps {
  byPhone: ReactNode;
}

const VerifyFrame: FC<VerifyByPhoneProps> = ({ byPhone }) => {
  return (
    <StyledVerifyFrame>
      <StyledStepper step={1} />
      <Title>SOPT 회원인증</Title>
      <Description>
        Playground는 SOPT 회원만을 위한 공간이에요.
        <br />
        SOPT 회원임을 인증하기 위해 전화번호를 입력해 주세요.
      </Description>
      <TabsContent key='byPhone'>{byPhone}</TabsContent>
    </StyledVerifyFrame>
  );
};

export default VerifyFrame;

const StyledVerifyFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStepper = styled(Stepper)`
  align-self: center;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 210px;
  }
`;

const Title = styled.h2`
  margin-top: 95px;
  text-align: center;

  ${textStyles.SUIT_32_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 60px;

    ${textStyles.SUIT_24_B}
  }
`;

const Description = styled.p`
  margin-top: 12px;
  text-align: center;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;

    ${textStyles.SUIT_12_M}
  }
`;

const TabsContent = styled.div`
  margin-top: 48px;
`;
