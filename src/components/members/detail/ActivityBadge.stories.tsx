import { Meta } from '@storybook/react';

import ActivityBadge from './ActivityBadge';

export default {
  component: ActivityBadge,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ActivityBadge>;

export const Default = {
  args: {
    category: '앱잼',
    name: '너가소개서',
  },
};

export const WithoutCategory = {
  args: {
    name: '팀블',
  },
};
