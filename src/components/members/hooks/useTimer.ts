import { useEffect, useRef, useState } from 'react';

export const useTimer = (onResetTimer: () => void, initialSeconds = 180) => {
  const [isTimerActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const startTimer = () => {
    setIsActive(true);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTime = () => {
    setTimeLeft(initialSeconds);
  };

  useEffect(() => {
    if (isTimerActive) {
      if (timerRef.current) {
        setTimeLeft(initialSeconds);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onResetTimer();
            setIsActive(false);
            clearTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [isTimerActive, onResetTimer, initialSeconds]);

  return { timeLeft, reset: resetTime, start: startTimer, isTimerActive };
};
