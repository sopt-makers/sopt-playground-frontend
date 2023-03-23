import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import { memberFormSchema } from '@/components/members/upload/schema';
import MemberBasicFormSection from '@/components/members/upload/sections/BasicFormSection';
import { MemberUploadForm } from '@/components/members/upload/types';

type PickBasicForm = Pick<
  MemberUploadForm,
  'profileImage' | 'name' | 'birthday' | 'phone' | 'email' | 'address' | 'university' | 'major' | 'introduction'
>;

export default {
  component: MemberBasicFormSection,
  decorators: [
    (Story) => {
      const formMethods = useForm<PickBasicForm>({
        resolver: yupResolver(memberFormSchema),
        defaultValues: MEMBER_DEFAULT_VALUES,
        mode: 'onChange',
      });
      return (
        <FormProvider {...formMethods}>
          <Story />
          <button onClick={() => formMethods.handleSubmit((formData) => console.log(formData))}>
            테스트용 제출 버튼
          </button>
        </FormProvider>
      );
    },
  ],
} as ComponentMeta<typeof MemberBasicFormSection>;

const Template: ComponentStory<typeof MemberBasicFormSection> = () => <MemberBasicFormSection />;

export const Default = Template.bind({});
Default.storyName = '기본정보 섹션';
