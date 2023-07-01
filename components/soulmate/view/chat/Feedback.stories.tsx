import { Meta, StoryObj } from '@storybook/react';

import Feedback from './Feedback';

const meta = {
  component: Feedback,
} satisfies Meta<typeof Feedback>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
