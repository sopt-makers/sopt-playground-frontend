import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import { memberFormSchema } from '@/components/members/upload/schema';
import TmiSection from '@/components/members/upload/TmiSection';
import { MemberUploadForm } from '@/components/members/upload/types';

export default {
  component: TmiSection,
  decorators: [
    (Story) => {
      const formMethods = useForm<Pick<MemberUploadForm, 'mbti'>>({
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
} as ComponentMeta<typeof TmiSection>;

const Template: ComponentStory<typeof TmiSection> = () => <TmiSection />;

export const Default = Template.bind({});
Default.storyName = 'TMI 섹션';
