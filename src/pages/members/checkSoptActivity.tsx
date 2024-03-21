import AuthRequired from '@/components/auth/AuthRequired';
import CheckSoptActivity from '@/components/members/upload/CheckActivity/CheckSoptActivity';
import { setLayout } from '@/utils/layout';
import styled from '@emotion/styled';

export default function CheckSoptActivityPage() {
  return (
    <AuthRequired>
      <PageWrapper>
        <CheckSoptActivity />
      </PageWrapper>
    </AuthRequired>
  );
}

setLayout(CheckSoptActivityPage, 'header');

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 29px;
  justify-content: center;
  margin: 142px auto 0;
  max-width: 790px;
`;
