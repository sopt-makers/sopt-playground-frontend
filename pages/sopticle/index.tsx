import styled from '@emotion/styled';
import { FC } from 'react';

import { setLayout } from '@/utils/layout';

const SopticlePage: FC = () => {
  return <StyledSopticlePage></StyledSopticlePage>;
};

export default SopticlePage;

setLayout(SopticlePage, 'header');

const StyledSopticlePage = styled.div``;
