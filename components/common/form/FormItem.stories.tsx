import { Meta } from '@storybook/react';

import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

import FormItem from './FormItem';

export default {
  component: FormItem,
} as Meta<typeof FormItem>;

export const Default = {
  args: {
    children: <Input error />,
    errorMessage: '프로젝트 한줄 소개를 입력해주세요',
  },

  name: 'Input',
};

export const Primary = {
  args: {
    children: <TextArea error />,
    errorMessage: '프로젝트 설명을 입력해주세요',
  },

  name: 'TextArea',
};
