import { Meta } from '@storybook/react';

import ByPhoneView from './ByPhoneView';

export default {
  component: ByPhoneView,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ByPhoneView>;

export const Default = {
  args: {
    type: 'phoneReady',
  },
};

export const Sent = {
  args: {},
};
