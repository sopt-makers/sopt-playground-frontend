import { Meta, StoryObj } from '@storybook/react';

import Register from './Register';

const meta = {
  component: Register,
} satisfies Meta<typeof Register>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
