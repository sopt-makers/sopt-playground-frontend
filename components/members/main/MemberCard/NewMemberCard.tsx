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

const NewMemberCard: FC<MemberCardProps> = ({ name, belongs, badges, intro, imageUrl }) => {
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
    </StyledMemberCard>
  );
};

export default NewMemberCard;

const StyledMemberCard = styled.div`
  display: grid;
  grid:
    [row1-start] 'image' auto [row1-end]
    [row2-start] 'content' auto [row2-end]
    / 1fr;
  align-items: center;
  column-gap: 16px;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 24px;
  row-gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      [row1-start] 'image content' 1fr [row1-end]
      / auto 1fr;
    border-radius: 0;
    background-color: transparent;
    padding: 20px;
  }
`;

const ImageArea = styled.div`
  display: flex;
  grid-area: image;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
  margin: 0 auto;
  max-width: 180px;
  height: 180px;
  clip-path: circle(50%);

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 80px;
    height: 80px;
  }
`;

const ContentArea = styled.div`
  grid-area: content;
  min-height: 120px;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: unset;
  }
`;

const Image = styled(ResizedImage)``;

const DefaultImage = styled.img``;

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

const BadgesBox = styled.div`
  margin-top: 10px;
  overflow-x: hidden;
`;

const Badges = styled.div`
  display: flex;
  gap: 4px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
  }
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 6px 8px;
  color: ${colors.gray30};

  ${textStyles.SUIT_11_M};

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${colors.black80};
    padding: 4px 6px;
    color: ${colors.gray30};

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
  margin-top: 16px;
  color: ${colors.gray60};

  ${textStyles.SUIT_12_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    color: ${colors.gray100};
  }
`;
