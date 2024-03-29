import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const checkSvg = (
  <m.svg
    width='14'
    height='11'
    viewBox='0 0 14 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    initial='inactive'
    animate='active'
  >
    <m.path
      d='M1 5L5.66667 9L13 1'
      stroke='white'
      stroke-width='3'
      variants={{
        inactive: {
          pathLength: 0,
        },
        active: {
          pathLength: 1,
          transition: {
            duration: 0.4,
          },
        },
      }}
    />
  </m.svg>
);
interface StepperProps {
  step: 1 | 2;
  className?: string;
}

const Stepper: FC<StepperProps> = ({ step, className }) => {
  function f<T>(target: number, conv: [T, T, T]) {
    if (step > target) {
      return conv[0];
    }

    if (step === target) {
      return conv[1];
    }

    return conv[2];
  }

  return (
    <Container className={className}>
      <LineArea>
        <Line>
          <LineFilled
            initial='none'
            animate={step === 2 ? 'fill' : 'none'}
            variants={{
              fill: {
                width: ['0%', '0%', '100%', '100%'],
                transition: {
                  times: [0, 0.4, 0.7, 1],
                  duration: 2,
                },
              },
              none: {
                width: '0%',
              },
            }}
          />
        </Line>
      </LineArea>
      <CellArea>
        <Cell initial='current' animate={step === 1 ? 'current' : 'passed'}>
          <Circle
            variants={{
              passed: {
                scale: 1,
              },
              current: {
                scale: [1.2, 1],
                transition: {
                  type: 'spring',
                  duration: 0.4,
                },
              },
            }}
          >
            {f<ReactNode>(1, [checkSvg, '1', '1'])}
          </Circle>
          <Text isActive={step >= 1}>SOPT 회원인증</Text>
        </Cell>
        <Cell initial='future' animate={step === 2 ? 'current' : 'future'}>
          <Circle
            variants={{
              future: {
                scale: 1,
                backgroundColor: colors.gray600,
                color: colors.gray600,
              },
              current: {
                scale: [1, 1, 1.2, 1],
                backgroundColor: [colors.gray600, colors.gray600, colors.success, colors.success],
                color: [colors.gray600, colors.gray600, colors.gray10, colors.gray10],
                transition: {
                  times: [0, 0.7, 0.9, 1],
                  duration: 2,
                },
              },
            }}
          >
            {f<ReactNode>(2, [checkSvg, '2', '2'])}
          </Circle>
          <Text
            isActive={step >= 2}
            variants={{
              future: {
                color: colors.gray600,
              },
              current: {
                color: [colors.gray600, colors.gray600, colors.gray10],
                transition: {
                  times: [0, 0.7, 1],
                  duration: 2,
                },
              },
            }}
          >
            소셜 계정 연동
          </Text>
        </Cell>
      </CellArea>
    </Container>
  );
};

export default Stepper;

const Container = styled(m.div)`
  position: relative;
  width: 100%;
  height: 60px;
`;

const LineArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

const Line = styled(m.div)`
  position: relative;
  margin: 13px 35px 0;
  background-color: ${colors.gray600};
  height: 2px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const LineFilled = styled(m.div)`
  position: absolute;
  left: 0;
  background-color: ${colors.success};
  width: 50%;
  height: 100%;
`;

const CellArea = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
`;

const Cell = styled(m.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled(m.div)<{ isActive: boolean }>`
  margin-top: 12px;

  ${textStyles.SUIT_14_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB}
  }
`;

const Circle = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.success};
  width: 28px;
  height: 28px;
  white-space: nowrap;

  ${textStyles.SUIT_15_B};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 22px;
    height: 22px;

    ${textStyles.SUIT_12_B}
  }
`;
