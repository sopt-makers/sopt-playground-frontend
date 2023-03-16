import styled from '@emotion/styled';
import { FC } from 'react';

import Verify from '@/components/auth/register/verify/Verify';
import { setLayout } from '@/utils/layout';

export const VerifyPage: FC = () => {
  return (
    <StyledVerifyPage>
      <Verify />
    </StyledVerifyPage>
  );
};

setLayout(VerifyPage, 'fullScreen');

export default VerifyPage;

const StyledVerifyPage = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  padding: 64px 24px;
  max-width: 420px;
`;
