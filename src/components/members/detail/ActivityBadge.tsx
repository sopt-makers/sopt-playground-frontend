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
  return <Container>{`${category} ${name}`}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  border-radius: 13px;
  background-color: ${colors.black60};
  padding: 6px 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_M}

  &:hover {
    background-color: ${colors.black40};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

export default ActivityBadge;
