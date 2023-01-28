import useCountdown from '@/hooks/useCountdown';

interface CountdownTimerProps {
  deadlineDate: Date;
  finish: () => void;
}

export default function CountdownTimer({ deadlineDate, finish }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(deadlineDate, finish);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <>
      {days + hours + minutes + seconds > 0 && (
        <>
          <span>{`지원 마감까지 ${days}일 ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</span>
          <span>{`>`}</span>
        </>
      )}
    </>
  );
}
