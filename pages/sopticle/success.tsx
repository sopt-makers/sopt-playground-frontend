import styled from '@emotion/styled';
import { FC } from 'react';

import UploadSuccess from '@/components/sopticle/Success';
import { setLayout } from '@/utils/layout';

const SuccessPage: FC = () => {
  return (
    <StyledSuccessPage>
      <UploadSuccess />
    </StyledSuccessPage>
  );
};

export default SuccessPage;

setLayout(SuccessPage, 'headerFooter');

const StyledSuccessPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  padding: 36px 24px 0;
`;
