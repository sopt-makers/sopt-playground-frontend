import styled from '@emotion/styled';
import { FC } from 'react';

import UploadSopticle from '@/components/sopticle/UploadSopticle';
import { setLayout } from '@/utils/layout';

const SopticlePage: FC = () => {
  return (
    <StyledSopticlePage>
      <UploadSopticle />
    </StyledSopticlePage>
  );
};

export default SopticlePage;

setLayout(SopticlePage, 'header');

const StyledSopticlePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 24px 0;
`;
