import { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
