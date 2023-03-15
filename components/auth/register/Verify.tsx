import styled from '@emotion/styled';
import { FC } from 'react';

import Stepper from '@/components/auth/register/Stepper';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface VerifyByPhoneProps {}

const VerifyByPhone: FC<VerifyByPhoneProps> = ({}) => {
  return (
    <StyledVerifyByPhone>
      <Stepper step={1} />

      <Title>SOPT 회원인증</Title>
    </StyledVerifyByPhone>
  );
};

export default VerifyByPhone;

const StyledVerifyByPhone = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
`;

const Title = styled.h2`
  margin-top: 95px;

  ${textStyles.SUIT_32_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 60px;

    ${textStyles.SUIT_24_B}
  }
`;
