import styled from '@emotion/styled';
import AddIcon from 'public/icons/icon-add.svg';
import { FC, ReactChild } from 'react';

import { Activity } from '@/api/members/type';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type PartItemProps = {
  cardinalActivities: Activity[];
  generation: string;
  part: string;
  imgSrc?: string;
};

const PartItem: FC<PartItemProps> = (project) => {
  const { cardinalActivities, generation, part, imgSrc } = project;
  console.log('cardinalActivities', cardinalActivities);
  return (
    <>
      <Container className='pc-only'>
        <Thumbnail />
        <Contents>
          <Title>
            <div className='year'>{generation}기</div>
            <div className='part'>{part} 파트</div>
          </Title>
          <Badges>
            {cardinalActivities.map((activity) => (
              <Badge key={activity.id}>{activity.team}</Badge>
            ))}
          </Badges>
        </Contents>
      </Container>

      <Container className='mobile-only'>
        <Contents>
          <Thumbnail />
          <Title>
            <div className='year'>{generation}</div>
            <div className='part'>{part}</div>
          </Title>
        </Contents>
        <Badges>
          {cardinalActivities.map((activity) => (
            <Badge key={activity.id}>{activity.team}</Badge>
          ))}
        </Badges>
      </Container>
    </>
  );
};

const EmptyBadge: FC<{ children: ReactChild }> = ({ children }) => {
  return (
    <EmptyBadgeContainer>
      <AddIcon />
      {children}
    </EmptyBadgeContainer>
  );
};

const Container = styled.div`
  display: flex;
  gap: 29px;
  align-items: center;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const Thumbnail = styled.div`
  border-radius: 14px;
  background: #000;
  width: 84px;
  height: 84px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 60px;
    height: 60px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 11px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 18px;

  .year {
    color: #fff;
    font-weight: 700;
  }

  .part {
    color: #ced1d2;
    font-weight: 500;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
    margin-left: 14px;
    font-size: 16px;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-wrap: wrap;
    gap: 12px 8px;
    margin-top: 12px;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px;
  background: #8040ff;
  padding: 6px 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

const EmptyBadgeContainer = styled(Badge)`
  border: 1px dashed #606265;
  border-radius: 13px;
  background: #2c2d2e;
  cursor: pointer;
`;

export default PartItem;
