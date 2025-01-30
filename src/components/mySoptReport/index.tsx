import ReportNav from '@/components/mySoptReport/ReportNav';
import { useState } from 'react';

export default function MySoptReport() {
  const [activeTab, setActiveTab] = useState<'sopt' | 'playground' | 'my-pg'>('sopt');

  const handleSetActive = (tab: 'sopt' | 'playground' | 'my-pg') => {
    setActiveTab(tab);
  };

  // TODO: 각 컴포넌트 안에서 선언
  // const ref = useIntersectionObserver(id, handleSetActive);

  return (
    <>
      <ReportNav activeTab={activeTab} handleSetActive={handleSetActive} />
    </>
  );
}
