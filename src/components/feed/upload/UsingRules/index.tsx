import { useState } from 'react';

import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import UsingRulesDetail from '@/components/feed/upload/UsingRules/UsingRulesDetail';
import UsingRulesPreview from '@/components/feed/upload/UsingRules/UsingRulesPreview';

interface UsingRulesProps {
  isDropDown: 'categoryOpen' | 'tagOpen' | 'allClosed' | 'usingRulesOpen';
  allClosed: () => void;
}

export default function UsingRules({ isDropDown, allClosed }: UsingRulesProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <UsingRulesPreview isOpen={isDropDown === 'usingRulesOpen'} onClose={allClosed} />
      <UsingRulesButton onClick={() => setIsDetailOpen(true)} />
      <UsingRulesDetail isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
    </>
  );
}
