import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import AuthRequired from '@/components/auth/AuthRequired';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    if (router.isReady && accessToken === null) {
      router.replace(playgroundLink.intro());
    } else {
      return setIsLoginChecked(true);
    }
  }, [accessToken, router, router.isReady]);

  if (isLoginChecked) {
    return (
      <AuthRequired>
        <FeedHomePage />
      </AuthRequired>
    );
  } else return null;
};

setLayout(Home, 'header');

export default Home;
