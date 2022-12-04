import styled from '@emotion/styled';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface StepperProps {
  step: 1 | 2;
}

const Stepper: FC<StepperProps> = ({ step }) => {
  return (
    <Container>
      <Circle isPurple>
        1<div>SOPT 회원인증</div>
      </Circle>
      <Line isPurple={step === 2} />
      <Circle isPurple={step === 2}>
        2<div>회원가입</div>
      </Circle>
    </Container>
  );
};

export default Stepper;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 64px;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  @media ${MOBILE_MEDIA_QUERY} {
    top: 40px;
    font-size: 11px;
  }
`;

const Circle = styled.div<{ isPurple: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ isPurple }) => (isPurple ? colors.purple100 : colors.black40)};
  width: 28px;
  height: 28px;

  & > div {
    position: absolute;
    top: 40px;
    white-space: nowrap;
    color: ${({ isPurple }) => (isPurple ? colors.white100 : colors.gray100)};
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

const Line = styled.div<{ isPurple: boolean }>`
  background-color: ${({ isPurple }) => (isPurple ? colors.purple100 : colors.black40)};
  width: 280px;
  height: 2px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 120px;
  }
`;
