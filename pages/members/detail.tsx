import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import SiteHeader from '@/components/common/Header';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

/** @deprecated 기존 URL 링크 호환용 리다이렉트 페이지 */
const MemberDetailPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { memberId } = router.query;
      router.replace(playgroundLink.memberDetail(`${memberId}`));
    }
  }, [router, router.isReady]);

  return null;
};

setLayout(MemberDetailPage, (page) => (
  <>
    <SiteHeader />
    {page}
  </>
));

export default MemberDetailPage;
