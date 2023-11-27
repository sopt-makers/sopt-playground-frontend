import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { AnimationProps, m } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

import Portal from '@/components/common/Portal';

const variants: AnimationProps['variants'] = {
  loadingOne: {
    opacity: [0, 0.2, 0.5, 1, 0.5, 0.2, 0],
    transition: {
      repeat: Infinity,
      duration: 1.2,
    },
  },
  loadingTwo: {
    opacity: [0, 0.2, 0.5, 1, 0.5, 0.2, 0],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      delay: 0.4,
    },
  },
  loadingThree: {
    opacity: [0, 0.2, 0.5, 1, 0.5, 0.2, 0],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      delay: 0.8,
    },
  },
};

type LoadingColor = 'default' | 'white';

type LoadingProps = {
  type?: 'default' | 'fullPage';
} & LoadingDotsProps;

const Loading: FC<LoadingProps> = ({ type = 'default', ...props }) => {
  if (type === 'fullPage') {
    return (
      <FullPageWrapper>
        <LoadingDots {...props} />
      </FullPageWrapper>
    );
  }
  return <LoadingDots {...props} />;
};

export default Loading;

interface LoadingDotsProps {
  color?: LoadingColor;
  size?: number;
}

const LoadingDots = ({ color = 'default', size = 12 }: LoadingDotsProps) => (
  <StyledLoading size={size}>
    <LoadingDot variants={variants} animate='loadingOne' color={color} size={size} />
    <LoadingDot variants={variants} animate='loadingTwo' color={color} size={size} />
    <LoadingDot variants={variants} animate='loadingThree' color={color} size={size} />
  </StyledLoading>
);

const FullPageWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Portal>
      <StyledBackground>{children}</StyledBackground>
    </Portal>
  );
};

const StyledLoading = styled.div<{ size: number }>`
  display: flex;
  gap: ${({ size }) => `${size}px`};
  align-items: center;
`;

const LoadingDot = styled(m.span)<{ color: LoadingColor; size: number }>`
  border-radius: 100%;
  background-color: ${({ color }) => (color === 'default' ? colors.gray50 : colors.gray10)};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`;

const StyledBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  background-color: rgb(0 0 0 / 30%);
  width: 100%;
  height: 100%;
`;
