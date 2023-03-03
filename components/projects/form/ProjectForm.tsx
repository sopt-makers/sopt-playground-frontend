import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CategoryField from '@/components/projects/form/fields/CategoryField';
import GenerationField from '@/components/projects/form/fields/GenerationField';
import PeriodField from '@/components/projects/form/fields/PeriodField';
import FormEntry from '@/components/projects/form/presenter/FormEntry';
import { defaultUploadValues, ProjectFormType, uploadSchema } from '@/components/projects/form/schema';
import UploadProjectProgress from '@/components/projects/form/UploadProjectProgress';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ProjectFormProps {
  onSubmit?: (formData: ProjectFormType) => void;
  submitButtonContent: ReactNode;
  defaultValues?: ProjectFormType;
  hideProgress?: boolean;
}

const ProjectForm: FC<ProjectFormProps> = ({
  onSubmit,
  submitButtonContent,
  defaultValues = defaultUploadValues,
  hideProgress = false,
}) => {
  const { control, handleSubmit, register, getValues, formState } = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
    mode: 'all',
  });

  const { errors } = formState;

  const submit = () => {
    onSubmit?.(getValues());
  };

  return (
    <StyledFormContainer>
      {!hideProgress && <StyledFormProgress formState={formState} />}
      <StyledForm onSubmit={handleSubmit(submit)}>
        <FormEntry title='프로젝트 이름' required>
          <Input {...register('name')} errorMessage={errors.name?.message ?? ''} />
        </FormEntry>
        <FormEntry title='프로젝트 기간' required>
          <Controller
            control={control}
            name='period'
            render={({ field }) => (
              <PeriodField
                {...field}
                errorMessage={errors.period?.startAt?.message ?? errors.period?.endAt?.message}
                isStartError={!!errors.period?.startAt}
                isEndError={!!errors.period?.endAt}
              />
            )}
          />
        </FormEntry>
        <FormEntry title='기수' description='참여한 팀원들의 기수에 맞춰 작성해주세요' required>
          <Controller
            control={control}
            name='generation'
            render={({ field }) => <GenerationField {...field} errorMessage={errors.generation?.message} />}
          />
        </FormEntry>
        <FormEntry title='어디서 진행했나요?' description='기수는 SOPT 공식 활동을 기준으로 선택해주세요' required>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <CategoryField {...field} errorMessage={errors.category?.message} isError={!!errors.category} />
            )}
          />
        </FormEntry>
        <SubmitContainer>
          <Button type='submit' variant='primary'>
            {submitButtonContent}
          </Button>
        </SubmitContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ProjectForm;

const StyledFormContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const StyledFormProgress = styled(UploadProjectProgress)`
  flex-shrink: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 60px;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 892px;

  @media screen and (max-width: 1055px) {
    border-radius: 0%;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 38px 24px 107px;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

  & > button {
    ${textStyles.SUIT_14_M};
  }
`;
