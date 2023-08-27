import { Meta } from '@storybook/react';

import Responsive from '@/components/common/Responsive/Responsive';
import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';

export default {
  component: Responsive,
  decorators: [
    (Story) => {
      return (
        <ResponsiveProvider>
          <Story />
        </ResponsiveProvider>
      );
    },
  ],
} as Meta<typeof Responsive>;

export const Desktop = {
  args: {
    children: 'Only Desktop',
    only: 'desktop',
  },
};

export const Mobile = {
  args: {
    children: 'Only Mobile',
    only: 'mobile',
  },
};
