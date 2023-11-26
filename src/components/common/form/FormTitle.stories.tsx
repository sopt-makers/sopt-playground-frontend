import { Meta } from '@storybook/react';

import FormTitle from '@/components/common/form/FormTitle';

export default {
  component: FormTitle,
} as Meta<typeof FormTitle>;

export const 기본 = {
  args: {
    children: '타이틀',
  },
};

export const 필수사항 = {
  args: {
    children: '필수사항',
    essential: true,
  },
};
