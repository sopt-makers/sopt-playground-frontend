import { useState } from 'react';

import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import UsingRulesDetail from '@/components/feed/upload/UsingRules/UsingRulesDetail';
import UsingRulesPreview from '@/components/feed/upload/UsingRules/UsingRulesPreview';

interface UsingRulesProps {
  isPreviewOpen: boolean;
  onClose: () => void;
}

export default function UsingRules({ isPreviewOpen, onClose }: UsingRulesProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <UsingRulesPreview isOpen={isPreviewOpen} onClose={onClose} />
      <UsingRulesButton onClick={() => setIsDetailOpen(true)} />
      <UsingRulesDetail isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
    </>
  );
}
