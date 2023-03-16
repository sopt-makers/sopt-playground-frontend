import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { Activity } from '@/api/members/type';
import { getProjectById } from '@/api/projects';
import { PROJECT_CATEGORY_LABEL } from '@/components/members/detail/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ActivityBadge: FC<Activity> = (activity) => {
  const [category, setCategory] = useState('');

  useEffect(() => {
    const getProjectCategory = async () => {
      if (activity.isProject) {
        const project = await getProjectById(activity.id.toString());
        setCategory(PROJECT_CATEGORY_LABEL[project.category]);
      }
    };

    getProjectCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container key={activity.id}>
      {category && <Category>{category}</Category>}
      {activity.team}
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
