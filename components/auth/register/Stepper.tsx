import styled from '@emotion/styled';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface StepperProps {
  step: 1 | 2;
  className?: string;
}

const Stepper: FC<StepperProps> = ({ step, className }) => {
  return (
    <Container className={className}>
      <Circle isProceeding>
        1<div>SOPT 회원인증</div>
      </Circle>
      <Line isProceeding={step === 2} />
      <Circle isProceeding={step === 2}>
        2<div>회원가입</div>
      </Circle>
    </Container>
  );
};

export default Stepper;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;

  ${textStyles.SUIT_16_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_B};
  }
`;

const Circle = styled.div<{ isProceeding: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ isProceeding }) => (isProceeding ? colors.purple100 : colors.black40)};
  width: 28px;
  height: 28px;

  & > div {
    position: absolute;
    top: 40px;
    white-space: nowrap;
    color: ${({ isProceeding }) => (isProceeding ? colors.white100 : colors.gray100)};
    font-size: 14px;
    @media ${MOBILE_MEDIA_QUERY} {
      top: 28px;
      font-size: 14px;
      font-size: 12px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 20px;
    height: 20px;
  }
`;

const Line = styled.div<{ isProceeding: boolean }>`
  background-color: ${({ isProceeding }) => (isProceeding ? colors.purple100 : colors.black40)};
  width: 280px;
  height: 2px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 120px;
  }
`;
