import { Meta } from '@storybook/react';

import AppJamBanner from './AppJamBanner';

export default {
  component: AppJamBanner,
  parameters: {},
  decorators: [],
} as Meta<typeof AppJamBanner>;

export const Default = {
  args: {},
  name: '기본',
};
