import styled from '@emotion/styled';
import { FC } from 'react';

import { LATEST_GENERATION } from '@/constants/generation';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface CardProps {
  name: string;
  role: string;
  description: string;
  image?: string;
  generation: number; // TODO: 서버에서 내려준다면 isActiveGeneration 등으로 변경 가능
}

const Card: FC<CardProps> = ({ name, role, description, image, generation }) => {
  const isActiveGeneration = generation === LATEST_GENERATION;

  return (
    <StyledCard>
      <CardHeader>
        {isActiveGeneration && <ActiveGenerationBadge>{`${generation}기 활동중`}</ActiveGenerationBadge>}
        {image ? (
          <Image className='image' src={image} alt='member_image' />
        ) : (
          <DefaultImage className='image' src={'/icons/icon-member-default.svg'} alt='default_member_image' />
        )}
      </CardHeader>
      <CardContent>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <Description>{description}</Description>
      </CardContent>
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled.div`
  transition: background-color 0.3s;
  border-radius: 30px;
  background-color: ${colors.black80};
  cursor: pointer;
  width: 278px;

  &:hover {
    background-color: ${colors.black60};

    .image {
      transform: scale(1.1);
      transition: transform 0.3s;
    }
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
  height: 278px;
  overflow: hidden;
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
`;

const DefaultImage = styled.img`
  width: 67px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  padding: 19px 27px 30px;
`;

const Name = styled.h1`
  ${textStyles.SUIT_24_B};

  line-height: 24px;
  color: ${colors.gray10};
`;

const Role = styled.span`
  ${textStyles.SUIT_16_M};

  display: block;
  margin-top: 12px;
  line-height: 16px;
  color: ${colors.gray40};
`;

const Description = styled.span`
  ${textStyles.SUIT_16_M};

  display: block;
  margin-top: 20px;
  line-height: 16px;
  color: ${colors.gray80};
`;
