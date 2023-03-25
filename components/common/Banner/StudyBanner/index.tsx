import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Responsive from '@/components/common/Responsive';
import { textStyles } from '@/styles/typography';

import { CLOSE_DATE, CREW_LINK, OPEN_DATE, TERM } from './contants';
import MobileStudyBanner from './MobileStudyBanner';
const CountdownTimer = dynamic(() => import('@/components/common/Banner/StudyBanner/CountdownTimer'), {
  ssr: false,
});

interface RecruitingBannerProps {
  className?: string;
}

export default function StudyBanner({ className }: RecruitingBannerProps) {
  return (
    <>
      <Responsive only='mobile' asChild>
        <Link href={CREW_LINK} className={className}>
          <MobileStudyBanner />
        </Link>
      </Responsive>
      <Responsive only='desktop' asChild>
        <Link href={CREW_LINK} className={className}>
          <Container>
            <RecruitmentText>{`📝 ${TERM}기 스터디 모집`}</RecruitmentText>
            <CountdownTimer openDate={OPEN_DATE} closeDate={CLOSE_DATE} />
          </Container>
        </Link>
      </Responsive>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: linear-gradient(164.77deg, #010101 19.93%, #2b26ff 141.3%), #000;
  padding: 25px 0 19px;
`;

const RecruitmentText = styled.div`
  line-height: 100%;
  color: #fff;

  ${textStyles.SUIT_26_B}
`;
