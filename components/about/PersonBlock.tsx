import styled from '@emotion/styled';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface PersonBlockProps {
  name: string;
  position: string;
  imageUrl?: string;
}

const PersonBlock: FC<PersonBlockProps> = ({ name, position, imageUrl }) => {
  return (
    <StyledPersonBlock>
      <ImageBox>{imageUrl ? <StyledImage src={imageUrl} alt={`${name}`} /> : <EmptyImage />}</ImageBox>
      <ContentBox>
        <Name>{name}</Name>
        <Position>{position}</Position>
      </ContentBox>
    </StyledPersonBlock>
  );
};

export default PersonBlock;

const StyledPersonBlock = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  clip-path: circle(50%);
`;

const EmptyImage = styled.div`
  background-color: ${colors.gray60};
  width: 48px;
  height: 48px;
`;

const StyledImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const Name = styled.h3`
  ${textStyles.SUIT_18_M};
`;

const Position = styled.p`
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};
`;
