import { Meta } from '@storybook/react';

import CategorySelectorHeader from '@/components/feed/upload/CategorySelector/CategoryHeader';

export default {
  component: CategorySelectorHeader,
} as Meta<typeof CategorySelectorHeader>;

export const Default = {
  args: {},
  name: '카테고리 헤더',
};
