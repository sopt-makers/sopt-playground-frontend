import Head from 'next/head';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import { ORIGIN } from '@/constants/env';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <Head>
          <title>SOPT | 프로젝트 둘러보기</title>
          <meta key='og:title' property='og:title' content='SOPT | 프로젝트 둘러보기' />
          <meta key='og:description' property='og:description' content='자세한 내용이 궁금하신가요?' />
          <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_project.jpg`} />
        </Head>
        <ProjectDetail projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
