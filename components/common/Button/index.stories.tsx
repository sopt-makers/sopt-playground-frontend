import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';

export default {
  component: Button,
} as Meta<typeof Button>;

export const Default = {
  args: {
    children: '기본 버튼',
    variant: 'default',
  },

  name: 'Default',
};

export const Primary = {
  args: {
    children: '프라이머리 버튼',
    variant: 'primary',
  },

  name: 'Primary',
};
