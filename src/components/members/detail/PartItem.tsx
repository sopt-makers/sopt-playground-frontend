import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Tag } from '@sopt-makers/ui';
import Link from 'next/link';
import { FC } from 'react';

import ActivityBadge from '@/components/members/detail/ActivityBadge';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const NORMAL_PARTS = ['기획', '디자인', '서버', '안드로이드', '웹', 'iOS'];

type PartItemProps = {
  generation: string;
  part: string;
  teams?: string[];
  activities: { type: string; name: string; href: string }[];
};

const PartItem: FC<PartItemProps> = ({ generation, part, teams, activities }) => {
  const partLabel = `${part} ${NORMAL_PARTS.includes(part) ? '파트' : ''}`;
  const soptLogoSrc = Number(generation) < 12 ? '/icons/logo/time=1-11.svg' : `/icons/logo/time=${generation}.svg`;

  return (
    <Container>
      <Thumbnail>
        <img alt={`${generation}기 SOPT`} src={soptLogoSrc} />
      </Thumbnail>
      <Generation>{generation}기</Generation>
      <BelongArea>
        {partLabel}{' '}
        {teams?.map((team) => (
          <Tag key={`${partLabel}-${team}`} variant='primary'>
            {team}
          </Tag>
        ))}
      </BelongArea>
      <Badges>
        {activities.map((activity, idx) => (
          <Link key={idx} href={activity.href}>
            <ActivityBadge category={activity.type} name={activity.name} />
          </Link>
        ))}
      </Badges>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid:
    [row1-start] 'thumbnail generation belongs' 1fr [row1-end]
    [row2-start] 'thumbnail activities activities' 1fr [row2-end]
    / auto auto 1fr;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      [row1-start] 'thumbnail generation belongs' 1fr [row1-end]
      [row2-start] 'activities activities activities' 1fr [row2-end]
      / auto auto 1fr;
  }
`;

const Thumbnail = styled.div`
  display: flex;
  grid-area: thumbnail;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  border-radius: 14px;
  background: #000;
  width: 84px;
  height: 84px;

  svg {
    width: 83px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 14px;
    width: 60px;
    height: 60px;
  }
`;

const Generation = styled.div`
  grid-area: generation;
  margin-right: 12px;
  color: ${colors.white};

  ${textStyles.SUIT_18_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B}
  }
`;

const BelongArea = styled.div`
  display: flex;
  grid-area: belongs;
  gap: 8px;
  align-items: center;
  color: ${colors.gray100};

  ${textStyles.SUIT_18_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M}
  }
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: activities;
  gap: 8px;
  align-self: start;
  margin-top: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;

export default PartItem;
