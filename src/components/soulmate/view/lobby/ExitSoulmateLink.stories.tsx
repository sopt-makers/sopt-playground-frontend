import { Meta, StoryObj } from '@storybook/react';

import ExitSoulmateLink from './ExitSoulmateLink';

const meta = {
  component: ExitSoulmateLink,
} satisfies Meta<typeof ExitSoulmateLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
