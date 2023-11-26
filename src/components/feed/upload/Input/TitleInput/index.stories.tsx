import { Meta } from '@storybook/react';

import TitleInput from '@/components/feed/upload/Input/TitleInput';

export default {
  component: TitleInput,
} as Meta<typeof TitleInput>;

export const Default = {
  args: {},
  name: '제목 Input',
};
