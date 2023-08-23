import { Meta, StoryObj } from '@storybook/react';

import Menu from './Menu';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    progressSlot: <div>Progress</div>,
  },
} satisfies Story;
