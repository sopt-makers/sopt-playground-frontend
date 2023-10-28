import { Meta } from '@storybook/react';

import CategorySelectorHeader from '@/components/feed/Editor/CategorySelector/CategorySelectorHeader';

export default {
  component: CategorySelectorHeader,
} as Meta<typeof CategorySelectorHeader>;

export const Default = {
  args: {},
  name: '기본',
};
