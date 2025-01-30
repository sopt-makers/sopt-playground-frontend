import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { m } from 'framer-motion';
import { useState } from 'react';

import Divider from '@/components/common/Divider/Divider';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import { LATEST_GENERATION } from '@/constants/generation';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MB_SM_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface ReviewCardProps {
  profileImage: string;
  nickname: string;
  soptActivities: Array<string>;
  coffeeChatTopicType: Array<string>;
  content: string;
}

export default function CoffeeChatReviewCard({
  profileImage,
  nickname,
  soptActivities,
  coffeeChatTopicType,
  content,
}: ReviewCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const sortSoptActivities = (soptActivities: string[]) => {
    const uniqueSortedActivities = Array.from(new Set(soptActivities)).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0]); // 문자열에서 숫자 추출
      const numB = parseInt(b.match(/\d+/)![0]);
      return numB - numA; // 내림차순 정렬
    });
    return uniqueSortedActivities;
  };

  const soptActivityBadges = sortSoptActivities(soptActivities).map((activity) =>
    activity.includes(LATEST_GENERATION.toString())
      ? {
          content: activity,
          isActive: true,
        }
      : {
          content: activity,
          isActive: false,
        },
  );

  const ELLIPSIS_WIDTH = 26;
  const BADGE_GAP = 4;
  const {
    visibleBadges: visibleSoptActivities,
    isBadgeOverflow: isSoptActivitiesOverflow,
    badgeRefs: soptActivitiesRef,
    badgeWrapperRef: soptActivitiesWrapperRef,
  } = useVisibleBadges(soptActivityBadges, ELLIPSIS_WIDTH, BADGE_GAP);

  const {
    visibleBadges: visibleTopics,
    isBadgeOverflow: isTopicsOverflow,
    badgeRefs: topicsRef,
    badgeWrapperRef: topicsWrapperRef,
  } = useVisibleBadges(coffeeChatTopicType, ELLIPSIS_WIDTH, BADGE_GAP);

  return (
    <>
      <Container
        whileHover={{
          y: -4,
        }}
      >
        <HeaderSection>
          <TitleSection>
            {' '}
            <ImageBox>
              <EmptyProfileImage hide={isImageLoaded}>
                <DefaultImage src='/icons/icon-profile.svg' loading='lazy' decoding='async' />
              </EmptyProfileImage>
              {profileImage && (
                <ResizedProfileImage
                  src={profileImage}
                  onLoad={() => setIsImageLoaded(true)}
                  hide={!isImageLoaded}
                  width={68}
                />
              )}
            </ImageBox>{' '}
            <Title>{nickname}</Title>
          </TitleSection>
          <SoptTagSection ref={soptActivitiesWrapperRef}>
            {visibleSoptActivities.map((badge, idx) => (
              <Badge
                ref={(el: HTMLDivElement) => (soptActivitiesRef.current[idx] = el)}
                isActive={badge.isActive}
                key={idx}
              >
                {badge.isActive}
                <Text typography='SUIT_11_SB' color={badge.isActive ? colors.secondary : colors.gray200}>
                  {badge.content}
                </Text>
              </Badge>
            ))}
            {isSoptActivitiesOverflow && (
              <Badge isActive={false}>
                <Text typography='SUIT_11_SB'>...</Text>
              </Badge>
            )}
          </SoptTagSection>
        </HeaderSection>
        <Divider color='#3F3F47' />

        <BodySection>
          <TagSection ref={topicsWrapperRef}>
            {visibleTopics
              ?.map((topic) => topic.trim())
              .filter(Boolean)
              .map((topic, idx) => (
                <div key={topic} ref={(el: HTMLDivElement) => (topicsRef.current[idx] = el)}>
                  <Tag size='md' shape='rect' variant='secondary' type='solid'>
                    {topic}
                  </Tag>
                </div>
              ))}

            {isTopicsOverflow && (
              <Tag size='md' shape='rect' variant='secondary' type='solid'>
                ...
              </Tag>
            )}
          </TagSection>
        </BodySection>
        <InfoSection>{content}</InfoSection>
      </Container>
    </>
  );
}

const Container = styled(m.div)<{ isEmptyData?: boolean; isBlurred?: boolean; isMine?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 24px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 32px;
  width: 420px;
  min-width: 420px;
  min-height: 227.6px;
  max-height: 227.6px;
  overflow: hidden;
  ${({ isEmptyData }) =>
    isEmptyData &&
    css`
      pointer-events: none;
    `};
  ${({ isBlurred }) =>
    isBlurred &&
    css`
      position: relative;

      /* filter: blur(5px); */
    `};
  ${({ isMine }) =>
    isMine &&
    css`
      border: 1px solid ${colors.gray200};
    `};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 32px;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    border-radius: 20px;
    width: calc(100vw - 40px);
    min-width: calc(100vw - 40px);
  }
`;
const TitleSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 178px;
  max-width: 178px;
  color: ${colors.white};

  @media ${MB_BIG_MEDIA_QUERY} {
    width: 163px;
    min-width: 163px;
    max-width: 163px;
    height: 48px;
    max-height: 48px;
    ${fonts.HEADING_16_B};
  }

  @media ${MB_MID_MEDIA_QUERY} {
    width: 128px;
    min-width: 128px;
    max-width: 128px;
  }
  @media ${MB_SM_MEDIA_QUERY} {
    width: 128px;
    min-width: 128px;
    max-width: 128px;
  }
`;
const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  ${fonts.TITLE_16_SB}
`;

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
  width: 100%;
  height: 24px;
  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 100%;
  }
`;
const ImageBox = styled.div`
  position: relative;
  width: 24px;
  min-width: 24px;
  height: 24px;
  clip-path: circle(50%);
`;

const EmptyProfileImage = styled.div<{ hide?: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray700};
  width: 24px;
  height: 24px;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const DefaultImage = styled.img`
  width: 16px;
  height: 16px;
`;

const ResizedProfileImage = styled(ResizedImage)<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  height: 24px;
  min-height: 24px;
`;
const TagSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const InfoSection = styled.div`
  margin-top: 11px;
  width: 100%;

  ${fonts.BODY_16_M};

  max-height: 79.6px;
  overflow-y: scroll;
  text-overflow: ellipsis;
`;

const SoptTagSection = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  color: ${colors.gray200};

  div {
    white-space: nowrap;
  }
`;

const Badge = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  ${fonts.LABEL_11_SB}

  height: 22px;
  line-height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 4px 6px;
    color: ${colors.gray100};
  }
`;
