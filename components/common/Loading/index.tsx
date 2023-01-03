import styled from '@emotion/styled';
import { AnimationProps, motion } from 'framer-motion';
import { FC } from 'react';

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

const Loading: FC = () => {
  return (
    <StyledLoading>
      <LoadingDot variants={variants} animate='loadingOne' />
      <LoadingDot variants={variants} animate='loadingTwo' />
      <LoadingDot variants={variants} animate='loadingThree' />
    </StyledLoading>
  );
};

export default Loading;

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
