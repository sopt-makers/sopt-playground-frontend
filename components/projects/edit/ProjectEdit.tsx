import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { getProjectById, putProject } from '@/api/endpoint_LEGACY/projects';
import AuthRequired from '@/components/auth/AuthRequired';
import { Alert } from '@/components/common/Modal/Alert';
import { Confirm } from '@/components/common/Modal/Confirm';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/form/schema';
import { getProjectListQueryKey } from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { getProjectQueryKey } from '@/components/projects/upload/hooks/useGetProjectQuery';
import { convertProjectToFormType, convertToProjectData } from '@/components/projects/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ProjectEditProps {
  projectId: string;
}
const ProjectEdit: FC<ProjectEditProps> = ({ projectId }) => {
  const { data: projectData } = useQuery(['getProjectById', projectId], () => getProjectById(projectId));
  const { data: myProfileData } = useGetMemberOfMe();
  const { mutate: putProjectMutation } = useMutation(putProject);
  const queryClient = useQueryClient();
  const { logSubmitEvent } = useEventLogger();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (formData: ProjectFormType) => {
    const notify = await Confirm({
      title: '알림',
      content: '프로젝트를 수정하시겠습니까?',
    });
    if (notify && myProfileData) {
      putProjectMutation(
        {
          id: Number(projectId),
          data: convertToProjectData(formData, myProfileData.id),
        },
        {
          onSuccess: () => {
            toast.show({ message: '프로젝트를 성공적으로 수정했어요.' });
            router.push(playgroundLink.projectList());
            queryClient.invalidateQueries(getProjectQueryKey(projectId));
            queryClient.invalidateQueries(getProjectListQueryKey());
            logSubmitEvent('projectEdit', {
              projectId,
              editorId: String(myProfileData.id),
            });
          },
        },
      );
    }
  };

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

  const defaultValues: ProjectFormType = convertProjectToFormType(projectData);

  return (
    <AuthRequired>
      <Container>
        <ProjectForm
          hideProgress
          submitButtonContent='프로젝트 수정하기'
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </Container>
    </AuthRequired>
  );
};

export default ProjectEdit;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 98px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;
