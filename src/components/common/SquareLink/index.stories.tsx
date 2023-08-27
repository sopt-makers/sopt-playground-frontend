import { Meta } from '@storybook/react';

import SquareLink from '@/components/common/SquareLink';

export default {
  component: SquareLink,
} as Meta<typeof SquareLink>;

export const Default = {
  args: {
    children: '기본 버튼',
    variant: 'default',
  },
};

export const Primary = {
  args: {
    children: '프라이머리 버튼',
    variant: 'primary',
  },
};
