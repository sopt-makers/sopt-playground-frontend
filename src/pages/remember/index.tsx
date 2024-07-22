'use client';
import styled from '@emotion/styled';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import RememberPage from '@/components/remember';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const Remember34Page: FC = () => {
  return (
    <AuthRequired>
      <StyledRemember34Page>
        <RememberPage />
      </StyledRemember34Page>
    </AuthRequired>
  );
};

export default Remember34Page;

setLayout(Remember34Page, 'headerOnlyDesktop');

const StyledRemember34Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 10px 20px 24px;
  }
`;
