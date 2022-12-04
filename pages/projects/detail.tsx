import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

/** @deprecated 기존 URL 링크 호환용 리다이렉트 페이지 */
const ProjectDetailPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { projectId } = router.query;
      router.replace(playgroundLink.projectDetail(`${projectId}`));
    }
  }, [router, router.isReady]);

  return null;
};

setLayout(ProjectDetailPage, 'header');

export default ProjectDetailPage;
