import { Meta } from '@storybook/react';

import Stepper from './Stepper';

export default {
  component: Stepper,
  parameters: {},
  decorators: [],
} as Meta<typeof Stepper>;

export const Default = {
  args: {
    step: 1,
  },

  name: '기본',
};
