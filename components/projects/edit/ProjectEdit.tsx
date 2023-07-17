import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { getProjectById } from '@/api/endpoint_LEGACY/projects';
import { Alert } from '@/components/common/Modal/Alert';
import { playgroundLink } from '@/constants/links';

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

  return <div>{projectId}</div>;
};

export default ProjectEdit;
