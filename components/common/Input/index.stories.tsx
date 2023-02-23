import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '@/components/common/Input';

export default {
  components: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.storyName = '기본';
Basic.args = {
  count: false,
  maxCount: 10,
  error: false,
  errorMessage: '',
  placeholder: '프로젝트 소개',
};

export const Count = Template.bind({});
Count.args = {
  count: true,
  maxCount: 30,
};
Count.storyName = '카운트';

export const Error = Template.bind({});
Error.args = {
  error: true,
};
Error.storyName = '에러';

export const ErrorWithMessage = Template.bind({});
ErrorWithMessage.args = {
  errorMessage: '오류가 발생했습니다.',
  placeholder: '프로젝트 소개',
};
ErrorWithMessage.storyName = '에러 + 메시지';
