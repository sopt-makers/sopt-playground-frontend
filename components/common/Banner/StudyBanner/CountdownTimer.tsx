import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useCountdown from '@/hooks/useCountdown';
import { textStyles } from '@/styles/typography';

interface CountdownTimerProps {
  openDate: Date;
  closeDate: Date;
}

export default function CountdownTimer({ openDate, closeDate }: CountdownTimerProps) {
  const open = useCountdown(openDate);
  const close = useCountdown(closeDate);

  const isBeforeStart = open.days + open.hours + open.minutes + open.seconds > 0;
  const isBeforeClose = close.days + close.hours + close.minutes + close.seconds > 0;
  const isRecruiting = !isBeforeStart && isBeforeClose;
  const isFinished = !isBeforeStart && !isBeforeClose;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <Deadline isBeforeClose={isBeforeClose}>
      {isBeforeStart && (
        <>
          <span>{`신청 오픈까지 ${open.days}일 ${formatTime(open.hours)}:${formatTime(open.minutes)}:${formatTime(
            open.seconds,
          )}`}</span>
          <span>{`>`}</span>
        </>
      )}
      {isRecruiting && (
        <>
          <span>{`신청 마감까지 ${close.days}일 ${formatTime(close.hours)}:${formatTime(close.minutes)}:${formatTime(
            close.seconds,
          )}`}</span>
          <span>{`>`}</span>
        </>
      )}
      {isFinished && <span>☑️ 현재 모집이 마감되었습니다.</span>}
    </Deadline>
  );
}

const Deadline = styled.div<{ isBeforeClose: boolean }>`
  line-height: 100%;
  color: rgb(255 255 255 / 70%);

  ${textStyles.SUIT_16_M}

  ${({ isBeforeClose }) =>
    isBeforeClose &&
    css`
      display: flex;
      justify-content: space-between;
      width: 199px;
    `}
`;
