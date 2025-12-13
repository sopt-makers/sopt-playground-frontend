import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconSend, IconUser } from '@sopt-makers/icons';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';

import useModalState from '@/components/common/Modal/useModalState';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import { LATEST_GENERATION } from '@/constants/generation';

interface Activity {
  id: number;
  generation: number;
  part: string;
  team: string | null;
}

interface WorkPreference {
  ideationStyle: string;
  workTime: string;
  communicationStyle: string;
  workPlace: string;
  feedbackStyle: string;
}

interface MemberCardProps {
  id: number;
  name: string;
  profileImage: string;
  university: string | null;
  workPreference: WorkPreference;
  activity: Activity;
  isLoading?: boolean;
}

const imageVariants = {
  hover: {
    scale: 1.1,
  },
};

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const shimmerEffect = css`
  background: linear-gradient(110deg, ${colors.gray900} 0%, ${colors.gray800} 50%, ${colors.gray900} 100%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 2s ease-in-out infinite;
`;

const GoodBadge = () => {
  return <StyledGoodBadge>잘맞아요💘</StyledGoodBadge>;
};

const WorkPreferenceMemberCard = ({
  name,
  profileImage,
  university,
  workPreference,
  activity,
  isLoading,
  id,
}: MemberCardProps) => {
  const router = useRouter();
  const activityBadges = {
    content: `${activity.generation}기 ${activity.part}`,
    isActive: activity.generation === LATEST_GENERATION,
  };

  const workPreferenceBadges = [
    workPreference.ideationStyle,
    workPreference.workTime,
    workPreference.communicationStyle,
    workPreference.workPlace,
    workPreference.feedbackStyle,
  ];

  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const { logClickEvent, logSubmitEvent } = useEventLogger();

  const handleClickMessage = () => {
    logClickEvent('messageBadge', { isRecommended: true });
    onOpenMessageModal();
  };

  const handleClickCard = () => {
    logClickEvent('memberCard', { id, name, screen: 'recommended' });
    router.push(`/members/${id}`);
  };

  return (
    <LoggingImpression eventKey='memberCard' param={{ id, name, screen: 'recommended' }}>
      <MotionMemberCard whileHover='hover'>
        <Container onClick={handleClickCard}>
          <ProfileImageWrapper>
            {!isLoading && <GoodBadge />}
            <StyledImageArea>
              <ImageHolder variants={imageVariants}>
                {isLoading ? (
                  <LoadingImage />
                ) : profileImage ? (
                  <Image className='image' src={profileImage} width={80} alt='member_image' />
                ) : (
                  <IconUser style={{ width: 60, height: 60, color: `${colors.gray400}`, paddingTop: '10px' }} />
                )}
              </ImageHolder>
            </StyledImageArea>
          </ProfileImageWrapper>
          <ContentArea>
            <TitleBox>
              {isLoading ? (
                <LoadingTitleBox />
              ) : (
                <>
                  <Name>{name}</Name>
                  <Belongs>{university}</Belongs>
                </>
              )}
            </TitleBox>
            {isLoading ? (
              <>
                <BadgesBox>
                  <LoadingBadge />
                </BadgesBox>
                <BadgesBox>
                  <Badges>
                    <LoadingBadge />
                    <LoadingBadge />
                    <LoadingBadge />
                  </Badges>
                </BadgesBox>
              </>
            ) : (
              <>
                {activityBadges && (
                  <Badges>
                    <Badge isActive={activityBadges.isActive}>
                      {activityBadges.isActive && <BadgeActiveDot />}
                      <Text typography='SUIT_11_SB' color={activityBadges.isActive ? colors.secondary : colors.gray200}>
                        {activityBadges.content}
                      </Text>
                    </Badge>
                  </Badges>
                )}
                <BadgesBox>
                  <Badges>
                    {workPreferenceBadges.map((badge, idx) => (
                      <Badge isActive={false} key={idx}>
                        <Text typography='SUIT_11_SB' color={colors.gray200}>
                          {badge}
                        </Text>
                      </Badge>
                    ))}
                  </Badges>
                </BadgesBox>
              </>
            )}
          </ContentArea>
        </Container>
        {isLoading ? (
          <LoadingTextField />
        ) : (
          <MessageButton onClick={onOpenMessageModal}>가볍게 인사해 볼까요?</MessageButton>
        )}
      </MotionMemberCard>
      {isOpenMessageModal && (
        <MessageModal
          receiverId={`${id}`}
          name={name}
          profileImageUrl={profileImage}
          onClose={onCloseMessageModal}
          defaultCategory={MessageCategory.NETWORK}
          onLog={(options) =>
            logSubmitEvent('sendMessage', {
              category: options?.category?.toString() ?? '',
              receiverId: +id,
              referral: 'memberDetail',
            })
          }
        />
      )}
    </LoggingImpression>
  );
};

export default WorkPreferenceMemberCard;

const MessageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.gray700};
  padding: 14px 16px;
  width: 100%;
  color: ${colors.white};
  ${fonts.LABEL_14_SB}
`;

const MotionMemberCard = styled(m.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.3s;
  border-radius: 10px;
  background-color: ${colors.gray900};
  cursor: pointer;
  padding: 20px 16px;
  width: 319px;
`;

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
`;

const StyledImageArea = styled.div`
  transform: translateZ(0);
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImageHolder = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const LoadingImage = styled.div`
  ${shimmerEffect};

  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: content;
  justify-content: center;
  width: 100%;
  min-height: unset;
  overflow: hidden;
`;

const Image = styled(ResizedImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleBox = styled(m.div)`
  display: flex;
  align-items: center;
  height: 28px;
`;

const Name = styled.p`
  flex-shrink: 0;
  color: ${colors.gray30};
  ${fonts.TITLE_18_SB};
`;

const Belongs = styled.p`
  flex-grow: 1;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray300};
  ${fonts.LABEL_12_SB}
`;

const BadgesBox = styled.div`
  position: relative;
  margin-top: 8px;
  overflow-x: hidden;
`;

const Badges = styled.div`
  display: flex;
  gap: 4px;
  width: fit-content;
  height: 22px;
`;

const Badge = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ isActive }) => (isActive ? 'rgb(247 114 52 / 20%)' : colors.gray700)};
  padding: 4px 6px;
  height: 22px;
  line-height: 0;
  color: ${colors.gray100};
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: ${colors.secondary};
  width: 6px;
  height: 6px;
`;

const LoadingBadge = styled.div`
  ${shimmerEffect};

  border-radius: 6px;
  width: 60px;
  height: 22px;
`;

const LoadingTitleBox = styled.div`
  ${shimmerEffect};

  border-radius: 8px;
  width: 54px;
  height: 24px;
`;

const LoadingTextField = styled.div`
  ${shimmerEffect};

  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

const StyledGoodBadge = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  border-radius: 16px;
  background-color: #fdbbf9;
  padding: 5px 4px 5px 8px;
  white-space: nowrap;
  color: ${colors.black};

  ${fonts.LABEL_11_SB}
`;
