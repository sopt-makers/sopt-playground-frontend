import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <ActiveBannerSlot />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
