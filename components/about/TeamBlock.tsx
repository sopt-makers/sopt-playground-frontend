import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface TeamBlockProps {
  title: string;
  description: string;
  children: ReactNode;
}

const TeamBlock: FC<TeamBlockProps> = ({ title, description, children }) => {
  return (
    <StyledTeamBlock>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ChildrenBox>{children}</ChildrenBox>
    </StyledTeamBlock>
  );
};

export default TeamBlock;

const StyledTeamBlock = styled.div``;

const Title = styled.h2`
  ${textStyles.SUIT_24_B};
`;

const Description = styled.p`
  ${textStyles.SUIT_16_M};

  margin-top: 4px;
  color: ${colors.gray60};
`;

const ChildrenBox = styled.div`
  margin-top: 24px;
`;
