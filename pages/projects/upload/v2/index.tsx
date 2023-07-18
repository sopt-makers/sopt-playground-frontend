import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import type { MemberRole, ProjectCategory, ServiceType } from '@/api/endpoint_LEGACY/projects/type';
import AuthRequired from '@/components/auth/AuthRequired';
import { Confirm } from '@/components/common/Modal/Confirm';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { DEFAULT_IMAGE_URL } from '@/components/projects/form/constants';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/form/schema';
import useCreateProjectMutation from '@/components/projects/upload/hooks/useCreateProjectMutation';
import { getProjectListQueryKey } from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { convertPeriodFormat } from '@/components/projects/upload/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const ProjectUploadPage = () => {
  const { mutate: createProjectMutate } = useCreateProjectMutation();
  const { data: myProfileData } = useGetMemberOfMe();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { logSubmitEvent } = useEventLogger();

  const handleSubmit = async (formData: ProjectFormType) => {
    const notify = await Confirm({
      title: '알림',
      content: '프로젝트를 업로드 하시겠습니까?',
    });
    if (notify && myProfileData) {
      createProjectMutate(
        {
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
          writerId: myProfileData?.id,
        },
        {
          onSuccess: () => {
            toast.show({ message: '프로젝트가 성공적으로 업로드 되었습니다.' });
            router.push(playgroundLink.projectList());
            queryClient.invalidateQueries([getProjectListQueryKey]);
            logSubmitEvent('projectUpload', {
              writerId: String(myProfileData.id),
            });
          },
        },
      );
    }
  };

  return (
    <AuthRequired>
      <Container>
        <ProjectForm onSubmit={handleSubmit} submitButtonContent='프로젝트 등록하기' />
      </Container>
    </AuthRequired>
  );
};

export default ProjectUploadPage;

setLayout(ProjectUploadPage, 'header');

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 98px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;
