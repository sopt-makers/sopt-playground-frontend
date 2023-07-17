import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { getProjectById } from '@/api/endpoint_LEGACY/projects';
import AuthRequired from '@/components/auth/AuthRequired';
import { Alert } from '@/components/common/Modal/Alert';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/form/schema';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

interface ProjectEditProps {
  projectId: string;
}
const ProjectEdit: FC<ProjectEditProps> = ({ projectId }) => {
  const { data: projectData } = useQuery(['getProjectById', projectId], () => getProjectById(projectId));
  const { data: myProfileData } = useGetMemberOfMe();
  const router = useRouter();

  useEffect(() => {
    if (myProfileData && projectData && myProfileData?.id !== projectData?.writerId) {
      Alert({
        title: '알림',
        content: '해당 프로젝트를 작성한 유저만 접근 가능한 페이지 입니다.',
        onClose: () => router.push(playgroundLink.projectList()),
      });
    }
  }, [myProfileData, projectData, router]);

  if (!projectData) {
    return null;
  }

  const defaultValues: ProjectFormType = {
    name: projectData.name,
    generation: `${projectData?.generation}`,
    category: projectData.category,
    detail: projectData.detail,
    summary: projectData.summary,
    serviceType: projectData.serviceType as [string, ...string[]],
    period: {
      startAt: projectData.startAt,
      endAt: projectData.endAt ? projectData.endAt : null,
    },
    status: {
      isAvailable: projectData.isAvailable,
      isFounding: projectData.isFounding,
    },
    projectImages: projectData?.images.map((image) => ({ imageUrl: image })) || [],
    logoImage: projectData.logoImage,
    thumbnailImage: projectData.thumbnailImage,
    members: projectData.members
      .filter((member) => member.isTeamMember)
      .map((member) => ({
        memberId: member.memberId.toString(),
        memberRole: member.memberRole,
        memberDescription: member.memberDescription,
      })),
    releaseMembers: projectData.members
      .filter((member) => !member.isTeamMember)
      .map((member) => ({
        memberId: member.memberId.toString(),
        memberRole: member.memberRole,
        memberDescription: member.memberDescription,
      })),
    links: projectData.links,
  };

  return (
    <AuthRequired>
      <Container>
        <ProjectForm hideProgress submitButtonContent='프로젝트 수정하기' defaultValues={defaultValues} />
      </Container>
    </AuthRequired>
  );
};

export default ProjectEdit;

setLayout(ProjectEdit, 'header');

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 98px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;
