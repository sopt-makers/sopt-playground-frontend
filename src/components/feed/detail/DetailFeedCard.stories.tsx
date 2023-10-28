import { Meta, StoryObj } from '@storybook/react';

import DetailFeedCard from './DetailFeedCard';

const meta = {
  component: DetailFeedCard,
} satisfies Meta<typeof DetailFeedCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    category: '파트',
    tag: '기획',
  },
} satisfies Story;
