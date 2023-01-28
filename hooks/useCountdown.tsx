import { useState } from 'react';

import useInterval from '@/hooks/useInterval';
import { convertMillisecondsIntoDateValues } from '@/utils';

export default function useCountdown(targetDate: Date) {
  const getCountdownMilliseconds = () => {
    const now = new Date();
    return targetDate.getTime() - now.getTime();
  };

  const [countdown, setCountdown] = useState<number>(getCountdownMilliseconds());

  useInterval(() => {
    setCountdown(getCountdownMilliseconds());
  }, 1000);

  return convertMillisecondsIntoDateValues(countdown);
}
