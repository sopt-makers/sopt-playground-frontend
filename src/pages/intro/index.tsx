import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import Intro from '@/components/intro';
import { playgroundLink } from '@/constants/links';

interface IntroPageProps {}

const IntroPage: FC<IntroPageProps> = ({}) => {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    if (!(router.isReady && accessToken === null)) {
      router.replace(playgroundLink.memberList());
    }
  }, [accessToken, router, router.isReady]);

  useEffect(() => {
    window.ChannelIO?.('hideChannelButton');

    return () => {
      window.ChannelIO?.('showChannelButton');
    };
  });

  return (
    <>
      <Intro />
    </>
  );
};

export default IntroPage;
