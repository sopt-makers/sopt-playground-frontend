import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import NameField from '@/components/projects/form/fields/NameField';
import PeriodField from '@/components/projects/form/fields/PeriodField';
import FormEntry from '@/components/projects/form/presenter/FormEntry';
import { ProjectFormType, uploadSchema } from '@/components/projects/form/schema';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ProjectFormProps {
  onSubmit?: (formData: ProjectFormType) => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ onSubmit }) => {
  const f = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    mode: 'all',
  });
  const { control, handleSubmit, register, getValues } = f;

  const submit = () => {
    onSubmit?.(getValues());
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <FormEntry title='프로젝트 이름'>
        <Controller
          control={control}
          name='name'
          defaultValue=''
          render={({ field: { value, onChange }, fieldState }) => (
            <NameField value={value} onChange={onChange} error={fieldState.error?.message} />
          )}
        />
      </FormEntry>
      <FormEntry title='안녕하세요' comment='디스크립션' description='디스크립션'>
        <Controller
          control={control}
          name='period'
          defaultValue={{ startAt: '', endAt: '' }}
          render={({ field, formState }) => {
            return <PeriodField {...field} error={formState.errors.period?.startAt?.message} />;
          }}
        />
      </FormEntry>
      <Input {...register('name')} />

      <Button type='submit' variant='primary'>
        프로젝트 업로드하기
      </Button>
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
