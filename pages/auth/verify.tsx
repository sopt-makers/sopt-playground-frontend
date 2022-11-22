import styled from '@emotion/styled';
import { FC } from 'react';

import VerifyByEmail from '@/components/auth/register/VerifyByEmail';
import EmptyLayout from '@/components/layout/EmptyLayout';
import { setLayout } from '@/utils/layout';

export const VerifyPage: FC = () => {
  return (
    <StyledVerifyPage>
      <VerifyByEmail />
    </StyledVerifyPage>
  );
};

setLayout(VerifyPage, 'empty');

export default VerifyPage;

const StyledVerifyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
