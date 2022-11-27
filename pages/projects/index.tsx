import _uniqBy from 'lodash/uniqBy';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const router = useRouter();

  const [projectId, setProjectId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (typeof id === 'string') {
        setProjectId(id);
      } else {
        setProjectId(null);
      }
      setIsReady(true);
    }
  }, [router, router.isReady, router.query]);

  if (!isReady) {
    return null;
  }

  if (projectId === null) {
    return (
      <AuthRequired>
        <ProjectList />
      </AuthRequired>
    );
  }

  return (
    <AuthRequired>
      <ProjectDetail projectId={projectId} />
    </AuthRequired>
  );
};

setLayout(ProjectPage, (page) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
));

export default ProjectPage;
