import styled from '@emotion/styled';
import { debounce } from 'lodash-es';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import Carousel from '@/components/common/Carousel';
import MentoringCard from '@/components/mentoring/MentoringCard';
import { MENTORING_CARD_DUMMY_DATA } from '@/components/mentoring/temp';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';

type ListType = 'carousel-large' | 'carousel-small' | 'normal' | undefined;

const getListType = (): ListType => {
  if (typeof window === 'undefined') {
    return;
  }
  if (window.innerWidth >= SCREEN_SIZE.DESKTOP_LARGE) {
    return 'carousel-large';
  } else if (window.innerWidth >= SCREEN_SIZE.DESKTOP_SMALL) {
    return 'carousel-small';
  } else {
    return 'normal';
  }
};

export default function MentoringList() {
  const [listType, setListType] = useState<ListType>();

  const carouselItemList = MENTORING_CARD_DUMMY_DATA.map(({ mentor, keywords, title }) => (
    <MentoringCard
      mentor={{ name: mentor.name, career: mentor.career }}
      keywords={keywords}
      title={title}
      key={mentor.id}
    />
  ));

  const memorizedDebounceSetListType = useMemo(
    () =>
      debounce(() => {
        const newListType = getListType();
        if (newListType !== listType) {
          setListType(newListType);
        }
      }, 1000),
    // useEffect에서 사용 중인 handleResize로 인한 리렌더링 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleResize = memorizedDebounceSetListType;

  useEffect(() => {
    setListType(getListType());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Container>
      <Title>✨ NEW! 아래의 멘토들이 멘티를 기다리고 있어요</Title>
      {listType &&
        (listType === 'normal' ? (
          <></>
        ) : (
          <StyledCarousel
            itemList={carouselItemList}
            limit={listType === 'carousel-large' ? 3 : 2}
            renderItemContainer={(children: ReactNode) => <MentoringCardContainer>{children}</MentoringCardContainer>}
          />
        ))}
    </Container>
  );
}

const SCREEN_SIZE = {
  DESKTOP_LARGE: 1542,
  DESKTOP_SMALL: 1200,
  TABLET: 768,
  MOBILE: 375,
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.DESKTOP_LARGE}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.DESKTOP_SMALL}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.TABLET}px`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Title = styled.div`
  width: 1302px;
  text-align: start;
  line-height: 100%;
  color: ${colors.white};

  ${textStyles.SUIT_24_B}

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 969px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    width: 636px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledCarousel = styled(Carousel)`
  width: 1414px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 975px;
  }
`;

const MentoringCardContainer = styled.div`
  display: flex;
  gap: 15px;
`;
