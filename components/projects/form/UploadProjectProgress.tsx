import styled from '@emotion/styled';
import { FC } from 'react';
import { FormState } from 'react-hook-form';

import FormProgress, { FormProgressItem } from '@/components/common/form/FormProgress';
import { ProjectFormType } from '@/components/projects/form/schema';

interface UploadProjectProgressProps {
  formState: FormState<ProjectFormType>;
}

const UploadProjectProgress: FC<UploadProjectProgressProps> = ({ formState }) => {
  const { dirtyFields } = formState;

  const items: FormProgressItem[] = [
    { title: '프로젝트 이름', active: dirtyFields.name, required: true },
    // { title: '프로젝트 기간', active: !!dirtyFields.period },
  ];

  return <StyledFormProgress title='등록 진행' progressLabel='프로젝트를 등록해주세요.' items={items} />;
};

export default UploadProjectProgress;

const StyledFormProgress = styled(FormProgress)``;
