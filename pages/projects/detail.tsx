import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import SiteHeader from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const ProjectDetailPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { projectId } = router.query;
      router.replace(`/projects?id=${projectId}`);
    }
  }, [router, router.isReady]);

  return null;
};

setLayout(ProjectDetailPage, (page) => (
  <>
    <SiteHeader />
    {page}
  </>
));

export default ProjectDetailPage;
