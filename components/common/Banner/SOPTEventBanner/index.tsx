import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Responsive from '@/components/common/Responsive';

import { EVENT_LINK } from './constants';
import MobileEventBanner from './MobileEventBanner';
const DesktopEventBanner = dynamic(() => import('./DesktopEventBanner'), { ssr: false });

interface SOPTEventBannerProps {
  className?: string;
}

export default function SOPTEventBanner({ className }: SOPTEventBannerProps) {
  return (
    <>
      <Responsive only='mobile' asChild>
        <Link href={EVENT_LINK} className={className}>
          <MobileEventBanner />
        </Link>
      </Responsive>
      <Responsive only='desktop' asChild>
        <Link href={EVENT_LINK} className={className}>
          <DesktopBannerContainer>
            <DesktopEventBanner />
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
