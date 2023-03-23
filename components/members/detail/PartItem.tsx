import styled from '@emotion/styled';
import { FC } from 'react';

import { Activity } from '@/api/members/type';
import ActivityBadge from '@/components/members/detail/ActivityBadge';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const getPartLabel = (part: string) => {
  const NORMAL_PARTS = ['기획', '디자인', '서버', '안드로이드', '웹', 'iOS'];
  return `${part} ${NORMAL_PARTS.includes(part) ? '파트' : ''}`;
};

type PartItemProps = {
  cardinalActivities: Activity[];
  generation: string;
  part: string;
  imgSrc?: string;
};

const PartItem: FC<PartItemProps> = (project) => {
  const { cardinalActivities, generation, part } = project;

  return (
    <>
      <Container className='pc-only'>
        <Thumbnail>
          {Number(generation) < 12 ? (
            <img alt='generation-logo' src='/icons/logo/time=1-11.svg' />
          ) : (
            <img alt='generation-logo' src={`/icons/logo/time=${generation}.svg`} />
          )}
        </Thumbnail>
        <Contents>
          <Title>
            <div className='year'>{generation}기</div>
            <div className='part'>{getPartLabel(part)}</div>
          </Title>
          <Badges>
            {cardinalActivities.map(
              (activity) => activity.team !== '해당 없음' && <ActivityBadge key={activity.id} {...activity} />,
            )}
          </Badges>
        </Contents>
      </Container>

      <Container className='mobile-only'>
        <Contents>
          <Thumbnail>
            {Number(generation) < 12 ? (
              <img alt='generation-logo' src='/icons/logo/time=1-11.svg' />
            ) : (
              <img alt='generation-logo' src={`/icons/logo/time=${generation}.svg`} />
            )}
          </Thumbnail>
          <Title>
            <div className='year'>{generation}기</div>
            <div className='part'>{getPartLabel(part)}</div>
          </Title>
        </Contents>
        <Badges>
          {cardinalActivities.map(
            (activity) => activity.team !== '해당 없음' && <ActivityBadge key={activity.id} {...activity} />,
          )}
        </Badges>
      </Container>
    </>
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #000;
  width: 84px;
  height: 84px;

  svg {
    width: 83px;
  }

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

export default PartItem;
