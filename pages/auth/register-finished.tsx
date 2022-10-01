import styled from '@emotion/styled';
import { FC } from 'react';

import RegisterFinished from '@/components/auth/register/RegisterFinished';

export const RegisterSuccessPage: FC = () => {
  return (
    <StyledRegisterSuccessPage>
      <RegisterFinished />
    </StyledRegisterSuccessPage>
  );
};

export default RegisterSuccessPage;

const StyledRegisterSuccessPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
