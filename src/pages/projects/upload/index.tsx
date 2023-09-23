import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import { Confirm } from '@/components/common/Modal/Confirm';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import ProjectForm from '@/components/projects/upload/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/upload/form/schema';
import useCreateProjectMutation from '@/components/projects/upload/hooks/useCreateProjectMutation';
import { getProjectListQueryKey } from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { convertToProjectData } from '@/components/projects/utils';
import { ORIGIN } from '@/constants/env';
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
      createProjectMutate(convertToProjectData(formData, myProfileData.id), {
        onSuccess: () => {
          toast.show({ message: '프로젝트를 성공적으로 업로드 했어요.' });
          queryClient.invalidateQueries(getProjectListQueryKey());
          router.push(playgroundLink.projectList());
          logSubmitEvent('projectUpload', {
            writerId: String(myProfileData.id),
          });
        },
      });
    }
  };

  return (
    <AuthRequired>
      <Head>
        <meta key='og:title' property='og:title' content='SOPT Playground' />
        <meta key='og:description' property='og:description' content='솝트와 연결되고 싶으신가요?' />
        <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
      </Head>
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
