import styled from '@emotion/styled';
import { debounce } from 'lodash-es';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import Carousel from '@/components/common/Carousel';
import MentoringCard from '@/components/mentoring/MentoringCard';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';

type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | undefined;

const getListType = (): ListType => {
  if (typeof window === 'undefined') {
    return;
  }
  if (window.innerWidth >= SCREEN_SIZE.DESKTOP_LARGE) {
    return 'carousel-large';
  } else if (window.innerWidth >= SCREEN_SIZE.DESKTOP_SMALL) {
    return 'carousel-small';
  } else {
    return 'scroll';
  }
};

const MENTORING_CARD_DUMMY_DATA = [
  {
    mentor: { id: 8, name: '남주영', career: '나사' },
    keywords: ['별자리 찾기', '우주의 탄생 과정에 대해 알아보기'],
    title: '정우와 함께하는 CGP Review',
  },
  {
    mentor: { id: 1, name: '송정우', career: 'AWS' },
    keywords: ['코드 리뷰', '아무거나 물어보세용', '취업 준비 과정에서 우선 순위 정하기'],
    title: '하둘셋넷다여일여아열하둘셋넷다여일여아열하둘셋넷다여일여아열',
  },
  {
    mentor: { id: 15, name: '백지연', career: '어둠의 커비단' },
    keywords: ['코드 리뷰', '취업 준비 과정에서 우선 순위 정하기', '노동요추천-에스파스파이씨'],
    title: '개발 천재 되는 법',
  },
  {
    mentor: { id: 24, name: '김은수', career: '당근마켓' },
    keywords: ['개자이피엠'],
    title: '개발 천재 되는 법',
  },
  {
    mentor: { id: 7, name: '이준호', career: '고수수현' },
    keywords: ['고수수현', '중수수현', '하수수현'],
    title: '개발 천재 되는 법',
  },
];

export default function MentoringList() {
  const [listType, setListType] = useState<ListType>();

  const mentoringCardList = MENTORING_CARD_DUMMY_DATA.map(({ mentor, keywords, title }) => (
    <MentoringCard
      mentor={{ name: mentor.name, career: mentor.career }}
      keywords={keywords}
      title={title}
      key={mentor.id}
    />
  ));

  const initListType = () => setListType(getListType());

  const handleResize = useMemo(
    () =>
      debounce(() => {
        const newListType = getListType();
        if (newListType !== listType) {
          setListType(newListType);
        }
      }, 1000),
    [listType],
  );

  useEffect(() => {
    initListType();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Container>
      <Title>{`✨ NEW! \n아래의 멘토들이 \n멘티를 기다리고 있어요`}</Title>
      {listType &&
        (listType === 'scroll' ? (
          <MentoringScrollWrapper>
            <MentoringScrollList>{mentoringCardList}</MentoringScrollList>
          </MentoringScrollWrapper>
        ) : (
          <StyledCarousel
            itemList={mentoringCardList}
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
  margin-bottom: 103px;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    margin-top: 104px;
    margin-bottom: 48px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    margin-top: 24px;
    margin-bottom: 40px;
  }
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
    padding: 0 20px;
    width: 100%;
    white-space: pre-line;
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

const MentoringScrollWrapper = styled.div`
  width: 636px;

  @media ${TABLET_MEDIA_QUERY} {
    width: 100%;
  }
`;

const MentoringScrollList = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
