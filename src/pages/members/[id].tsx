import Head from 'next/head';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import MemberDetail from '@/components/members/detail/MemberDetail';
import { ORIGIN } from '@/constants/env';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <Head>
          <title>SOPT | 회원 프로필 보기</title>
          <meta property='og:title' content='SOPT | 회원 프로필 보기' />
          <meta property='og:description' content='이 회원이 알고 싶으신가요?' />
          <meta property='og:image' content={`${ORIGIN}/icons/img/og_profile.jpg`} />
        </Head>
        <MemberDetail memberId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
