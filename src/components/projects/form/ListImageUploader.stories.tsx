import { Meta, StoryObj } from '@storybook/react';

import ListImageUploader from './ListImageUploader';

const meta = {
  component: ListImageUploader,
} satisfies Meta<typeof ListImageUploader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
