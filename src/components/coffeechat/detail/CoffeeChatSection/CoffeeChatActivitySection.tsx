import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { playgroundLink } from 'playground-common/export';

import { SoptActivity } from '@/api/endpoint_LEGACY/members/type';
import { isProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import PartItem from '@/components/members/detail/PartItem';
import { Category } from '@/components/projects/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SoptActivitySectionProps {
  soptActivities: SoptActivity[];
}

export default function CoffeeChatActivitySection({ soptActivities }: SoptActivitySectionProps) {
  return (
    <>
      {soptActivities.length > 0 ? (
        <>
          <SoptActivityTitle>SOPT 활동 정보</SoptActivityTitle>
          <MemberDetailSection style={{ gap: '34px' }}>
            {soptActivities.map(({ generation, part, projects, team }, idx) => (
              <PartItem
                key={idx}
                generation={`${generation}`}
                part={part}
                activities={projects.map((project) => ({
                  name: project.name,
                  type: convertProjectType(project.category) ?? '',
                  href: playgroundLink.projectDetail(project.id),
                }))}
                teams={team !== null ? [team] : []}
              />
            ))}
          </MemberDetailSection>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function convertProjectType(typeCode: Category) {
  if (!isProjectCategory(typeCode)) throw new Error('project category type error');

  switch (typeCode) {
    case 'APPJAM':
      return '앱잼';
    case 'ETC':
      return '사이드 프로젝트';
    case 'JOINTSEMINAR':
      return '합동 세미나';
    case 'SOPKATHON':
      return '솝커톤';
    case 'SOPTERM':
      return '솝텀 프로젝트';
    case 'STUDY':
      return '스터디';
    default:
      const exhaustiveCheck: never = typeCode;
      throw new Error(`project category ${exhaustiveCheck} type error`);
  }
}
const SoptActivityTitle = styled.h2`
  margin: 60px 0 32px;
  color: ${colors.white};
  ${fonts.HEADING_28_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 40px 0 20px;

    ${fonts.HEADING_20_B};
  }
`;
