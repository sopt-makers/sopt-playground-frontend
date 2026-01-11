import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

import Text from '@/components/common/Text';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import MemberProfileImage from '@/components/members/main/MemberCard/MemberProfileImage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface OBMemberCardProps {
  name: string;
  profileImageUrl: string;
  latestActivity: {
    generation: number;
    part: string;
    team: string | null;
  };
  currentCareer: {
    companyName: string;
    title: string;
  } | null;
  previousCareer: {
    companyName: string;
    title: string;
  } | null;
  isAnswerGuaranteed: boolean;
}

const ELLIPSIS_WIDTH = 26;
const BADGE_GAP = 4;

export default function OBMemberCard({
  name,
  profileImageUrl,
  latestActivity,
  currentCareer,
  previousCareer,
  isAnswerGuaranteed,
}: OBMemberCardProps) {
  const badges = [
    {
      content: `${latestActivity.generation}기 ${latestActivity.part}`,
      isActive: false,
    },
  ];

  const { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef } = useVisibleBadges(
    badges,
    ELLIPSIS_WIDTH,
    BADGE_GAP,
  );

  return (
    <OBMemberCardWrapper>
      <MemberCardContent>
        <ImageWrapper>
          <MemberProfileImage imageUrl={''} size='sm' />
        </ImageWrapper>
        <MemberInfo>
          <Text typography='SUIT_16_SB'>
            {name}
            <Separator>ㅣ</Separator>
            {currentCareer?.companyName} {currentCareer?.title} 재직 중
          </Text>

          {previousCareer && (
            <Text typography='SUIT_13_M' color={colors.gray300}>
              (전) {previousCareer?.companyName} {previousCareer?.title}
            </Text>
          )}
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
        </MemberInfo>
      </MemberCardContent>
      <Button variant='fill' theme='white'>
        궁금한 점, 편하게 물어보세요!
      </Button>
    </OBMemberCardWrapper>
  );
}

const ImageWrapper = styled.div`
  width: 72px;
  height: 72px;
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

const Separator = styled.span`
  color: ${colors.gray400};
  ${fonts.TITLE_16_SB}
`;

const OBMemberCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  background-color: ${colors.gray900};
  padding: 24px 20px;
  width: 320px;
  height: 186px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const MemberCardContent = styled.div`
  display: flex;
  gap: 16px;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
