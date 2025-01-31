import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode, startTransition, useEffect, useState } from 'react';

import { useGetRecentCoffeeChatReview } from '@/api/endpoint/coffeechat/getRecentCoffeechatReview';
import CoffeeChatReviewCard from '@/components/coffeechat/CoffeeChatReview/CoffeeChatReviewCard';
import { CoffeeChatReviewModal } from '@/components/coffeechat/CoffeeChatReview/CoffeeChatReviewModal';
import ScrollCarousel from '@/components/coffeechat/CoffeeRecentChatList/scrollCarousel';
import Carousel from '@/components/common/Carousel';
import Loading from '@/components/common/Loading';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY, PCTA_S_MEDIA_QUERY, PCTA_SM_MEDIA_QUERY } from '@/styles/mediaQuery';
import { getScreenMaxWidthMediaQuery } from '@/utils';

type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | 'tablet' | undefined;

const SCREEN_SIZE = {
  desktopLarge: { size: 1488, className: 'large-desktop-only' },
  desktopSmall: { size: 1046, className: 'small-desktop-only' },
  tablet: { size: 918, className: 'tablet-only' },
  mobile: { size: 375, className: 'mobile-only' },
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge.size}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall.size}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.tablet.size}px`);

export default function CoffeeChatReviewList() {
  const [listType, setListType] = useState<ListType>();

  const { data, isLoading } = useGetRecentCoffeeChatReview();
  const [index, setIndex] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const isEmptyData = data?.coffeeChatReviewList == null;
  const dataList = data?.coffeeChatReviewList || [];

  const coffeeChatRecentCardList = dataList?.map((item, index) => (
    <LoggingClick key={String(item?.nickname)} eventKey='coffeechatReviewCard'>
      <div
        onClick={() => {
          setPopupVisible(true);
          setIndex(index);
        }}
      >
        <CoffeeChatReviewCard
          key={item.nickname}
          profileImage={item.profileImage || ''}
          nickname={'nickname' in item ? item.nickname : ''}
          soptActivities={item.soptActivities || []}
          coffeeChatTopicType={'coffeeChatTopicType' in item ? item.coffeeChatTopicType : []}
          content={'content' in item ? item.content : ''}
        />
      </div>
    </LoggingClick>
  ));

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
    <Container>
      {isPopupVisible && (
        <CoffeeChatReviewModal
          isPopupVisible={isPopupVisible}
          setPopupVisible={setPopupVisible}
          content={dataList[index].content}
          nickname={dataList[index].nickname}
          soptActivities={dataList[index].soptActivities}
          profileImage={dataList[index].profileImage}
          coffeeChatTopicType={dataList[index].coffeeChatTopicType}
        />
      )}

      <Header>
        <Title>
          <>따끈한 후기가 도착했어요💌</>
        </Title>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          {(listType === undefined || listType === 'carousel-large') && (
            <StyledCarousel
              itemList={coffeeChatRecentCardList}
              limit={3}
              renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
              className={SCREEN_SIZE.desktopLarge.className}
            />
          )}
          {(listType === undefined || listType === 'carousel-small') && (
            <StyledCarousel
              itemList={coffeeChatRecentCardList}
              limit={2}
              renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
              className={SCREEN_SIZE.desktopSmall.className}
            />
          )}
          {(listType === undefined || listType === 'scroll') && (
            <StyledScrollCarousel
              itemList={coffeeChatRecentCardList}
              limit={2}
              renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
              className={SCREEN_SIZE.tablet.className}
            ></StyledScrollCarousel>
          )}
          {(listType === undefined || listType === 'tablet') && (
            <StyledScrollCarousel
              itemList={coffeeChatRecentCardList}
              limit={1}
              renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
              className={SCREEN_SIZE.tablet.className}
            ></StyledScrollCarousel>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: center;
  margin-top: 48px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    .${SCREEN_SIZE.desktopSmall.className} {
      display: grid;
    }

    .${SCREEN_SIZE.tablet.className} {
      display: none;
    }
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    gap: 24px;
    margin-top: 80px;

    .${SCREEN_SIZE.desktopLarge.className} {
      display: none;
    }

    .${SCREEN_SIZE.desktopSmall.className} {
      display: none;
    }

    .${SCREEN_SIZE.tablet.className} {
      display: flex;
    }
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 16px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
    margin-top: 28px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1300px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 860px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 12px;
    margin-bottom: 10px;
    width: 420px;
  }
  @media ${PCTA_S_MEDIA_QUERY} {
    margin-top: 12px;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    padding-right: 20px;
    padding-left: 20px;
    width: 100%;
  }
`;

const Title = styled.div`
  max-height: 56px;
  text-align: start;

  /* Heading/24_B */
  ${fonts.HEADING_24_B}

  color: ${colors.white};

  @media ${MB_BIG_MEDIA_QUERY} {
    /* Heading/18_B */
    ${fonts.HEADING_18_B}
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 238px;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    height: 206px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    height: 164px;
  }
`;

const StyledCarousel = styled(Carousel)`
  padding-top: 8px;
  width: 1417px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 975px;
  }
`;
const StyledScrollCarousel = styled(ScrollCarousel)`
  padding-top: 8px;
  width: 860px;
  @media ${PCTA_SM_MEDIA_QUERY} {
    width: 420px;
    height: 100%;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    padding-right: 20px;
    padding-left: 20px;
    width: 100%;
    height: 100%;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FixedButtonArea = styled.div`
  position: fixed;
  right: 90px;
  bottom: 42px;
  z-index: 202;

  @media ${PCTA_S_MEDIA_QUERY} {
    right: 20px;
    bottom: 42px;
  }
`;
