import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import MentoringDetail from '@/components/mentoring/MentoringDetail';
import { ORIGIN } from '@/constants/env';
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
    if (!isNaN(mentorId)) {
      return (
        <AuthRequired>
          <Head>
            <meta key='og:title' property='og:title' content='SOPT Playground' />
            <meta key='og:description' property='og:description' content='솝트와 연결되고 싶으신가요?' />
            <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
          </Head>
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
