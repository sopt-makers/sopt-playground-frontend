import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectEdit from '@/components/projects/edit/ProjectEdit';
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
        <ProjectEdit projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectEditPage, 'header');

export default ProjectEditPage;
