import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MEMBER_DEFAULT_VALUES } from '@/components/members/upload/constants';
import TmiSection from '@/components/members/upload/sections/TmiSection';
import { MemberUploadForm } from '@/components/members/upload/types';

const tmiSectionSchema = yup.object().shape({
  mbti: yup
    .tuple([
      yup.string().required('MBTI 4자리를 모두 선택해주세요.'),
      yup.string().required('MBTI 4자리를 모두 선택해주세요.'),
      yup.string().required('MBTI 4자리를 모두 선택해주세요.'),
      yup.string().required('MBTI 4자리를 모두 선택해주세요.'),
    ])
    .nullable(),
  mbtiDescription: yup.string().nullable(),
});

export default {
  component: TmiSection,
  decorators: [
    (Story) => {
      const formMethods = useForm<Pick<MemberUploadForm, 'mbti'>>({
        resolver: yupResolver(tmiSectionSchema),
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
