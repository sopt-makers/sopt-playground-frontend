import { Meta } from '@storybook/react';

import FullScreenLayout from '@/components/layout/FullScreenLayout';

export default {
  component: FullScreenLayout,
} as Meta<typeof FullScreenLayout>;

export const Default = {
  args: {
    children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '100%' }}>Page Content</div>,
  },

  name: '기본',
};
