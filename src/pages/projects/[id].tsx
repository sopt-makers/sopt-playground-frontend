import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import { ORIGIN } from '@/constants/env';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  return (
    <AuthRequired>
      <NextSeo
        title='SOPT | 프로젝트 둘러보기'
        description='자세한 내용이 궁금하신가요?'
        openGraph={{
          title: 'SOPT | 프로젝트 둘러보기',
          description: '자세한 내용이 궁금하신가요?',
          images: [
            {
              url: `${ORIGIN}/icons/img/og_project.jpg`,
            },
          ],
        }}
      />
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' && <ProjectDetail projectId={query.id} />}
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
