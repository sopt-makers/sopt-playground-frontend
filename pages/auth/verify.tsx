import styled from '@emotion/styled';
import { FC } from 'react';

import VerifyLegacy from '@/components/auth/register/VerifyLegacy';
import { setLayout } from '@/utils/layout';

export const VerifyPage: FC = () => {
  return (
    <StyledVerifyPage>
      <VerifyLegacy />
    </StyledVerifyPage>
  );
};

setLayout(VerifyPage, 'fullScreen');

export default VerifyPage;

const StyledVerifyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
