import styled from '@emotion/styled';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC, SyntheticEvent } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import CoffeeChatButton from '@/components/members/main/MemberCard/CoffeeChatButton';
import MessageButton from '@/components/members/main/MemberCard/MessageButton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberCardProps {
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

const MemberCard: FC<MemberCardProps> = ({
  name,
  belongs,
  badges,
  intro,
  email,
  imageUrl,
  isCoffeeChatActivate,
  onMessage,
}) => {
  return (
    <MotionMemberCard whileHover='hover'>
      <StyledImageArea>
        <StyledAspectRatio ratio={1 / 1}>
          <ImageHolder variants={imageVariants}>
            {imageUrl ? (
              <Image className='image' src={imageUrl} width={235} alt='member_image' />
            ) : (
              <DefaultImage className='image' src='/icons/icon-member-default.svg' alt='default_member_image' />
            )}
          </ImageHolder>
        </StyledAspectRatio>
      </StyledImageArea>

      <ContentArea>
        <TitleBox>
          <Name typography='SUIT_18_SB'>{name}</Name>
          <Belongs typography='SUIT_11_M'>{belongs}</Belongs>
        </TitleBox>
        <BadgesBox>
          <Badges>
            {badges.map((badge, idx) => (
              <Badge typography='SUIT_11_M' key={idx}>
                {badge.isActive && <BadgeActiveDot />}
                {badge.content}
              </Badge>
            ))}
          </Badges>
          <DimShadow />
        </BadgesBox>
        <Intro typography='SUIT_12_M'>{intro}</Intro>
      </ContentArea>
      <SideButtons>
        {/* TODO: CoffeeChatButton에 커피챗 상세로 이동하는 onClick 넘겨주기 */}
        {isCoffeeChatActivate && <CoffeeChatButton />}
        {email && email.length > 0 && <MessageButton name={name} onClick={onMessage} />}
      </SideButtons>
    </MotionMemberCard>
  );
};

export default MemberCard;

const MotionMemberCard = styled(m.div)`
  display: grid;
  display: flex;
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
  padding: 29.5px 17.5px;

  @media ${MOBILE_MEDIA_QUERY} {
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
  grid-area: image;
`;

const StyledImageArea = styled.div`
  transform: translateZ(0);
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 180px;
  overflow: hidden;
`;

const ImageHolder = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
`;

const ContentArea = styled.div`
  grid-area: content;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: unset;
  }
`;

const Image = styled(ResizedImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const DefaultImage = styled.img`
  width: 40%;
`;

const TitleBox = styled(m.div)`
  display: flex;
  align-items: center;
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
  margin-top: 10px;
  overflow-x: hidden;
`;

const Badges = styled.div`
  display: flex;
  gap: 4px;
`;

const DimShadow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgb(0 0 0 / 0%) 0%, ${colors.gray800} 100%);
  width: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    background: linear-gradient(90deg, rgb(0 0 0 / 0%) 0%, ${colors.gray950} 100%);
  }
`;

const Badge = styled(Text)`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 6px 8px;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${colors.gray800};
    padding: 4px 6px;
    color: ${colors.gray100};
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: #cdf47c;
  width: 6px;
  height: 6px;
`;

const Intro = styled(Text)`
  display: ${'-webkit-box'};
  margin-top: 17px;
  width: 100%;
  min-height: 32px;
  overflow: hidden;
  color: ${colors.gray300};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    color: ${colors.gray600};
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
