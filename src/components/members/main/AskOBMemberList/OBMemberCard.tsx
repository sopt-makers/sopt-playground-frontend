import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { useRouter } from 'next/router';

import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import MemberProfileImage from '@/components/members/main/MemberCard/MemberProfileImage';
import IconAskCheck from '@/public/icons/icon_ask_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface OBMemberCardProps {
  id: number;
  name: string;
  profileImageUrl?: string;
  latestActivity: {
    generation: number;
    part: string;
    team: string | null;
  };
  career: {
    companyName: string;
    title: string;
  } | null;

  isAnswerGuaranteed: boolean;
}

const ELLIPSIS_WIDTH = 26;
const BADGE_GAP = 4;

export default function OBMemberCard({
  id,
  name,
  profileImageUrl,
  latestActivity,
  career,

  isAnswerGuaranteed,
}: OBMemberCardProps) {
  const router = useRouter();
  const { logClickEvent } = useEventLogger();
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

  const handleClickButton = () => {
    logClickEvent('CTAAsk', { id, name });
    router.push(`/members/${id}?tab=ask`);
  };
  return (
    <OBMemberCardWrapper>
      <MemberCardContent>
        <ImageWrapper>
          {isAnswerGuaranteed && (
            <AnswerGuaranteedBadge>
              <IconAskCheck style={{ width: 14, height: 14 }} />
              <Text typography='SUIT_11_SB'>답변 보장</Text>
            </AnswerGuaranteedBadge>
          )}
          <MemberProfileImage imageUrl={profileImageUrl || ''} size='sm' />
        </ImageWrapper>
        <MemberInfo>
          <NameWrapper>
            <Text typography='SUIT_20_SB'>{name}</Text>
            <BadgesBox ref={badgeWrapperRef}>
              <Badges>
                {visibleBadges?.map((badge, idx) => (
                  <Badge
                    ref={(el: HTMLDivElement) => (badgeRefs.current[idx] = el)}
                    key={idx}
                    isActive={badge.isActive}
                  >
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
          </NameWrapper>
          <Text typography='SUIT_16_M'>
            {career?.companyName} {career?.title}
          </Text>
        </MemberInfo>
      </MemberCardContent>
      <Button variant='fill' theme='white' onClick={handleClickButton}>
        <Text typography='SUIT_14_SB'>궁금한 점, 편하게 물어보세요!</Text>
      </Button>
    </OBMemberCardWrapper>
  );
}

const NameWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const ImageWrapper = styled.div`
  position: relative;
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
  overflow-x: hidden;
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
  gap: 6px;
  justify-content: center;
`;

const AnswerGuaranteedBadge = styled.div`
  display: flex;
  position: absolute;
  top: -10px;
  left: 2px;
  gap: 2px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 100px;
  background: ${colors.blue400};
  padding: 6px;
`;
