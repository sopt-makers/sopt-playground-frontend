import { Meta } from '@storybook/react';

import Verify from './Verify';

export default {
  component: Verify,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Verify>;

export const Default = {
  args: {},
  name: '기본',
};
