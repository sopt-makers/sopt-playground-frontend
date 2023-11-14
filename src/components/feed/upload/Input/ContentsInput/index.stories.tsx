import { Meta } from '@storybook/react';

import ContentsInput from '@/components/feed/upload/Input/\bContentsInput';

export default {
  component: ContentsInput,
} as Meta<typeof ContentsInput>;

export const Default = {
  args: {},
  name: '콘텐츠 Input',
};
