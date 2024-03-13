import { useEffect, useState } from 'react';

import useInterval from '@/hooks/useInterval';
import { convertMillisecondsIntoDateValues } from '@/utils/parseDate';

export default function useCountdown(targetDate: Date) {
  const getCountdownMilliseconds = () => {
    const now = new Date();
    return targetDate.getTime() - now.getTime();
  };

  const [countdown, setCountdown] = useState<number>(getCountdownMilliseconds());

  const { clear } = useInterval(() => {
    setCountdown(getCountdownMilliseconds());
  }, 1000);

  useEffect(() => {
    if (countdown <= 0) clear();
  }, [clear, countdown]);

  return convertMillisecondsIntoDateValues(countdown);
}
