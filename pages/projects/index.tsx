import _uniqBy from 'lodash/uniqBy';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import useStringRouterQuery from '@/components/auth/useStringRouterQuery';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return (
      <AuthRequired>
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

setLayout(ProjectPage, (page) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
));

export default ProjectPage;
