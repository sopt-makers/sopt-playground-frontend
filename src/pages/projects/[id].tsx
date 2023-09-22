import { NextSeo } from 'next-seo';
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
        <NextSeo
          title='SOPT | 프로젝트 둘러보기'
          openGraph={{
            title: 'SOPT | 프로젝트 둘러보기',
            description: '자세한 내용이 궁금하신가요?',
            images: [{ url: `${ORIGIN}/icons/img/og_project.jpg` }],
          }}
        />
        <ProjectDetail projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
