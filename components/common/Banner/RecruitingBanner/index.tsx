import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import { DEADLINE_DATE, RECRUITING_LINK, TERM } from '@/components/common/Banner/RecruitingBanner/contants';
import CountdownTimer from '@/components/common/Banner/RecruitingBanner/CountdownTimer';
import MobileRecruitingBanner from '@/components/common/Banner/RecruitingBanner/MobileRecruitingBanner';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function RecruitingBanner() {
  const [isRecruiting, setIsRecruiting] = useState(DEADLINE_DATE.getTime() - new Date().getTime() > 0);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const finishCountdown = () => {
    setIsRecruiting(false);
  };

  return (
    <Link href={RECRUITING_LINK} target='_blank'>
      {isMobile ? (
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
      )}
    </Link>
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

  ${textStyles.SUIT_26_B}
`;

const Deadline = styled.div<{ isRecruiting: boolean }>`
  line-height: 100%;
  color: rgb(255 255 255 / 70%);

  ${textStyles.SUIT_16_M}

  ${({ isRecruiting }) =>
    isRecruiting &&
    css`
      display: flex;
      justify-content: space-between;
      width: 199px;
    `}
`;
