import { Meta } from '@storybook/react';

import CategorySelector from '@/components/feed/upload/CategorySelector';

export default {
  component: CategorySelector,
} as Meta<typeof CategorySelector>;

export const Default = {
  args: {},
  name: '기본',
};
