import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ArrowDiagonalIcon from 'public/icons/icon-diagonal-arrow.svg';
import { ReactNode, startTransition, useEffect, useState } from 'react';

import { getMemberProfileById } from '@/api/endpoint_LEGACY/members';
import Carousel from '@/components/common/Carousel';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { mentoringProvider } from '@/components/mentoring/data';
import MentoringCard from '@/components/mentoring/MentoringCard';
import { MENTOR_APPLICATION_URL, playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';

import { MentoringCardContainer } from './MentoringCardContainer';

type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | undefined;

const SCREEN_SIZE = {
  desktopLarge: { size: 1542, className: 'large-desktop-only' },
  desktopSmall: { size: 1200, className: 'small-desktop-only' },
  tablet: { size: 768, className: 'tablet-only' },
  mobile: { size: 375, className: 'mobile-only' },
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge.size}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall.size}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.tablet.size}px`);

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

  const handleClickMentorApplicationButton = () => {
    eventLogger.clickMentorApplicationButton();
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
      <Responsive only='desktop'>
        <Header>
          <Title>{`✨ NEW! \n아래의 멘토들이 \n멘티를 기다리고 있어요`}</Title>
          <MentorApplicationButton
            href={MENTOR_APPLICATION_URL}
            target='_blank'
            onClick={handleClickMentorApplicationButton}
            rel='noopener'
          >
            나도 멘토로 참여하고 싶다면
            <ArrowDiagonalIcon />
          </MentorApplicationButton>
        </Header>
      </Responsive>

      <Responsive only='mobile'>
        <Header>
          <MentoringTitle>멘토링</MentoringTitle>
          <MentoringSub>여러 분야의 SOPT OB들과 얘기를 나눠보세요</MentoringSub>
        </Header>
      </Responsive>
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
      <Responsive only='mobile'>
        <MentorApplicationButton
          href={MENTOR_APPLICATION_URL}
          target='_blank'
          onClick={handleClickMentorApplicationButton}
          rel='noopener'
        >
          나도 멘토로 참여하고 싶다면
          <ArrowDiagonalIcon />
        </MentorApplicationButton>
      </Responsive>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 103px;

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

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 32px;
  }
`;

const Title = styled.div`
  text-align: start;
  line-height: 100%;
  color: ${colors.gray10};

  ${textStyles.SUIT_24_B}

  @media ${TABLET_MEDIA_QUERY} {
    white-space: pre-line;
  }
`;

const StyledCarousel = styled(Carousel)`
  width: 1414px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 975px;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin-top: 16px;
    overflow-y: hidden;
  }
`;

const MentorApplicationButton = styled.a`
  display: flex;
  gap: 6px;
  align-items: center;
  line-height: 100%;
  color: ${colors.gray400};

  ${textStyles.SUIT_18_M}

  & > svg {
    width: 20px;
    height: 20px;

    & > path {
      fill: ${colors.gray400};
    }
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 4px;
    line-height: 15px;

    ${textStyles.SUIT_12_M}

    & > svg {
      width: 12px;
      height: 12px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    padding: 0 20px;

    & > svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1302px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 969px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 636px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 12px;
    padding: 0 20px;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
  }
`;

const MentoringTitle = styled.h1`
  ${textStyles.SUIT_16_B}
`;

const MentoringSub = styled.p`
  margin-top: 4px;
  ${textStyles.SUIT_14_R}
`;
