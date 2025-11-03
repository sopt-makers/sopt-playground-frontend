import styled from '@emotion/styled';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { colors } from '@sopt-makers/colors';
import { IconUser } from '@sopt-makers/icons';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC, SyntheticEvent } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import CoffeeChatButton from '@/components/members/main/MemberCard/CoffeeChatButton';
import MessageButton from '@/components/members/main/MemberCard/MessageButton';
import IconCoffee from '@/public/icons/icon-coffee.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberCardProps {
  memberId: number;
  name: string;
  belongs: string;
  intro: string;
  badges: {
    content: string;
    isActive: boolean;
  }[];
  email?: string;
  imageUrl?: string;
  isCoffeeChatActivate: boolean;

  onMessage?: (e: SyntheticEvent) => void;
}

const imageVariants = {
  hover: {
    scale: 1.1,
  },
};

const ELLIPSIS_WIDTH = 26;
const BADGE_GAP = 4;

const MemberCard: FC<MemberCardProps> = ({
  memberId,
  name,
  belongs,
  badges,
  intro,
  email,
  imageUrl,
  isCoffeeChatActivate,
  onMessage,
}) => {
  const { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef } = useVisibleBadges(
    badges,
    ELLIPSIS_WIDTH,
    BADGE_GAP,
  );

  const router = useRouter();
  const onCoffeeChatButtonClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    router.push(playgroundLink.coffeechatDetail(memberId));
  };

  return (
    <MotionMemberCard whileHover='hover'>
      <ProfileImage>
        <StyledImageArea>
          <StyledAspectRatio ratio={1 / 1}>
            <ImageHolder variants={imageVariants}>
              {imageUrl ? (
                <Image className='image' src={imageUrl} width={196} alt='member_image' />
              ) : (
                <>
                  <Responsive only='desktop'>
                    <IconUser style={{ width: 115, height: 115, color: `${colors.gray400}`, paddingTop: '10px' }} />
                  </Responsive>
                  <Responsive only='mobile'>
                    <IconUser style={{ width: 60, height: 60, color: `${colors.gray400}`, paddingTop: '10px' }} />
                  </Responsive>
                </>
              )}
            </ImageHolder>
          </StyledAspectRatio>
        </StyledImageArea>
      </ProfileImage>
      <MobileCoffeeChatBadge only='mobile'>
        {isCoffeeChatActivate && (
          <IconCoffeeWrapper>
            <IconCoffee />
          </IconCoffeeWrapper>
        )}
      </MobileCoffeeChatBadge>
      <ContentArea>
        <TitleBox>
          <Name typography='SUIT_18_SB'>{name}</Name>
          <Belongs typography='SUIT_12_SB'>{belongs}</Belongs>
        </TitleBox>
        <BadgesBox ref={badgeWrapperRef}>
          <Badges>
            {visibleBadges.map((badge, idx) => (
              <Badge ref={(el: HTMLDivElement) => (badgeRefs.current[idx] = el)} isActive={badge.isActive} key={idx}>
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
          {intro}
        </Intro>
      </ContentArea>
      <SideButtons>
        {isCoffeeChatActivate && <CoffeeChatButton onClick={onCoffeeChatButtonClick} receiver={name} />}
        {email && email.length > 0 && <MessageButton name={name} onClick={onMessage} />}
      </SideButtons>
    </MotionMemberCard>
  );
};

export default MemberCard;

const MotionMemberCard = styled(m.div)`
  display: grid;
  position: relative;
  flex-direction: column;
  grid:
    [row1-start] 'image' auto [row1-end]
    [row2-start] 'content' auto [row2-end]
    / 1fr;
  row-gap: 24px;
  column-gap: 16px;
  align-items: center;
  transition: box-shadow 0.3s;
  border-radius: 16px;
  background-color: ${colors.gray900};
  padding: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    grid:
      [row1-start] 'image content' 1fr [row1-end]
      / 80px 1fr;
    border-radius: 0;
    background-color: transparent;
    padding: 20px 0;

    &:hover {
      background-color: transparent;
    }
  }
`;

const StyledAspectRatio = styled(AspectRatio.Root)`
  width: 100%;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledImageArea = styled.div`
  transform: translateZ(0);
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 100%;
  max-width: 196px;
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

const ContentArea = styled.div`
  grid-area: content;
  width: 100%;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: unset;
  }
`;

const Image = styled(ResizedImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultImage = styled.img`
  width: 40%;
`;

const TitleBox = styled(m.div)`
  display: flex;
  align-items: center;
  height: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 28px;
  }
`;

const Name = styled(Text)`
  flex-shrink: 0;
  color: ${colors.gray30};
`;

const Belongs = styled(Text)`
  flex-grow: 1;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray300};
`;

const BadgesBox = styled.div`
  position: relative;
  margin-top: 8px;
  overflow-x: hidden;
`;

const Badges = styled.div`
  display: flex;
  gap: ${BADGE_GAP}px;
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

const Intro = styled(Text)`
  display: ${'-webkit-box'};
  margin-top: 16px;
  width: 100%;
  min-height: 60px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    min-height: 20px;
    font-size: 13px;
    font-weight: 600;
    -webkit-line-clamp: 1;
  }
`;

const SideButtons = styled.aside`
  display: flex;
  position: absolute;
  top: 17px;
  right: 19px;
  flex-direction: column;
  gap: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const IconCoffeeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  background-color: ${colors.success};
  padding-left: 1px;
  width: 24px;
  height: 24px;

  & > svg {
    width: 15.7px;
    height: 15.2px;
  }
`;

const MobileCoffeeChatBadge = styled(Responsive)`
  position: absolute;
  top: 22px;
`;
