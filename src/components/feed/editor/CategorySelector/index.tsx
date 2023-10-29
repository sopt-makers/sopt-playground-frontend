import { useState } from 'react';

import CategorySelectorHeader from '@/components/feed/editor/CategorySelector/CategorySelectorHeader';
import MainSelector from '@/components/feed/editor/CategorySelector/common/MainSelector';
import SubSelector from '@/components/feed/editor/CategorySelector/common/SubSelector';

export default function CategorySelector() {
  const [isMainOpen, setIsMainOpen] = useState<boolean | undefined>(true);

  return (
    <>
      <MainSelector isOpen={isMainOpen} onClose={() => setIsMainOpen(false)} />
      <SubSelector isOpen={!isMainOpen} onBack={() => setIsMainOpen(true)} onClose={() => setIsMainOpen(undefined)} />
      <CategorySelectorHeader />
    </>
  );
}
