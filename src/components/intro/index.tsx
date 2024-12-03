import { FC } from 'react';

import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import CatchPhraseSection from '@/components/intro/sections/CatchPhrase';
import Entry from '@/components/intro/sections/Entry';
import Footer from '@/components/intro/sections/Footer';
import Login from '@/components/intro/sections/Login';
import ValueSection from '@/components/intro/sections/ValueSection';

interface IntroProps {}

const Intro: FC<IntroProps> = ({}) => {
  const lastUnauthorized = useLastUnauthorized();

  return (
    <>
      <p>path: {lastUnauthorized.popPath() ?? 'none'}</p>
      <Login />
      <CatchPhraseSection />
      <ValueSection />
      <Entry />
      <Footer />
    </>
  );
};

export default Intro;
