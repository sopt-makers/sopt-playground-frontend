import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ActivityBadgeProps {
  category?: string;
  name: string;
}

const ActivityBadge: FC<ActivityBadgeProps> = ({ category, name }) => {
  return (
    <Container>
      <Category>{category}</Category>
      {name}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 28px;
  background-color: ${colors.gray700};
  padding: 6px 14px;

  &:hover {
    background-color: ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;

  ::after {
    display: inline-block;
    margin: 0 10px;
    background-color: ${colors.gray400};
    width: 1px;
    height: 14px;
    content: '';
  }
`;

export default ActivityBadge;
