import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconPlus } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import Text from '@/components/common/Text';
import ActivityBadge from '@/components/members/detail/ActivityBadge';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const NORMAL_PARTS = ['기획', '디자인', '서버', '안드로이드', '웹', 'iOS'];

type PartItemProps = {
  generation: string;
  part: string;
  teams?: string[];
  activities: { type: string; name: string; href: string }[];
  isMine?: boolean;
};

const PartItem: FC<PartItemProps> = ({ generation, part, teams, activities, isMine }) => {
  const partLabel = `${part} ${NORMAL_PARTS.includes(part) ? '파트' : teams?.includes('메이커스') ? '챕터' : ''}`;
  const soptLogoSrc = Number(generation) < 12 ? '/icons/logo/time=1-11.svg' : `/icons/logo/time=${generation}.svg`;
  const logoSrc = teams?.includes('메이커스') ? '/icons/icon-makers-logo.svg' : soptLogoSrc;

  const hasActivities = !(activities.length === 0 && !isMine);
  return (
    <Container hasActivities={hasActivities}>
      <Thumbnail>
        <img alt={`${generation}기 SOPT`} src={logoSrc} />
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
      {hasActivities && (
        <Badges>
          {activities.map((activity, idx) => (
            <Link key={idx} href={activity.href}>
              <ActivityBadge category={activity.type} name={activity.name} />
            </Link>
          ))}
          {isMine && activities.length === 0 && (
            <Link href={playgroundLink.projectUpload()}>
              <AddProject typography='SUIT_13_M'>
                <StyledIconPlus />
                프로젝트 추가하기
              </AddProject>
            </Link>
          )}
        </Badges>
      )}
    </Container>
  );
};

const Container = styled.div<{ hasActivities: boolean }>`
  display: grid;
  grid-template-areas:
    'thumbnail generation belongs'
    ${({ hasActivities }) => hasActivities && "'thumbnail activities activities'"};
  grid-template-columns: auto auto 1fr;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-areas:
      'thumbnail generation belongs'
      ${({ hasActivities }) => hasActivities && "'activities activities activities'"};
    grid-template-columns: auto auto 1fr;
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
  margin-top: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const AddProject = styled(Text)`
  display: flex;
  gap: 6px;
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

const StyledIconPlus = styled(IconPlus)`
  width: 14px;
  height: 14px;
`;

export default PartItem;
