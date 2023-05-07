import { uniqBy as _uniqBy } from 'lodash-es';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import SOPTKATONBanner from '@/components/common/Banner/SOPTKATONBanner';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <SOPTKATONBanner />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
