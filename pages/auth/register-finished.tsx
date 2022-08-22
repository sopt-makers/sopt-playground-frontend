import { FC } from 'react';
import styled from '@emotion/styled';
import FinishRegister from '@/components/auth/register/FinishRegister';

export const RegisterSuccessPage: FC = () => {
  return (
    <StyledRegisterSuccessPage>
      <FinishRegister />
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
