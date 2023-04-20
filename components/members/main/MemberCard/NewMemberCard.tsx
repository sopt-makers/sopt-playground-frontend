import styled from '@emotion/styled';
import { FC } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { colors } from '@/styles/colors';
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

const MemberCard: FC<MemberCardProps> = ({ name, belongs, badges, intro, imageUrl }) => {
  return (
    <StyledMemberCard>
      <ImageArea>
        {imageUrl ? (
          <Image className='image' src={imageUrl} width={235} alt='member_image' />
        ) : (
          <DefaultImage
            className='image'
            src='/icons/icon-member-default.svg'
            alt='default_member_image'
            loading='lazy'
            decoding='async'
          />
        )}
      </ImageArea>
      <ContentArea>
        <TitleBox>
          <Name>{name}</Name>
          <Belongs>{belongs}</Belongs>
        </TitleBox>
        <Badges>
          {badges.map((badge, idx) => (
            <Badge key={idx}>
              {badge.isActive && <BadgeActiveDot />}
              {badge.content}
            </Badge>
          ))}
        </Badges>
        <Intro>{intro}</Intro>
      </ContentArea>
    </StyledMemberCard>
  );
};

export default MemberCard;

const StyledMemberCard = styled.div`
  display: grid;
  grid:
    [row1-start] 'image' auto [row1-end]
    [row2-start] 'content' auto [row2-end]
    / 1fr;
  align-items: center;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      [row1-start] 'image content' 1fr [row1-end]
      / auto 1fr;
  }
`;

const ImageArea = styled.div`
  grid-area: image;
  transform: translateZ(0);
  margin: 0 auto;
  max-width: 180px;
  max-height: 180px;
  clip-path: circle(50%);
`;

const ContentArea = styled.div`
  grid-area: content;
  margin-top: 24px;
  min-height: 120px;
`;

const Image = styled(ResizedImage)``;

const DefaultImage = styled.img`
  width: 56px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  color: ${colors.gray10};

  ${textStyles.SUIT_18_B}
`;

const Belongs = styled.span`
  margin-left: 5px;
  color: ${colors.gray60};

  ${textStyles.SUIT_12_M}
`;

const Badges = styled.div`
  display: flex;
  gap: 4px;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  margin-top: 10px;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 6px 6px 6px 8px;
  color: ${colors.gray30};

  ${textStyles.SUIT_12_M};
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: #cdf47c;
  width: 6px;
  height: 6px;
`;

const Intro = styled.p`
  margin-top: 16px;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};
`;
