import { FC, useEffect, useState } from 'react';

import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import CatchPhraseSection from '@/components/intro/sections/CatchPhrase';
import Entry from '@/components/intro/sections/Entry';
import Footer from '@/components/intro/sections/Footer';
import Login from '@/components/intro/sections/Login';
import ValueSection from '@/components/intro/sections/ValueSection';
import { isClientSide } from '@/utils';

interface IntroProps {}

const Intro: FC<IntroProps> = ({}) => {
  const lastUnauthorized = useLastUnauthorized();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (isClientSide()) {
      setPath(lastUnauthorized.popPath() ?? 'none');
    }
  }, [lastUnauthorized, path]);

  return (
    <>
      <p>path: {path}</p>
      <Login />
      <CatchPhraseSection />
      <ValueSection />
      <Entry />
      <Footer />
    </>
  );
};

export default Intro;
