import { FC } from 'react';

import CatchPhraseSection from '@/components/intro/sections/CatchPhrase';
import ValueSection from '@/components/intro/sections/ValueSection';

interface IntroProps {}

const Intro: FC<IntroProps> = ({}) => {
  return (
    <>
      <CatchPhraseSection />
      <ValueSection />
    </>
  );
};

export default Intro;
