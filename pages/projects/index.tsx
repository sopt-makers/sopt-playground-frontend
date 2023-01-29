import _uniqBy from 'lodash/uniqBy';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import RecruitingBanner from '@/components/common/Banner/RecruitingBanner';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import ProjectList from '@/components/projects/main/ProjectList';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return (
      <AuthRequired>
        <RecruitingBanner />
        <ProjectList />
      </AuthRequired>
    );
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <ProjectDetail projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
