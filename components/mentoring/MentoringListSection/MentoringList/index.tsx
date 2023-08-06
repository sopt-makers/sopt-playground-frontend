import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ReactNode, startTransition, useEffect, useState } from 'react';

import { getMemberProfileById } from '@/api/endpoint_LEGACY/members';
import Carousel from '@/components/common/Carousel';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { mentoringProvider } from '@/components/mentoring/data';
import MentoringCard from '@/components/mentoring/MentoringListSection/MentoringCard';
import {
  DESKTOP_LARGE_MEDIA_QUERY,
  DESKTOP_SMALL_MEDIA_QUERY,
  SCREEN_SIZE,
  TABLET_MEDIA_QUERY,
} from '@/components/mentoring/MentoringListSection/responsive';
import { playgroundLink } from '@/constants/links';

type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | undefined;

export default function MentoringList() {
  const [listType, setListType] = useState<ListType>();
  const { logClickEvent } = useEventLogger();
  const { getMentorIdList, getMentoringList } = mentoringProvider;
  const { data: mentorProfileById } = useQuery(
    ['getMentorProfile'],
    async () => {
      const mentorProfileList = await Promise.all(
        getMentorIdList().map(async (id: number) => {
          const profile = await getMemberProfileById(id);
          return { ...profile, id };
        }),
      );
      const mentorProfileById = new Map<number, { career?: string; profileImage?: string }>();
      mentorProfileList.forEach(({ id, careers, profileImage }) =>
        mentorProfileById.set(id, {
          career: careers.find((career) => career.isCurrent)?.companyName,
          profileImage,
        }),
      );
      return mentorProfileById;
    },
    { staleTime: Infinity, cacheTime: Infinity },
  );

  const eventLogger = {
    moveCarousel: () => logClickEvent('mentoringCarouselButton'),
    clickCarouselCard: (mentorId: number) => logClickEvent('mentoringCard', { mentorId }),
    clickMentorApplicationButton: () => logClickEvent('mentorApplicationButton'),
  };

  const mentoringList = getMentoringList();
  const sortedMentoringList = [
    ...mentoringList.filter(({ isOpened }) => isOpened),
    ...mentoringList.filter(({ isOpened }) => !isOpened),
  ];
  const mentoringCardList = sortedMentoringList.map(({ mentor, keywords, title, isOpened }) => (
    <Link href={playgroundLink.mentoringDetail(mentor.id)} key={mentor.id} className='card'>
      <MentoringCard
        mentor={{
          name: mentor.name,
          career: mentorProfileById?.get(mentor.id)?.career,
          profileImage: mentorProfileById?.get(mentor.id)?.profileImage,
        }}
        keywords={keywords}
        title={title}
        isOpened={isOpened}
        onClick={() => eventLogger.clickCarouselCard(mentor.id)}
      />
    </Link>
  ));

  useEffect(() => {
    const desktopLargeMedia = window.matchMedia(DESKTOP_LARGE_MEDIA_QUERY);
    const desktopSmallMedia = window.matchMedia(DESKTOP_SMALL_MEDIA_QUERY);

    const handleChangeDesktopLargeMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'carousel-small' : 'carousel-large');
    };
    const handleChangeDesktopSmallMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'scroll' : 'carousel-small');
    };

    desktopLargeMedia.addEventListener('change', handleChangeDesktopLargeMedia);
    desktopSmallMedia.addEventListener('change', handleChangeDesktopSmallMedia);

    startTransition(() => {
      if (desktopSmallMedia.matches) {
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
    };
  }, []);

  return (
    <Container>
      {(listType === undefined || listType === 'carousel-large') && (
        <StyledCarousel
          itemList={mentoringCardList}
          limit={3}
          renderItemContainer={(children: ReactNode) => <MentoringCardContainer>{children}</MentoringCardContainer>}
          onMove={eventLogger.moveCarousel}
          className={SCREEN_SIZE.desktopLarge.className}
        />
      )}
      {(listType === undefined || listType === 'carousel-small') && (
        <StyledCarousel
          itemList={mentoringCardList}
          limit={2}
          renderItemContainer={(children: ReactNode) => <MentoringCardContainer>{children}</MentoringCardContainer>}
          onMove={eventLogger.moveCarousel}
          className={SCREEN_SIZE.desktopSmall.className}
        />
      )}
      {(listType === undefined || listType === 'scroll') && (
        <MentoringScrollWrapper className={SCREEN_SIZE.tablet.className}>
          <MentoringScrollList>{mentoringCardList}</MentoringScrollList>
        </MentoringScrollWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  .${SCREEN_SIZE.desktopSmall.className} {
    display: none;
  }

  .${SCREEN_SIZE.tablet.className} {
    display: none;
  }

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    .${SCREEN_SIZE.desktopLarge.className} {
      display: none;
    }

    .${SCREEN_SIZE.desktopSmall.className} {
      display: grid;
    }

    .${SCREEN_SIZE.tablet.className} {
      display: none;
    }
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    gap: 36px;
    margin-top: 104px;
    margin-bottom: 48px;

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
    gap: 24px;
    margin-top: 24px;
    margin-bottom: 40px;
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

  @media ${TABLET_MEDIA_QUERY} {
    & > .card:first-child {
      margin-left: 20px;
    }

    & > .card:last-child {
      margin-right: 20px;
    }
  }
`;
