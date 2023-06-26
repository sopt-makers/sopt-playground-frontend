import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import FormItem from '@/components/common/form/FormItem';
import TextArea from '@/components/common/TextArea';

export default {
  component: TextArea,
} as Meta<typeof TextArea>;

export const Default = {
  args: {
    placeholder: '프로젝트에 대해 설명해주세요',
  },

  name: '기본',
};

export const Count = {
  args: {
    count: true,
    maxCount: 500,
    placeholder: '프로젝트에 대해 설명해주세요',
  },

  name: '카운트',
};

export const Error = {
  args: {
    placeholder: '프로젝트에 대해 설명해주세요',
    error: true,
  },

  name: '에러',
};

export const ErrorMessage: StoryObj<typeof TextArea> = {
  render: function Render(args) {
    const [value, onChange] = useState<string>('');
    const error = value.length === 0;
    return (
      <FormItem errorMessage={error && '프로젝트 설명을 입력해주세요.'}>
        <TextArea error={error} value={value} onChange={(e) => onChange(e.target.value)} {...args} />
      </FormItem>
    );
  },

  name: '에러메시지',
};
