import { useState } from 'react';

import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import UsingRulesDetail from '@/components/feed/upload/UsingRules/UsingRulesDetail';
import UsingRulesPreview from '@/components/feed/upload/UsingRules/UsingRulesPreview';

interface UsingRulesProps {
  isSelectorOpen: 'openCategory' | 'openTag' | 'closeAll' | 'openUsingRules';
  closeAll: () => void;
}

export default function UsingRules({ isSelectorOpen, closeAll }: UsingRulesProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <UsingRulesPreview isOpen={isSelectorOpen === 'openUsingRules'} onClose={closeAll} />
      <UsingRulesButton onClick={() => setIsDetailOpen(true)} />
      <UsingRulesDetail isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
    </>
  );
}
