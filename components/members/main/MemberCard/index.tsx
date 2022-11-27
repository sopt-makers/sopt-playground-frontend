import styled from '@emotion/styled';
import { FC } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { LATEST_GENERATION } from '@/constants/generation';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberCardProps {
  name: string;
  part: string;
  introduction: string;
  image?: string;
  isActiveGeneration: boolean;
}

const MemberCard: FC<MemberCardProps> = ({ name, part, introduction, image, isActiveGeneration }) => {
  return (
    <StyledCard>
      <CardHeader>
        {isActiveGeneration && <ActiveGenerationBadge>{`${LATEST_GENERATION}기 활동중`}</ActiveGenerationBadge>}
        {image ? (
          <Image className='image' src={image} width={235 * 2} alt='member_image' />
        ) : (
          <DefaultImage
            className='image'
            src='/icons/icon-member-default.svg'
            alt='default_member_image'
            loading='lazy'
            decoding='async'
          />
        )}
      </CardHeader>
      <CardContent>
        <Name>{name}</Name>
        <Part>{part}</Part>
        <Introduction>{introduction}</Introduction>
      </CardContent>
    </StyledCard>
  );
};

export default MemberCard;

const StyledCard = styled.div`
  transition: background-color 0.3s;
  border-radius: 30px;
  background-color: ${colors.black80};
  cursor: pointer;
  width: 235px;
  height: 370px;

  &:hover {
    background-color: ${colors.black60};

    .image {
      transform: scale(1.1);
      transition: transform 0.3s;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 163px;
    height: 272px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 30px 30px 0 0;
  background-color: rgb(255 255 255 / 5%);
  width: 100%;
  height: 234px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px 20px 0 0;
    height: 163px;
  }
`;

const ActiveGenerationBadge = styled.div`
  position: absolute;
  top: 17px;
  left: 17px;
  z-index: 1;
  border-radius: 33px;
  background-color: ${colors.black100};
  padding: 10px 14.5px;

  ${textStyles.SUIT_14_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M}

    top: 8px;
    left: 8px;
  }
`;

const DefaultImage = styled.img`
  width: 56px;
`;

const Image = styled(ResizedImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 19px 27px 30px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 13px 19px 18px;
  }
`;

const Name = styled.h1`
  ${textStyles.SUIT_20_B};

  line-height: 24px;
  color: ${colors.gray10};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_18_SB}
  }
`;

const Part = styled.span`
  ${textStyles.SUIT_14_M};

  display: block;
  margin-top: 12px;
  line-height: 16px;
  color: ${colors.gray40};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
  }
`;

const Introduction = styled.span`
  ${textStyles.SUIT_14_M};

  display: block;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  white-space: nowrap;
  color: ${colors.gray80};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 14px;
  }
`;
