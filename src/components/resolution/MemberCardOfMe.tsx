import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberCardProps {
  name: string;
  belongs: string;
  intro: string;
  badges: {
    content: string;
    isActive: boolean;
  }[];
  imageUrl?: string;
}

const MemberCardOfMe: FC<MemberCardProps> = ({ name, belongs, badges, intro, imageUrl }) => {
  return (
    <MemberCard>
      <StyledImageArea>
        <ImageHolder>
          {imageUrl ? (
            <Image className='image' src={imageUrl} width={180} alt='member_image' />
          ) : (
            <DefaultImage className='image' src='/icons/icon-member-default.svg' alt='default_member_image' />
          )}
        </ImageHolder>
      </StyledImageArea>
      <ContentArea>
        <TitleBox>
          <Name>{name}</Name>
          <Belongs>{belongs}</Belongs>
        </TitleBox>
        <BadgesBox>
          <Badges>
            {badges.map((badge, idx) => (
              <Badge key={idx}>
                {badge.isActive && <BadgeActiveDot />}
                {badge.content}
              </Badge>
            ))}
          </Badges>
        </BadgesBox>
        <Intro>{intro}</Intro>
      </ContentArea>
    </MemberCard>
  );
};

export default MemberCardOfMe;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
  border: 0.5px solid rgb(255 255 255 / 8%);
  border-radius: 16px;
  background-color: #17181b;
  padding: 30.5px 24px;
  width: 303px;
`;

const StyledImageArea = styled.div`
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 180px;
  height: 180px;
  overflow: hidden;
`;

const ImageHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 180px;
  height: 180px;
`;

const ContentArea = styled.div`
  margin-top: 24px;
  width: 100%;
  min-height: 101px;
`;

const Image = styled(ResizedImage)`
  object-fit: cover;
`;

const DefaultImage = styled.img`
  width: 40%;
`;

const TitleBox = styled(m.div)`
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  flex-shrink: 0;
  color: ${colors.gray30};

  ${textStyles.SUIT_18_B}
`;

const Belongs = styled.span`
  flex-grow: 1;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray300};

  ${textStyles.SUIT_12_M}
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

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 6px 8px;
  color: ${colors.gray100};

  ${textStyles.SUIT_11_M};

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${colors.gray800};
    padding: 4px 6px;
    color: ${colors.gray100};

    ${textStyles.SUIT_11_M};
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: #cdf47c;
  width: 6px;
  height: 6px;
`;

const Intro = styled.p`
  display: ${'-webkit-box'};
  margin-top: 16px;
  width: 100%;
  overflow: hidden;
  color: ${colors.gray300};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${textStyles.SUIT_12_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    color: ${colors.gray600};
    -webkit-line-clamp: 1;
  }
`;
