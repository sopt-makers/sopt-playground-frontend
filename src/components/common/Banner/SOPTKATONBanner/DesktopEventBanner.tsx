import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useCountdown from '@/hooks/useCountdown';
import { textStyles } from '@/styles/typography';

import { OPEN_DATE } from './constants';

export default function DesktopEventBanner() {
  const { days, hours, minutes, seconds } = useCountdown(OPEN_DATE);
  const isNotOpen = days + hours + minutes + seconds > 0;

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <Container>
      <RecruitmentText>{`⚡ 솝커톤 참여자 모집`}</RecruitmentText>
      <Deadline isNotOpen={isNotOpen}>
        <>
          {isNotOpen ? (
            <>
              <span>{`신청일까지 ${days}일 ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</span>
              <span>{`>`}</span>
            </>
          ) : (
            <>
              <span>신청 오픈</span> <span>{`>`}</span>
            </>
          )}
        </>
      </Deadline>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: linear-gradient(164.77deg, #010101 19.93%, #2b26ff 141.3%), #000;
  padding: 26px 0 20px;
`;

const RecruitmentText = styled.div`
  line-height: 100%;
  color: #fff;

  ${textStyles.SUIT_26_B}
`;

const Deadline = styled.div<{ isNotOpen: boolean }>`
  line-height: 100%;
  color: rgb(255 255 255 / 70%);

  ${textStyles.SUIT_16_M}

  ${({ isNotOpen }) =>
    isNotOpen &&
    css`
      display: flex;
      justify-content: space-between;
      width: 184px;
    `}
`;
