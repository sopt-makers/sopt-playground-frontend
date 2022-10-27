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
        <ActiveGenerationBadge>{isActiveGeneration && `${generation}기 활동중`}</ActiveGenerationBadge>
        <Image className='image' src={image ?? '/icons/icon-member-default.svg'} alt='member_image' />
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
  transition: background-color 0.3s transform 0.3s;
  border-radius: 30px;
  background-color: ${colors.black80};
  cursor: pointer;
  width: 278px;

  &:hover {
    background-color: ${colors.black60};

    .image {
      transform: scale(1.2);
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
`;

const ActiveGenerationBadge = styled.div`
  position: absolute;
  top: 17px;
  left: 17px;
  border-radius: 33px;
  background-color: ${colors.black100};
  padding: 10px 14.5px;

  ${textStyles.SUIT_14_M}
`;

const Image = styled.img`
  width: 67px;
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
