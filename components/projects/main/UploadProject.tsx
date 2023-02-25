import styled from '@emotion/styled';
import { FC, memo } from 'react';

import FormProgress, { FormProgressItem } from '@/components/common/form/FormProgress';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { ProjectFormType } from '@/components/projects/form/schema';

interface UploadProjectProps {
  onSubmit?: (formData: ProjectFormType) => void;
}

const FormProgressMemo = memo(FormProgress);

const UploadProject: FC<UploadProjectProps> = ({ onSubmit }) => {
  const progressItems: FormProgressItem[] = [{ title: 'asdf' }];

  return (
    <StyledUploadProject>
      <StyledFormProgress title='등록 진행' progressLabel='프로젝트를 등록해주세요.' items={progressItems} />
      <StyledProjectForm submitButtonContent='프로젝트 등록하기' onSubmit={onSubmit} />
    </StyledUploadProject>
  );
};

export default UploadProject;

const StyledUploadProject = styled.div`
  display: flex;
  gap: 40px;
`;

const StyledFormProgress = styled(FormProgressMemo)`
  flex-shrink: 0;
`;

const StyledProjectForm = styled(ProjectForm)`
  flex-grow: 1;
`;
