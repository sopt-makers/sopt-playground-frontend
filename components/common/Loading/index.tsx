import styled from '@emotion/styled';
import { AnimationProps, motion } from 'framer-motion';
import { FC } from 'react';

import { colors } from '@/styles/colors';

const transition: AnimationProps['transition'] = {
  repeat: Infinity,
  repeatType: 'reverse',
};

const variants: AnimationProps['variants'] = {
  loadingOne: {
    opacity: [0.2, 0.5, 0],
    transition,
  },
  loadingTwo: {
    opacity: [0.5, 0, 0.2],
    transition,
  },
  loadingThree: {
    opacity: [0, 0.2, 0.5],
    transition,
  },
};

const Loading: FC = () => {
  return (
    <StyledLoading>
      <LoadingDot initial={{ opacity: 0.2 }} variants={variants} animate='loadingOne' />
      <LoadingDot initial={{ opacity: 0.5 }} variants={variants} animate='loadingTwo' />
      <LoadingDot initial={{ opacity: 0 }} variants={variants} animate='loadingThree' />
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
