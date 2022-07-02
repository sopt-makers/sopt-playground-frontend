import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from '@/components/common/TextArea';
import FormItem from '@/components/common/form/FormItem';
import { useState } from 'react';

export default {
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '프로젝트에 대해 설명해주세요',
};
Default.storyName = '기본';

export const Count = Template.bind({});
Count.args = {
  count: true,
  maxCount: 500,
  placeholder: '프로젝트에 대해 설명해주세요',
};
Count.storyName = '카운트';

export const Error = Template.bind({});
Error.args = {
  placeholder: '프로젝트에 대해 설명해주세요',
  error: true,
};
Error.storyName = '에러';

export const ErrorMessage: ComponentStory<typeof TextArea> = (args) => {
  const [value, onChange] = useState<string>('');
  const error = value.length === 0;
  return (
    <FormItem errorMessage={error && '프로젝트 설명을 입력해주세요.'}>
      <TextArea error={error} value={value} onChange={(e) => onChange(e.target.value)} {...args} />
    </FormItem>
  );
};
ErrorMessage.storyName = '에러메시지';
