import { Meta } from '@storybook/react';

import HeaderLayout from '@/components/layout/HeaderLayout';

export default {
  component: HeaderLayout,
} as Meta<typeof HeaderLayout>;

export const Default = {
  args: {
    children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
  },

  name: '기본',
};
