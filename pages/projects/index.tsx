import _uniqBy from 'lodash/uniqBy';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import RecruitingBanner from '@/components/common/Banner/RecruitingBanner';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  return (
    <AuthRequired>
      <RecruitingBanner />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
