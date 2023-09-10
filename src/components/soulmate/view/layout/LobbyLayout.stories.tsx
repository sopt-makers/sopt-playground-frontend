import { Meta, StoryObj } from '@storybook/react';

import LobbyLayout from './LobbyLayout';

const meta = {
  component: LobbyLayout,
} satisfies Meta<typeof LobbyLayout>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: '김솝트',
    statusSlot: <div>Status</div>,
    exitSoulmateSlot: <div>exit</div>,
  },
} satisfies Story;
