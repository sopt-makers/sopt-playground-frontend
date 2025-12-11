import { useEffect, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { LATEST_GENERATION } from '@/constants/generation';

export const useMatchMemberEvent = () => {
  const { data: myData } = useGetMemberOfMe();
  const [isQA, setIsQA] = useState(false);

  useEffect(() => {
    setIsQA(typeof window !== 'undefined' && localStorage.getItem('BALANCEGAME_OPEN') === 'true');
  }, []);

  const isLastGeneration = myData?.generation === LATEST_GENERATION;
  const hasWorkPreference = myData?.hasWorkPreference ?? false;
  const isSpecialPopupPeriod = true;

  const canOpenModal =
    !!myData &&
    (isQA || (isSpecialPopupPeriod && isLastGeneration && !hasWorkPreference && myData.enableWorkPreferenceEvent));

  return {
    hasWorkPreference,
    isSpecialPopupPeriod,
    canOpenModal,
  };
};
