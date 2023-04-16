import { uniqBy as _uniqBy } from 'lodash-es';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import SOPTEventBanner from '@/components/common/Banner/SOPTEventBanner';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <SOPTEventBanner />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
