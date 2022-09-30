import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

import FormItem from './FormItem';

export default {
  component: FormItem,
} as ComponentMeta<typeof FormItem>;

const Template: ComponentStory<typeof FormItem> = (args) => <FormItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Input error />,
  errorMessage: '프로젝트 한줄 소개를 입력해주세요',
};
Default.storyName = 'Input';

export const Primary = Template.bind({});
Primary.args = {
  children: <TextArea error />,
  errorMessage: '프로젝트 설명을 입력해주세요',
};
Primary.storyName = 'TextArea';
