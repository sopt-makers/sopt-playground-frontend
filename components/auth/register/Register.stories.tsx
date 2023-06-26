import { Meta } from '@storybook/react';

import Register from '@/components/auth/register/Register';

export default {
  component: Register,
} as Meta<typeof Register>;

export const Basic = {
  args: {
    userInfo: {
      name: '박커비',
    },
  },

  name: '기본',
};
