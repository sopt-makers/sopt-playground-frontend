import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ProjectFormType, validation } from '@/components/projects/uploadNew/schema';
import ProjectUploadForm from '@/components/projects/uploadNew/ProjectUploadForm';
import { setLayout } from '@/utils/layout';

const ProjectUploadPageNew = () => {
  const f = useForm<ProjectFormType>({
    resolver: yupResolver(validation),
    mode: 'all',
    defaultValues: {
      name: '',
      period: {
        isOngoing: false,
        startAt: '',
        endAt: '',
      },
    },
  });

  return (
    <PageContainer>
      <ProjectUploadForm f={f} />
    </PageContainer>
  );
};

setLayout(ProjectUploadPageNew, 'header');

export default ProjectUploadPageNew;

const PageContainer = styled.div`
  display: flex;
`;
