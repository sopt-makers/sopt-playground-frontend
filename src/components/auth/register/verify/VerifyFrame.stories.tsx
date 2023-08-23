import { Meta } from '@storybook/react';

import VerifyFrame from './VerifyFrame';

export default {
  component: VerifyFrame,
  parameters: {},
  decorators: [],
  argTypes: {
    byPhone: { control: false },
    byEmail: { control: false },
  },
} as Meta<typeof VerifyFrame>;

export const Default = {
  args: {
    byPhone: <div style={{ backgroundColor: '#a9d7b4', height: '100px' }}>byPhone</div>,
  },

  name: '기본',
};
