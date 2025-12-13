import { useCallback, useEffect, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { LATEST_GENERATION } from '@/constants/generation';

export const useMatchMemberEvent = () => {
  const { data: myData } = useGetMemberOfMe();
  const [isQA, setIsQA] = useState(false);
  const [isClosedToday, setIsClosedToday] = useState(false);

  const getKoreanDate = (): string => {
    const koreanTime = new Date();
    return `${koreanTime.getFullYear()}-${String(koreanTime.getMonth() + 1).padStart(2, '0')}-${String(
      koreanTime.getDate(),
    ).padStart(2, '0')}`;
  };

  useEffect(() => {
    setIsQA(typeof window !== 'undefined' && localStorage.getItem('BALANCEGAME_OPEN') === 'true');
  }, []);

  const isLastGeneration = myData?.generation === LATEST_GENERATION;
  const hasWorkPreference = myData?.hasWorkPreference ?? false;
  const isSpecialPopupPeriod = true;

  const handleCloseForToday = useCallback(() => {
    const today = getKoreanDate();
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupClosedDate', today);
    }
    setIsClosedToday(true);
  }, []);

  useEffect(() => {
    setIsQA(typeof window !== 'undefined' && localStorage.getItem('BALANCEGAME_OPEN') === 'true');
    if (typeof window !== 'undefined') {
      const storedDate = localStorage.getItem('popupClosedDate');
      const today = getKoreanDate();

      if (storedDate === today) {
        setIsClosedToday(true);
      } else {
        setIsClosedToday(false);
      }
    }
  }, []);

  const canOpenModal =
    !!myData &&
    !isClosedToday &&
    (isQA || (isSpecialPopupPeriod && isLastGeneration && myData.enableWorkPreferenceEvent));

  return {
    hasWorkPreference,
    isSpecialPopupPeriod,
    canOpenModal,
    handleCloseForToday,
  };
};
