import styled from '@emotion/styled';
import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import ActivityBadge from '@/components/members/detail/ActivityBadge';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const NORMAL_PARTS = ['기획', '디자인', '서버', '안드로이드', '웹', 'iOS'];

type PartItemProps = {
  generation: number;
  part: string;
  teams?: string[];
  activities: { type: string; name: string }[];
};

const PartItem: FC<PartItemProps> = ({ generation, part, teams, activities }) => {
  const partLabel = `${part} ${NORMAL_PARTS.includes(part) ? '파트' : ''}`;
  const soptLogoSrc = Number(generation) < 12 ? '/icons/logo/time=1-11.svg' : `/icons/logo/time=${generation}.svg`;

  return (
    <>
      <Responsive only='desktop'>
        <Container>
          <Thumbnail>
            <img alt={`${generation}기 SOPT`} src={soptLogoSrc} />
          </Thumbnail>
          <Contents>
            <TitleArea>
              <Generation>
                {generation}기 {teams?.map((team) => `| ${team}`)}
              </Generation>
              <BelongArea>{partLabel}</BelongArea>
            </TitleArea>
            <Badges>
              {activities.map((activity, idx) => (
                <ActivityBadge key={idx} category={activity.type}>
                  {activity.name}
                </ActivityBadge>
              ))}
            </Badges>
          </Contents>
        </Container>
      </Responsive>
      <Responsive only='mobile'>
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
              <div className='part'>{partLabel}</div>
            </Title>
          </Contents>
          <Badges></Badges>
        </Container>
      </Responsive>
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

const TitleArea = styled.div``;

const Generation = styled.div`
  color: ${colors.white};

  ${textStyles.SUIT_18_B}
`;

const BelongArea = styled.div`
  color: ${colors.gray30};

  ${textStyles.SUIT_18_M}
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
