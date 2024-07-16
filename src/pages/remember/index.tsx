'use client';
import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import RememberPage from '@/components/remember';
import { setLayout } from '@/utils/layout';

const Remember34Page: FC = () => {
  const [isMocking, setIsMocking] = useState(false);
  const isWorkerStarted = useRef(false);

  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== 'undefined' && !isWorkerStarted.current) {
        isWorkerStarted.current = true;
        const { worker } = await import('@/components/remember/mocks/browser');
        await worker.start();
        console.log('Worker started');
        setIsMocking(true);
      }
    }

    enableApiMocking();
  }, []);

  if (!isMocking) {
    return null;
  }

  return (
    <AuthRequired>
      <StyledRemember34Page>
        <RememberPage />
      </StyledRemember34Page>
    </AuthRequired>
  );
};

export default Remember34Page;

setLayout(Remember34Page, 'header');

const StyledRemember34Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
`;
