import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode, startTransition, useEffect, useState } from 'react';

import Carousel from '@/components/common/Carousel';
import { getScreenMaxWidthMediaQuery } from '@/utils';

import OBmemberCardList from './OBmemberCardList';
type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | 'tablet' | undefined;

const SCREEN_SIZE = {
  desktopLarge: { size: 1542, className: 'large-desktop-only' },
  desktopSmall: { size: 1046, className: 'small-desktop-only' },
  tablet: { size: 1200, className: 'tablet-only' },
  mobile: { size: 375, className: 'mobile-only' },
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge.size}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall.size}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.tablet.size}px`);

export default function BestOBMemberForAsk() {
  const [listType, setListType] = useState<ListType>();

  useEffect(() => {
    const desktopLargeMedia = window.matchMedia(DESKTOP_LARGE_MEDIA_QUERY);
    const desktopSmallMedia = window.matchMedia(DESKTOP_SMALL_MEDIA_QUERY);
    const tabletMedia = window.matchMedia(TABLET_MEDIA_QUERY);

    const handleChangeDesktopLargeMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'carousel-small' : 'carousel-large');
    };
    const handleChangeDesktopSmallMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'tablet' : 'tablet');
    };
    const handleChangeTabletMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'tablet' : 'tablet');
    };
    desktopLargeMedia.addEventListener('change', handleChangeDesktopLargeMedia);
    desktopSmallMedia.addEventListener('change', handleChangeDesktopSmallMedia);
    tabletMedia.addEventListener('change', handleChangeTabletMedia);
    startTransition(() => {
      if (tabletMedia.matches) {
        setListType('tablet');
      } else if (desktopSmallMedia.matches) {
        setListType('scroll');
      } else if (desktopLargeMedia.matches) {
        setListType('carousel-small');
      } else {
        setListType('carousel-large');
      }
    });

    return () => {
      desktopLargeMedia.removeEventListener('change', handleChangeDesktopLargeMedia);
      desktopSmallMedia.removeEventListener('change', handleChangeDesktopSmallMedia);
      tabletMedia.removeEventListener('change', handleChangeTabletMedia);
    };
  }, []);
  return (
    <BestOBMemberWrapper>
      <Title>기획 분야에서 활약중인 멤버에게 물어보세요</Title>

      {(listType === undefined || listType === 'carousel-large') && (
        <StyledCarousel
          itemList={OBmemberCardList()}
          limit={4}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopLarge.className}
        />
      )}
      {(listType === undefined || listType === 'carousel-small') && (
        <StyledCarousel
          itemList={OBmemberCardList()}
          limit={3}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopSmall.className}
        />
      )}

      {(listType === undefined || listType === 'tablet') && (
        <StyledCarousel
          itemList={OBmemberCardList()}
          limit={2}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.tablet.className}
        ></StyledCarousel>
      )}
    </BestOBMemberWrapper>
  );
}

export const CardContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledCarousel = styled(Carousel)`
  flex-wrap: nowrap;
  gap: 12px;
  margin-left: -58px;
  padding-top: 8px;
  width: 1420px;
  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    margin-left: -53px;
    width: 1104px;
  }
  @media ${TABLET_MEDIA_QUERY} {
    width: calc(100% + 54px);
  }
`;
const BestOBMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 78px;
  margin-bottom: 48px;
`;

const Title = styled.h2`
  ${fonts.HEADING_28_B}
`;
