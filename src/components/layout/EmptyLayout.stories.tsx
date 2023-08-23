import { Meta } from '@storybook/react';

import EmptyLayout from '@/components/layout/EmptyLayout';

export default {
  component: EmptyLayout,
} as Meta<typeof EmptyLayout>;

export const Default = {
  args: {
    children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
  },

  name: '기본',
};
