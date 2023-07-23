import { useEffect } from 'react';

import useCountdown from '@/hooks/useCountdown';

interface CountdownTimerProps {
  deadlineDate: Date;
  finish: () => void;
}

export default function CountdownTimer({ deadlineDate, finish }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(deadlineDate);

  const isRunning = days + hours + minutes + seconds > 0;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  useEffect(() => {
    if (!isRunning) {
      finish();
    }
  }, [finish, isRunning]);

  return (
    <>
      {isRunning && (
        <>
          <span>{`지원 마감까지 ${days}일 ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</span>
          <span>{`>`}</span>
        </>
      )}
    </>
  );
}
