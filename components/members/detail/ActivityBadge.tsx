import styled from '@emotion/styled';
import { FC } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ActivityBadgeProps {
  category?: string;
  children: string;
}

const ActivityBadge: FC<ActivityBadgeProps> = ({ category, children }) => {
  return (
    <Container>
      {category && <Category>{category}</Category>}
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px;
  background: #8040ff;
  padding: 6px 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;
  font-weight: 500;
  ${textStyles.SUIT_14_M}
  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

const Category = styled.span`
  ${textStyles.SUIT_14_B}

  margin-right: 4px;
`;

export default ActivityBadge;
