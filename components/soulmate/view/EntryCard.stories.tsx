import { Meta, StoryObj } from '@storybook/react';

import EntryCard from '@/components/soulmate/view/EntryCard';

const meta = {
  component: EntryCard,
} satisfies Meta<typeof EntryCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithHint = {
  args: {
    entryUrl: '/soulmate',
    hints: ['힌트1', '힌트2'],
  },
} satisfies Story;

export const WithoutHint = {
  args: {
    entryUrl: '/soulmate',
  },
} satisfies Story;
