import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import PeriodField from '@/components/projects/form/fields/PeriodField';
import FormEntry from '@/components/projects/form/presenter/FormEntry';
import { defaultUploadValues, ProjectFormType, uploadSchema } from '@/components/projects/form/schema';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ProjectFormProps {
  onSubmit?: (formData: ProjectFormType) => void;
  submitButtonContent: ReactNode;
  defaultValues?: ProjectFormType;
}

const ProjectForm: FC<ProjectFormProps> = ({ onSubmit, submitButtonContent, defaultValues = defaultUploadValues }) => {
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
    mode: 'all',
  });

  const submit = () => {
    onSubmit?.(getValues());
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <FormEntry title='프로젝트 이름' required>
        <Input {...register('name')} errorMessage={errors.name?.message ?? ''} />
      </FormEntry>
      <FormEntry title='프로젝트 기간' required>
        <Controller
          control={control}
          name='period'
          render={({ field }) => {
            return (
              <PeriodField
                {...field}
                errorMessage={errors.period?.startAt?.message ?? errors.period?.endAt?.message}
                isStartError={!!errors.period?.startAt}
                isEndError={!!errors.period?.endAt}
              />
            );
          }}
        />
      </FormEntry>
      <SubmitContainer>
        <Button type='submit' variant='primary'>
          {submitButtonContent}
        </Button>
      </SubmitContainer>
    </StyledForm>
  );
};

export default ProjectForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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
