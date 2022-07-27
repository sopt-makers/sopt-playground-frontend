import VerifyByEmail from '@/components/auth/register/VerifyByEmail';
import styled from '@emotion/styled';
import { FC } from 'react';

export const VerifyPage: FC = () => {
  return (
    <StyledVerifyPage>
      <VerifyByEmail />
    </StyledVerifyPage>
  );
};

export default VerifyPage;

const StyledVerifyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
