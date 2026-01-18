import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronDown } from '@sopt-makers/icons';
import { ReactNode, startTransition, useEffect, useLayoutEffect, useState } from 'react';

import { useGetMembersAskList } from '@/api/endpoint/members/getMembersAskList';
import Carousel from '@/components/common/Carousel';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { getScreenMaxWidthMediaQuery } from '@/utils';

import OBMemberCard from './OBMemberCard';
import PartDropdown from './PartDropDown';
type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | 'tablet' | 'mobile' | undefined;

const SCREEN_SIZE = {
  desktopLarge: { size: 1542, className: 'large-desktop-only' },
  desktopSmall: { size: 1046, className: 'small-desktop-only' },
  tablet: { size: 1200, className: 'tablet-only' },
  mobile: { size: MOBILE_MEDIA_QUERY, className: 'mobile-only' },
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge.size}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall.size}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.tablet.size}px`);

export const PART_OPTIONS = [
  { value: '기획', label: '기획' },
  { value: '디자인', label: '디자인' },
  { value: '웹', label: '웹' },
  { value: '서버', label: '서버' },
  { value: '안드로이드', label: '안드로이드' },
  { value: 'iOS', label: 'iOS' },
];

export default function BestOBMemberForAsk() {
  const [listType, setListType] = useState<ListType>();
  const [isOpen, setIsOpenOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string>('기획');
  const [memberCardList, setMemberCardList] = useState<ReactNode[]>([]);

  const { data: membersData, isLoading } = useGetMembersAskList(selectedPart);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!membersData?.members || membersData.members.length === 0) {
      setMemberCardList([]);
      return;
    }

    const cards = membersData.members.map((member) => (
      <OBMemberCard
        key={member.id}
        id={member.id}
        name={member.name}
        profileImageUrl={member.profileImageUrl || ''}
        latestActivity={member.latestActivity}
        career={member.career}
        isAnswerGuaranteed={member.isAnswerGuaranteed}
      />
    ));
    setMemberCardList(cards);
  }, [membersData, isLoading]);

  useLayoutEffect(() => {
    const desktopLargeMedia = window.matchMedia(DESKTOP_LARGE_MEDIA_QUERY);
    const desktopSmallMedia = window.matchMedia(DESKTOP_SMALL_MEDIA_QUERY);
    const tabletMedia = window.matchMedia(TABLET_MEDIA_QUERY);
    const mobileMedia = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleChangeDesktopLargeMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'carousel-small' : 'carousel-large');
    };
    const handleChangeDesktopSmallMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'tablet' : 'carousel-small');
    };
    const handleChangeTabletMedia = (e: MediaQueryListEvent) => {
      // 1200px 이하일 때: mobile이 아니면 tablet
      if (e.matches) {
        setListType(mobileMedia.matches ? 'mobile' : 'tablet');
      } else {
        // 1200px 초과일 때: desktopSmallMedia 체크
        setListType(desktopSmallMedia.matches ? 'tablet' : 'carousel-small');
      }
    };
    const handleChangeMobileMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'mobile' : tabletMedia.matches ? 'tablet' : 'tablet');
    };
    desktopLargeMedia.addEventListener('change', handleChangeDesktopLargeMedia);
    desktopSmallMedia.addEventListener('change', handleChangeDesktopSmallMedia);
    tabletMedia.addEventListener('change', handleChangeTabletMedia);
    mobileMedia.addEventListener('change', handleChangeMobileMedia);
    startTransition(() => {
      if (mobileMedia.matches) {
        setListType('mobile');
      } else if (desktopSmallMedia.matches) {
        // 1046px 이하이면서 mobile이 아닌 경우 -> tablet
        setListType('tablet');
      } else if (tabletMedia.matches) {
        // 1200px 이하이면서 desktopSmallMedia가 false인 경우 (1047px ~ 1200px) -> tablet
        setListType('tablet');
      } else if (desktopLargeMedia.matches) {
        // 1542px 이하이면서 tabletMedia가 false인 경우 -> carousel-small
        setListType('carousel-small');
      } else {
        // 1542px 초과 -> carousel-large
        setListType('carousel-large');
      }
    });

    return () => {
      desktopLargeMedia.removeEventListener('change', handleChangeDesktopLargeMedia);
      desktopSmallMedia.removeEventListener('change', handleChangeDesktopSmallMedia);
      tabletMedia.removeEventListener('change', handleChangeTabletMedia);
      mobileMedia.removeEventListener('change', handleChangeMobileMedia);
    };
  }, []);

  if (isLoading) {
    return (
      <BestOBMemberWrapper>
        <TitleWrapper>
          <DropdownTrigger>
            {PART_OPTIONS.find((option) => option.value === selectedPart)?.label}
            <IconChevronDown
              style={{
                width: 20,
                height: 20,
                transform: isOpen ? 'rotate(-180deg)' : '',
                transition: 'all 0.5s',
                flexShrink: 0,
              }}
            />
          </DropdownTrigger>
          <Title>분야에서 활약중인 멤버에게 물어보세요</Title>
        </TitleWrapper>
      </BestOBMemberWrapper>
    );
  }

  return (
    <BestOBMemberWrapper>
      <TitleWrapper>
        <PartDropdown
          setSelectedPart={setSelectedPart}
          open={isOpen}
          setOpen={setIsOpenOpen}
          trigger={
            <DropdownTrigger>
              {PART_OPTIONS.find((option) => option.value === selectedPart)?.label}
              <IconChevronDown
                style={{
                  width: 20,
                  height: 20,
                  transform: isOpen ? 'rotate(-180deg)' : '',
                  transition: 'all 0.5s',
                  flexShrink: 0,
                }}
              />
            </DropdownTrigger>
          }
        />
        <Title>분야에서 활약중인 멤버에게 물어보세요</Title>
      </TitleWrapper>
      {(listType === undefined || listType === 'carousel-large') && memberCardList.length > 0 && (
        <StyledCarousel
          isButton={memberCardList.length > 4}
          itemList={memberCardList}
          limit={4}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopLarge.className}
        />
      )}
      {(listType === undefined || listType === 'carousel-small') && memberCardList.length > 0 && (
        <StyledCarousel
          isButton={memberCardList.length > 3}
          itemList={memberCardList}
          limit={3}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopSmall.className}
        />
      )}

      {(listType === undefined || listType === 'tablet') && memberCardList.length > 0 && (
        <StyledCarousel
          isButton={memberCardList.length > 2}
          itemList={memberCardList}
          limit={2}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.tablet.className}
        ></StyledCarousel>
      )}
      {(listType === undefined || listType === 'mobile') && memberCardList.length > 0 && (
        <StyledCarousel
          isButton={memberCardList.length > 1}
          itemList={memberCardList}
          limit={1}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.mobile.className}
        ></StyledCarousel>
      )}
    </BestOBMemberWrapper>
  );
}

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    justify-content: center;
  }
`;

const StyledCarousel = styled(Carousel)<{ isButton: boolean }>`
  flex-wrap: nowrap;
  gap: 12px;
  justify-content: start;

  /* margin-left: -58px; */
  margin-left: -12px;
  padding-top: 8px;
  width: 1300px;
  ${({ isButton }) =>
    !isButton &&
    css`
      & > button {
        display: none;
      }
    `};

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    /* margin-left: -53px; */
    margin-left: -13px;
    width: 1104px;
  }
  @media ${TABLET_MEDIA_QUERY} {
    width: calc(100% + 54px);
  }
  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 0;
    width: 100%;

    & > button {
      display: none;
    }
  }
`;

const BestOBMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 10px;
  margin-bottom: 48px;
`;

const Title = styled.span`
  ${fonts.HEADING_28_B}
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_20_B}
  }
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;
  ${fonts.HEADING_28_B}

  color: ${colors.yellow400};
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_20_B}
  }
`;

const TitleWrapper = styled.span`
  display: flex;
  align-items: start;
`;
