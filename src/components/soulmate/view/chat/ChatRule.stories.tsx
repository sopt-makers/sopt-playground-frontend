import { Meta, StoryObj } from '@storybook/react';

import ChatRule from './ChatRule';

const meta = {
  component: ChatRule,
} satisfies Meta<typeof ChatRule>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
