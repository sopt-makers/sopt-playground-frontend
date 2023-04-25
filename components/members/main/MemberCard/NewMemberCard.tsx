import styled from '@emotion/styled';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { m } from 'framer-motion';
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
    <MotionMemberCard initial='init' whileHover='hover' whileTap='press' variants={variants.card}>
      <StyledAspectRatio ratio={1 / 1}>
        <MotionImageArea variants={variants.image}>
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
        </MotionImageArea>
      </StyledAspectRatio>
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
          <DimShadow />
        </BadgesBox>
        <Intro>{intro}</Intro>
      </ContentArea>
    </MotionMemberCard>
  );
};

export default NewMemberCard;

const variants = {
  card: {
    init: {
      scale: 1,
    },
    hover: {
      scale: 1,
    },
    press: {
      scale: 0.96,
    },
  },
  image: {
    init: {
      borderRadius: '50%',
    },
    hover: {
      borderRadius: '16px',
    },
  },
};

const MotionMemberCard = styled(m.div)`
  display: grid;
  grid:
    [row1-start] 'image' auto [row1-end]
    [row2-start] 'content' auto [row2-end]
    / 1fr;
  align-items: center;
  column-gap: 16px;
  transition: box-shadow 0.3s;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 24px;
  row-gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      [row1-start] 'image content' 1fr [row1-end]
      / 80px 1fr;
    border-radius: 0;
    background-color: transparent;
    padding: 20px;
  }
`;

const StyledAspectRatio = styled(AspectRatio.Root)`
  grid-area: image;
`;

const MotionImageArea = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ContentArea = styled.div`
  grid-area: content;
  min-height: 120px;

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
  background: linear-gradient(90deg, rgb(0 0 0 / 0%) 0%, ${colors.black90} 100%);
  width: 20px;
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
  display: ${'-webkit-box'};
  margin-top: 16px;
  width: 100%;
  overflow: hidden;
  color: ${colors.gray60};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${textStyles.SUIT_12_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    color: ${colors.gray100};
    -webkit-line-clamp: 1;
  }
`;
