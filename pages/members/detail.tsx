import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import SiteHeader from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const MemberDetailPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { memberId } = router.query;
      router.replace(`/members?id=${memberId}`);
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
