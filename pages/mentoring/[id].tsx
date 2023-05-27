import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import MentoringDetail from '@/components/mentoring/MentoringDetail';
import { isMentoringId } from '@/components/mentoring/MentoringDetail/types';
import { setLayout } from '@/utils/layout';

import useStringRouterQuery from '../../hooks/useStringRouterQuery';

export default function MentoringDetailPage() {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const router = useRouter();

  if (status === 'loading') {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  if (status === 'error') {
    router.push('/404');
    return null;
  }

  if (status === 'success') {
    const mentorId = +query.id;
    if (isMentoringId(mentorId)) {
      return (
        <AuthRequired>
          <MentoringDetail mentorId={mentorId} />
        </AuthRequired>
      );
    }
  }

  router.push('/404');
  return null;
}

setLayout(MentoringDetailPage, 'headerFooter');

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
