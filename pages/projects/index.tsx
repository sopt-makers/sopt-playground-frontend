import { uniqBy as _uniqBy } from 'lodash-es';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
