import type {
  MemberRole,
  ProjectCategory,
  ProjectDetail,
  ProjectInput,
  ServiceType,
} from '@/api/endpoint_LEGACY/projects/type';
import { DEFAULT_IMAGE_URL } from '@/components/projects/form/constants';
import { ProjectFormType } from '@/components/projects/form/schema';
import { convertPeriodFormat, convertPeriodFormatReverse } from '@/components/projects/upload/utils';

export const convertToProjectData = (formData: ProjectFormType, writerId: number): ProjectInput => ({
  name: formData.name,
  generation: formData.generation ? Number(formData.generation) : undefined,
  category: formData.category as ProjectCategory,
  detail: formData.detail,
  summary: formData.summary,
  serviceType: formData.serviceType as ServiceType[],
  startAt: convertPeriodFormat(formData.period.startAt),
  ...(formData.period.endAt ? { endAt: convertPeriodFormat(formData.period.endAt) } : {}),
  isAvailable: formData.status.isAvailable,
  isFounding: formData.status.isFounding,
  images: formData.projectImages.map(({ imageUrl }) => imageUrl).filter((image) => image !== DEFAULT_IMAGE_URL),
  logoImage: formData.logoImage,
  thumbnailImage: formData.thumbnailImage,
  members: [
    ...formData.members.map((member) => ({
      ...member,
      memberId: Number(member.memberId),
      memberRole: member.memberRole as MemberRole,
      isTeamMember: true,
    })),
    ...formData.releaseMembers.map((releasedMember) => ({
      ...releasedMember,
      memberId: Number(releasedMember.memberId),
      memberRole: releasedMember.memberRole as MemberRole,
      isTeamMember: false,
    })),
  ],
  links: formData.links,
  writerId,
});

export const convertProjectToFormType = (projectData: ProjectDetail): ProjectFormType => {
  return {
    name: projectData.name,
    generation: `${projectData?.generation}`,
    category: projectData.category,
    detail: projectData.detail,
    summary: projectData.summary,
    serviceType: projectData.serviceType as [string, ...string[]],
    period: {
      startAt: convertPeriodFormatReverse(projectData.startAt),
      endAt: projectData.endAt ? convertPeriodFormatReverse(projectData.endAt) : null,
    },
    status: {
      isAvailable: projectData.isAvailable,
      isFounding: projectData.isFounding,
    },
    projectImages: [...projectData.images.map((image) => ({ imageUrl: image })), { imageUrl: DEFAULT_IMAGE_URL }],
    logoImage: projectData.logoImage,
    thumbnailImage: projectData.thumbnailImage,
    members: projectData.members
      .filter((member) => member.isTeamMember)
      .map((member) => convertMemberToMemberFormType(member)),
    releaseMembers: projectData.members
      .filter((member) => !member.isTeamMember)
      .map((member) => convertMemberToMemberFormType(member)),
    links: projectData.links,
  };
};

const convertMemberToMemberFormType = (member: ProjectDetail['members'][number]) => {
  return {
    memberId: `${member.memberId}`,
    memberRole: member.memberRole,
    memberDescription: member.memberDescription,
  };
};
