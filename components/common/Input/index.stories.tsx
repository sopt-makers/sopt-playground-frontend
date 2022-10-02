import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';

export default {
  components: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} placeholder='프로젝트 소개' />;

export const Basic = Template.bind({});
Basic.storyName = '기본';

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

export const ErrorMessage: ComponentStory<typeof Input> = (args) => {
  const [value, onChange] = useState<string>('');
  const error = value.length === 0;
  return (
    <FormItem errorMessage={error && '프로젝트 소개를 입력해주세요.'}>
      <Input
        placeholder='프로젝트 소개'
        error={error}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...args}
      />
    </FormItem>
  );
};
ErrorMessage.storyName = '에러메시지';
