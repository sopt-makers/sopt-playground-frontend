import styled from '@emotion/styled';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ActivityBadgeProps {
  category?: string;
  name: string;
}

const ActivityBadge: FC<ActivityBadgeProps> = ({ category, name }) => {
  return <Container>{`${category} ${name}`}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  border-radius: 13px;
  background-color: ${colors.purple100};
  padding: 6px 14px;
  line-height: 100%;
  letter-spacing: -0.01em;

  ${textStyles.SUIT_14_M}

  &:hover {
    background-color: ${colors.purple80};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

export default ActivityBadge;
