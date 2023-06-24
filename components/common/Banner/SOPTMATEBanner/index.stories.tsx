import { Meta } from '@storybook/react';

import SOPTMATEBanner from '@/components/common/Banner/SOPTMATEBanner';

export default {
  component: SOPTMATEBanner,
  parameters: {},
  decorators: [],
} as Meta<typeof SOPTMATEBanner>;

export const Default = {
  args: {},
  name: '기본',
};
