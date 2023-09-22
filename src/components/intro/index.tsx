import { FC } from 'react';

import CatchPhraseSection from '@/components/intro/sections/CatchPhrase';
import Entry from '@/components/intro/sections/Entry';
import ValueSection from '@/components/intro/sections/ValueSection';

interface IntroProps {}

const Intro: FC<IntroProps> = ({}) => {
  return (
    <>
      <CatchPhraseSection />
      <ValueSection />
      <Entry />
    </>
  );
};

export default Intro;
