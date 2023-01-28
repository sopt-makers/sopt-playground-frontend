import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { DEADLINE_DATE, TERM } from '@/components/common/Banner/RecruitingBanner/contants';
import CountdownTimer from '@/components/common/Banner/RecruitingBanner/CountdownTimer';
import MobileRecruitingBanner from '@/components/common/Banner/RecruitingBanner/MobileRecruitingBanner';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

export default function RecruitingBanner() {
  const [isRecruiting, setIsRecruiting] = useState(DEADLINE_DATE.getTime() - new Date().getTime() > 0);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const finishCountdown = () => {
    setIsRecruiting(false);
  };

  return isMobile ? (
    <MobileRecruitingBanner />
  ) : (
    <Container>
      <RecruitmentText>{`🚀 makers ${TERM}기를 모집해요`}</RecruitmentText>
      <Deadline isRecruiting={isRecruiting}>
        {isRecruiting ? (
          <CountdownTimer deadlineDate={DEADLINE_DATE} finish={finishCountdown} />
        ) : (
          '☑️ 현재 모집이 마감되었습니다'
        )}
      </Deadline>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: linear-gradient(164.77deg, #010101 19.93%, #185eff 141.3%), #000;
  padding: 25px 0 19px;
`;

const RecruitmentText = styled.div`
  line-height: 100%;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
`;

const Deadline = styled.div<{ isRecruiting: boolean }>`
  line-height: 100%;
  color: rgb(255 255 255 / 70%);
  font-size: 16px;
  font-weight: 500;

  ${({ isRecruiting }) =>
    isRecruiting &&
    css`
      display: flex;
      justify-content: space-between;
      width: 198px;
    `}
`;
