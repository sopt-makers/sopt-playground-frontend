import styled from '@emotion/styled';
import { AnimationProps, motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

import Portal from '@/components/common/Portal';
import { colors } from '@/styles/colors';

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

interface LoadingProps {
  type?: 'default' | 'fullPage';
}
const Loading: FC<LoadingProps> = ({ type = 'default' }) => {
  if (type === 'fullPage') {
    return (
      <FullPageWrapper>
        <LoadingDefault />
      </FullPageWrapper>
    );
  }
  return <LoadingDefault />;
};

export default Loading;

const LoadingDefault = () => (
  <StyledLoading>
    <LoadingDot variants={variants} animate='loadingOne' />
    <LoadingDot variants={variants} animate='loadingTwo' />
    <LoadingDot variants={variants} animate='loadingThree' />
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

const LoadingDot = styled(motion.span)`
  border-radius: 100%;
  background-color: ${colors.purple100};
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
