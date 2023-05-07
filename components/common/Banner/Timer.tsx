import { FC, useState } from 'react';

import useInterval from '@/hooks/useInterval';
import { convertMillisecondsIntoDateValues } from '@/utils';

interface TimerProps {
  targetDate: Date;
  prefix?: string;
  suffix?: string;
  endMessage: string;
}

type TimeObj = ReturnType<typeof convertMillisecondsIntoDateValues>;

const Timer: FC<TimerProps> = (props) => {
  const [timeDiff, setTimeDiff] = useState<TimeObj | 'prepare' | 'timeEnd'>('prepare');

  useInterval(() => {
    const diff = props.targetDate.getTime() - Date.now();
    if (diff >= 0) {
      setTimeDiff(convertMillisecondsIntoDateValues(diff));
    } else {
      setTimeDiff('timeEnd');
    }
  }, 100);

  if (timeDiff === 'prepare') {
    return <> </>;
  }
  if (timeDiff === 'timeEnd') {
    return <>{props.endMessage}</>;
  }

  return (
    <>
      {props.prefix}
      {timeDiff.days}일 {padZero(timeDiff.hours)}:{padZero(timeDiff.minutes)}:{padZero(timeDiff.seconds)}
      {props.suffix}
    </>
  );
};

export default Timer;

const padZero = (num: number) => {
  return `${num}`.padStart(2, '0');
};
