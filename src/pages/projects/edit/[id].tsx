import { NextSeo } from 'next-seo';
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
        <NextSeo
          title='SOPT Playground'
          openGraph={{
            title: 'SOPT Playground',
            description: '솝트와 연결되고 싶으신가요?',
            images: [{ url: `${ORIGIN}/icons/img/og_playground.jpeg` }],
          }}
        />
        <ProjectEdit projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectEditPage, 'header');

export default ProjectEditPage;
