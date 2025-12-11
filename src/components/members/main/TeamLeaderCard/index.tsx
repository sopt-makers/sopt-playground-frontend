import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { m } from 'framer-motion';

import Text from '@/components/common/Text';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import MemberProfileImage from '@/components/members/main/MemberCard/MemberProfileImage';
import { LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
// TODO: API 연동 후 optional 제거
interface TeamLeaderCardProps {
  name: string;
  university: string | null;
  profileImageUrl: string;
  activities: {
    id: number;
    generation: number;
    part: string;
    team: string | null;
  }[];
  introduction: string | null;
  teamLeaderElectionDataUrl?: string;
  notionIntroductionUrl?: string;
  isLoading?: boolean;
}
const ELLIPSIS_WIDTH = 26;
const BADGE_GAP = 4;

const TeamLeaderCard = ({ name, university, profileImageUrl, activities, introduction }: TeamLeaderCardProps) => {
  const sortedGenerationActivities = activities?.sort((a, b) => b.generation - a.generation) || []; // TODO: || [] 테스트 후 삭제
  const badges = sortedGenerationActivities.map((activity) => ({
    content: `${activity.generation}기 ${activity.part}`,
    isActive: activity.generation === LATEST_GENERATION,
  }));

  const { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef } = useVisibleBadges(
    badges,
    ELLIPSIS_WIDTH,
    BADGE_GAP,
  );

  return (
    <MotionMemberCard whileHover='hover'>
      <ContentWrapper>
        <ImageWrapper>
          <MemberProfileImage
            isLoading={false}
            imageUrl='https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/d8dc321d-ce24-43cc-a20b-9876e6046bf3-고양이츄릅.jpeg'
          />
        </ImageWrapper>
        <ContentArea>
          <TitleBox>
            <Text typography='SUIT_18_SB'>{name}</Text>
            <Text typography='SUIT_12_SB' color={colors.gray200}>
              {university}
            </Text>
          </TitleBox>

          <BadgesBox ref={badgeWrapperRef}>
            <Badges>
              {visibleBadges?.map((badge, idx) => (
                <Badge ref={(el: HTMLDivElement) => (badgeRefs.current[idx] = el)} key={idx} isActive={badge.isActive}>
                  {badge.isActive && <BadgeActiveDot />}
                  <Text typography='SUIT_11_SB' color={badge.isActive ? colors.secondary : colors.gray200}>
                    {badge.content}
                  </Text>
                </Badge>
              ))}
              {isBadgeOverflow && (
                <Badge isActive={false}>
                  <Text typography='SUIT_11_SB'>...</Text>
                </Badge>
              )}
            </Badges>
          </BadgesBox>
          <Intro typography='SUIT_13_M' color={colors.gray200}>
            {introduction}
          </Intro>
        </ContentArea>
      </ContentWrapper>
      <ButtonWrapper>
        {/* TODO: API 연동 후 버튼 onClick 핸들러 추가 */}
        <Button variant='fill' theme='black' style={{ width: '100%' }}>
          자기 소개 보기
        </Button>
        <Button variant='fill' theme='white' style={{ width: '100%' }}>
          경선 자료 보기
        </Button>
      </ButtonWrapper>
    </MotionMemberCard>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
const Intro = styled(Text)`
  display: ${'-webkit-box'};
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 600;
    -webkit-line-clamp: 1;
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: ${colors.secondary};
  width: 6px;
  height: 6px;
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
const Badges = styled.div`
  display: flex;
  gap: ${BADGE_GAP}px;
  width: fit-content;
  height: 22px;
`;

const BadgesBox = styled.div`
  position: relative;
  margin-top: 8px;
  overflow-x: hidden;
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
const TitleBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: unset;
  }
`;

const MotionMemberCard = styled(m.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  transition: box-shadow 0.3s;
  border-radius: 16px;
  background-color: ${colors.gray900};
  padding: 16px 20px;
  width: 316px;
  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    border-radius: 10px;
    width: 100%;

    &:hover {
      background-color: transparent;
    }
  }
`;
export default TeamLeaderCard;
