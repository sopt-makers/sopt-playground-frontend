import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';

import Divider from '@/components/common/Divider/Divider';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import { LATEST_GENERATION } from '@/constants/generation';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MB_SM_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface MentoringCardProps {
  id: string;
  title: string;
  isEmptyData?: boolean;
  topicTypeList: Array<string>;
  profileImage: string;
  name: string;
  career?: string;
  organization: string;
  companyJob?: string;
  soptActivities: Array<string>;
  isBlurred?: boolean;
  isMine?: boolean;
}

export default function CoffeeChatCard({
  id,
  title,
  isEmptyData,
  topicTypeList,
  profileImage,
  name,
  career,
  organization,
  companyJob,
  soptActivities,
  isBlurred,
  isMine,
}: MentoringCardProps) {
  const router = useRouter();
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
  } = useVisibleBadges(topicTypeList, ELLIPSIS_WIDTH, BADGE_GAP);

  if (career == '아직 없어요') {
    career = undefined;
  }

  return (
    <>
      <Container
        whileHover={{
          y: -4,
        }}
        onClick={() => {
          router.push(playgroundLink.coffeechatDetail(id));
        }}
        isEmptyData={isEmptyData}
        isBlurred={isBlurred}
        isMine={isMine}
      >
        {isBlurred ? (
          <BlurInfo>
            커피챗을 숨긴 상태예요.
            <br />
            카드를 누르면 상세 페이지에서 다시 보이게 할 수 있어요.
          </BlurInfo>
        ) : (
          <></>
        )}
        <TitleSection>
          <Title>{title}</Title>
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
        </TitleSection>
        <Divider color='#3F3F47' />
        <ProfileSection>
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
          </ImageBox>
          <InfoSection>
            {!career ? <UserName> {name}</UserName> : <UserName> {name ? `${name} | ${career}` : career}</UserName>}
            <Career>{companyJob ? `${organization} | ${companyJob}` : organization}</Career>
            <SoptTagSection ref={soptActivitiesWrapperRef}>
              {visibleSoptActivities.map((badge, idx) => (
                <Badge
                  ref={(el: HTMLDivElement) => (soptActivitiesRef.current[idx] = el)}
                  isActive={badge.isActive}
                  key={idx}
                >
                  {badge.isActive && <BadgeActiveDot />}
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
          </InfoSection>
        </ProfileSection>
      </Container>
    </>
  );
}

const Container = styled(m.div)<{ isEmptyData?: boolean; isBlurred?: boolean; isMine?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 24px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 32px;
  width: 420px;
  min-width: 420px;
  height: 280px;
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
    padding: 24px;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    gap: 4px;
    border-radius: 20px;
    width: calc(100vw - 40px);
    min-width: calc(100vw - 40px);
    height: 234px;
  }
`;

const Title = styled.div`
  display: ${'-webkit-box'};
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${fonts.HEADING_18_B}

  white-space: pre-line;
  word-break: break-word;
  color: ${colors.white};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MB_BIG_MEDIA_QUERY} {
    /* width: 342px;
    max-width: 342px; */
    height: 48px;
    max-height: 48px;
    ${fonts.HEADING_16_B};
  }

  /* @media ${MB_MID_MEDIA_QUERY} {
    width: 272px;
    max-width: 272px;
  }
  @media ${MB_SM_MEDIA_QUERY} {
    width: 232px;
    max-width: 232px;
  } */
`;

const Career = styled.div`
  /* Label/14_SB */
  ${fonts.TITLE_14_SB}

  max-width:266px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray400};
  @media ${MB_BIG_MEDIA_QUERY} {
    max-width: 256px;
    ${fonts.BODY_13_M}
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 100%;
  }
`;
const ImageBox = styled.div`
  position: relative;
  width: 70px;
  min-width: 70px;
  height: 70px;
  clip-path: circle(50%);
`;

const EmptyProfileImage = styled.div<{ hide?: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray700};
  width: 70px;
  height: 70px;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const DefaultImage = styled.img`
  width: 34px;
  height: 34px;
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

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 96px;
  min-height: 96px;

  @media ${MB_BIG_MEDIA_QUERY} {
    gap: 4px;
    height: 80px;
    min-height: 80px;
  }
`;
const TagSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  width: 356px;
  overflow: hidden;
  white-space: nowrap;

  div {
    @media ${MOBILE_MEDIA_QUERY} {
      font-size: 11px !important;
    }
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    width: 100%;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 280px;
  }

  @media (max-width: 430px) {
    max-width: 256px;
  }

  @media (max-width: 410px) {
    max-width: 200px;
  }

  @media (max-width: 360px) {
    max-width: 186px;
  }

  @media (max-width: 320px) {
    max-width: 146px;
  }
`;

const UserName = styled.div`
  ${fonts.TITLE_16_SB}

  margin-bottom:2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${MB_MID_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB}

    max-width:256px;
  }
`;
const SoptTagSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 12px;
  width: 266px;
  overflow-x: hidden;
  color: ${colors.gray200};

  div {
    white-space: nowrap;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    width: 206px;
  }
`;

const BlurInfo = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 8px;
  background-color: ${colors.grayAlpha700};
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  ${fonts.TITLE_16_SB}

  stroke: 1px ${colors.gray300};
  backdrop-filter: blur(7.5px);
`;

const Badge = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ isActive }) => (isActive ? 'rgb(247 114 52 / 20%)' : colors.gray700)};
  padding: 6px;
  height: 22px;
  line-height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 4px 6px;
    color: ${colors.gray100};
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: ${colors.secondary};
  width: 6px;
  height: 6px;
`;
