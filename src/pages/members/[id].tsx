import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import MemberDetail from '@/components/members/detail/MemberDetail';
import { ORIGIN } from '@/constants/env';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  return (
    <AuthRequired>
      <NextSeo
        title='SOPT | 회원 프로필 보기'
        description='이 회원이 알고 싶으신가요?'
        openGraph={{
          title: 'SOPT | 회원 프로필 보기',
          description: '이 회원이 알고 싶으신가요?',
          images: [
            {
              url: `${ORIGIN}/icons/img/og_profile.jpg`,
            },
          ],
        }}
      />
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' && <MemberDetail memberId={query.id} />}
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
