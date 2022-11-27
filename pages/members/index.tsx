import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import MobileHeader from '@/components/common/MobileHeader';
import MemberDetail from '@/components/members/main/MemberDetail';
import MemberList from '@/components/members/main/MemberList';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const router = useRouter();

  const [memberId, setMemberId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (typeof id === 'string') {
        setMemberId(id);
      } else {
        setMemberId(null);
      }
      setIsReady(true);
    }
  }, [router, router.isReady, router.query]);

  if (!isReady) {
    return null;
  }

  if (memberId === null) {
    return (
      <AuthRequired>
        <MemberList />
      </AuthRequired>
    );
  }

  return (
    <AuthRequired>
      <MobileHeader />
      <MemberDetail memberId={memberId} />
    </AuthRequired>
  );
};

setLayout(UserPage, (page) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
));

export default UserPage;
