import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Responsive from '@/components/common/Responsive';
import { playgroundLink } from '@/constants/links';

import { CLOSE_DATE, OPEN_DATE, TERM } from './constants';
import MobileStudyBanner from './MobileStudyBanner';
const DesktopStudyBanner = dynamic(() => import('@/components/common/Banner/StudyBanner/DesktopStudyBanner'), {
  ssr: false,
});

interface StudyBannerProps {
  className?: string;
}

export default function StudyBanner({ className }: StudyBannerProps) {
  return (
    <>
      <Responsive only='mobile' asChild>
        <Link href={playgroundLink.groupList()} className={className}>
          <MobileStudyBanner />
        </Link>
      </Responsive>
      <Responsive only='desktop' asChild>
        <Link href={playgroundLink.groupList()} className={className}>
          <DesktopBannerContainer>
            <DesktopStudyBanner openDate={OPEN_DATE} closeDate={CLOSE_DATE} />
          </DesktopBannerContainer>
        </Link>
      </Responsive>
    </>
  );
}

const DesktopBannerContainer = styled.section`
  width: 100%;
  height: 98px;
`;
