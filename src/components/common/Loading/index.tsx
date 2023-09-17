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

interface LoadingProps {
  type?: 'default' | 'fullPage';
  color?: LoadingColor;
}
const Loading: FC<LoadingProps> = ({ type = 'default', color = 'default' }) => {
  if (type === 'fullPage') {
    return (
      <FullPageWrapper>
        <LoadingDefault color={color} />
      </FullPageWrapper>
    );
  }
  return <LoadingDefault color={color} />;
};

export default Loading;

interface LoadingDefaultProps {
  color: LoadingColor;
}

const LoadingDefault = ({ color }: LoadingDefaultProps) => (
  <StyledLoading>
    <LoadingDot variants={variants} animate='loadingOne' color={color} />
    <LoadingDot variants={variants} animate='loadingTwo' color={color} />
    <LoadingDot variants={variants} animate='loadingThree' color={color} />
  </StyledLoading>
);

const FullPageWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Portal>
      <StyledBackground>{children}</StyledBackground>
    </Portal>
  );
};

const StyledLoading = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LoadingDot = styled(m.span)<{ color: LoadingColor }>`
  border-radius: 100%;
  background-color: ${({ color }) => (color === 'default' ? colors.gray20 : colors.white100)};
  width: 12px;
  height: 12px;
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
