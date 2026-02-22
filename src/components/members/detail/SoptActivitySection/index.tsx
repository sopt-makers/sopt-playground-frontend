import { playgroundLink } from 'playground-common/export';

import { SoptActivity } from '@/api/endpoint_LEGACY/members/type';
import { isProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import PartItem from '@/components/members/detail/PartItem';
import { Category } from '@/components/projects/types';

interface SoptActivitySectionProps {
  soptActivities: SoptActivity[];
  isMine?: boolean;
}

export default function SoptActivitySection({ soptActivities, isMine }: SoptActivitySectionProps) {
  return (
    <MemberDetailSection>
      {soptActivities.map(({ generation, part, projects, team }, idx) => (
        <PartItem
          key={`${generation}-${part}-${team ?? ''}-${idx}`}
          generation={`${generation}`}
          part={part}
          activities={projects.map((project) => ({
            name: project.name,
            type: convertProjectType(project.category) ?? '',
            href: playgroundLink.projectDetail(project.id),
          }))}
          teams={team !== null ? [team] : []}
          isMine={isMine}
        />
      ))}
    </MemberDetailSection>
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
