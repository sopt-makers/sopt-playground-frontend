import { FC, ReactNode } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import Input from '@/components/common/Input';
import FormTitle from '@/components/projects/upload/FormTitle';
import NameField from '@/components/projects/uploadNew/fields/NameField';
import PeriodField from '@/components/projects/uploadNew/fields/PeriodField';
import { ProjectFormType } from '@/components/projects/uploadNew/schema';

interface ProjectUploadFormProps {
  f: UseFormReturn<ProjectFormType>;
}

const ProjectUploadForm: FC<ProjectUploadFormProps> = ({ f }) => {
  const { control, watch, handleSubmit, register } = f;

  const values = watch();

  const submit = () => {
    console.log('SUB');
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name='name'
        render={({ field: { value, onChange }, fieldState }) => (
          <FormEntry title='프로젝트 이름'>
            <NameField value={value} onChange={onChange} error={fieldState.error?.message} />
          </FormEntry>
        )}
      />
      <Controller
        control={control}
        name='period'
        render={({ field, fieldState }) => {
          return <PeriodField {...field} error={fieldState.error?.message} />;
        }}
      />
      <Input {...register('name')} />

      <button type='submit'>SUBMIT</button>
      {JSON.stringify(values)}
    </form>
  );
};

export default ProjectUploadForm;

function FormEntry(props: { title: string; children: ReactNode }) {
  return (
    <div>
      <FormTitle>{props.title}</FormTitle>
      {props.children}
    </div>
  );
}
