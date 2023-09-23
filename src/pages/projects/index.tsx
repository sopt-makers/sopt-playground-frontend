import Head from 'next/head';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import ProjectList from '@/components/projects/main/ProjectList';
import { ORIGIN } from '@/constants/env';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <Head>
        <meta key='og:title' property='og:title' content='SOPT Playground' />
        <meta key='og:description' property='og:description' content='솝트와 연결되고 싶으신가요?' />
        <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
      </Head>
      <ActiveBannerSlot />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
