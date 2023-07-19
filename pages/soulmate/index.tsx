import styled from '@emotion/styled';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';

interface SoulmatePageProps {}

const SoulmatePage: FC<SoulmatePageProps> = ({}) => {
  return (
    <AuthRequired>
      <Container>Soulmate</Container>
    </AuthRequired>
  );
};

export default SoulmatePage;

const Container = styled.div``;
