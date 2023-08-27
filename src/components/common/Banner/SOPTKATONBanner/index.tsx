import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Responsive from '@/components/common/Responsive';
import { playgroundLink } from '@/constants/links';

import MobileEventBanner from './MobileEventBanner';
const DesktopEventBanner = dynamic(() => import('./DesktopEventBanner'), { ssr: false });

interface BannerProps {
  className?: string;
}

export default function SOPTKATONBanner({ className }: BannerProps) {
  return (
    <>
      <Responsive only='mobile' asChild>
        <Link href={playgroundLink.groupList()} className={className}>
          <MobileEventBanner />
        </Link>
      </Responsive>
      <Responsive only='desktop' asChild>
        <Link href={playgroundLink.groupList()} className={className}>
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
