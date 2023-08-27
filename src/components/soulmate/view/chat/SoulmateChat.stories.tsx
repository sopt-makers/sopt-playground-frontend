import { Meta, StoryObj } from '@storybook/react';

import SoulmateChat from './SoulmateChat';

const meta = {
  component: SoulmateChat,
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SoulmateChat>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: [...new Array(50)].map((_, idx) => <div key={idx}>Item {idx}</div>),
  },
} satisfies Story;
