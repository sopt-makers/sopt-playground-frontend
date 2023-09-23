import styled from '@emotion/styled';
import { FC } from 'react';
import { FormState } from 'react-hook-form';

import FormProgress, { FormProgressItem } from '@/components/common/form/FormProgress';
import { ProjectFormType } from '@/components/projects/upload/form/schema';

interface UploadProjectProgressProps {
  formState: FormState<ProjectFormType>;
}

const UploadProjectProgress: FC<UploadProjectProgressProps> = ({ formState }) => {
  const { dirtyFields } = formState;

  const items: FormProgressItem[] = [
    { title: '프로젝트 이름', active: dirtyFields.name, required: true },
    {
      title: '기수',
      active: dirtyFields.generation,
      required: true,
    },
    { title: '어디서 진행했나요?', active: dirtyFields.category, required: true },
    {
      title: '팀원',
      active: Boolean(dirtyFields.members?.[0]),
      required: true,
    },
    { title: '서비스 형태', active: Boolean(dirtyFields.serviceType), required: true },
    { title: '프로젝트 기간', active: Boolean(dirtyFields.period), required: true },
    { title: '프로젝트 한줄 소개', active: dirtyFields.summary, required: true },
    { title: '프로젝트 설명', active: dirtyFields.detail, required: true },
    { title: '로고 이미지', active: dirtyFields.logoImage, required: true },
    { title: '썸네일 이미지', active: dirtyFields.thumbnailImage, required: true },
    {
      title: '프로젝트 이미지',
      active: dirtyFields.projectImages?.some((image) => Boolean(image) && image.imageUrl !== false),
      required: true,
    },
  ];

  return <StyledFormProgress title='등록 진행' progressLabel='프로젝트를 등록해주세요.' items={items} />;
};

export default UploadProjectProgress;

const StyledFormProgress = styled(FormProgress)``;
