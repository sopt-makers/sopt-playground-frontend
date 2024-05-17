import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import useConfirm from '@/components/common/Modal/useConfirm';
import useSlideUp from '@/components/common/SlideUp/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import ProjectForm from '@/components/projects/upload/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/upload/form/schema';
import useCreateProjectMutation from '@/components/projects/upload/hooks/useCreateProjectMutation';
import { getProjectListQueryKey } from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { convertToProjectData } from '@/components/projects/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const ProjectUploadPage = () => {
  const { mutate: createProjectMutate } = useCreateProjectMutation();
  const { data: myProfileData } = useGetMemberOfMe();
  const router = useRouter();
  const slideUp = useSlideUp();
  const queryClient = useQueryClient();
  const { logSubmitEvent } = useEventLogger();
  const { confirm } = useConfirm();

  const handleSubmit = async (formData: ProjectFormType) => {
    const notify = await confirm({
      title: '알림',
      description: '프로젝트를 업로드 하시겠습니까?',
      okButtonText: '업로드',
      cancelButtonText: '취소',
    });
    if (notify && myProfileData) {
      createProjectMutate(convertToProjectData(formData, myProfileData.id), {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: getProjectListQueryKey() });

          logSubmitEvent('projectUpload', {
            writerId: String(myProfileData.id),
          });
          slideUp.show({
            message: '프로젝트를 하면서 배우고 느낀 점을 SOPT 회원들에게 공유해보세요.',
            buttonText: '공유하러 가기',
            action: async () => {
              slideUp.close();
              await router.push(playgroundLink.feedUpload());
            },
            status: 'success',
          });
          await router.push(playgroundLink.projectList());
        },
      });
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
