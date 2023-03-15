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
      <LineArea>
        <Line isActive={step === 2} />
      </LineArea>
      <CellArea>
        <Cell>
          <Circle isActive={step === 1}>1</Circle>
          <Text isActive={step == 1}>SOPT 회원인증</Text>
        </Cell>
        <Cell>
          <Circle isActive={step === 2}>2</Circle>
          <Text isActive={step == 2}>소셜 계정 연동</Text>
        </Cell>
      </CellArea>
    </Container>
  );
};

export default Stepper;

const Container = styled.div`
  position: relative;
  height: 60px;
`;

const LineArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

const Line = styled.div<{ isActive: boolean }>`
  margin: 13px 35px 0;
  background-color: ${({ isActive }) => (isActive ? colors.purple100 : colors.black40)};
  height: 2px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const CellArea = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div<{ isActive: boolean }>`
  margin-top: 12px;
  color: ${(props) => (props.isActive ? colors.white : colors.gray100)};

  ${textStyles.SUIT_14_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB}
  }
`;

const Circle = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? colors.purple100 : colors.black40)};
  width: 28px;
  height: 28px;
  white-space: nowrap;
  color: ${({ isActive }) => (isActive ? colors.white100 : colors.gray100)};

  ${textStyles.SUIT_15_B};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 22px;
    height: 22px;

    ${textStyles.SUIT_12_B}
  }
`;
