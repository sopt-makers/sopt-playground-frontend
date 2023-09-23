import Head from 'next/head';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectEdit from '@/components/projects/edit/ProjectEdit';
import { ORIGIN } from '@/constants/env';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const ProjectEditPage: FC = () => {
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
          <meta key='og:title' property='og:title' content='SOPT Playground' />
          <meta key='og:description' property='og:description' content='솝트와 연결되고 싶으신가요?' />
          <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
        </Head>
        <ProjectEdit projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectEditPage, 'header');

export default ProjectEditPage;
