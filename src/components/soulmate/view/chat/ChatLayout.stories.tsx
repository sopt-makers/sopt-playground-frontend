import { Meta, StoryObj } from '@storybook/react';

import ChatLayout from './ChatLayout';

const meta = {
  component: ChatLayout,
} satisfies Meta<typeof ChatLayout>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    progressSlot: <div>Progress</div>,
    chatSlot: <div style={{ height: '100%', backgroundColor: '#cbcbcb' }}>Chat</div>,
  },
} satisfies Story;
