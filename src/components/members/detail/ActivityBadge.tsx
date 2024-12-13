import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ActivityBadgeProps {
  category?: string;
  name: string;
}

const ActivityBadge: FC<ActivityBadgeProps> = ({ category, name }) => {
  return (
    <Container>
      <Category typography='SUIT_13_M'>{category}</Category>
      <Text typography='SUIT_13_M'>{name}</Text>
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

const Category = styled(Text)`
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
