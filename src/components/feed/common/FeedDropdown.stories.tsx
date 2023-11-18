import { Meta, StoryObj } from '@storybook/react';

import { IconMoreVert } from '@/components/feed/common/Icon';

import FeedDropdown from './FeedDropdown';

const meta = {
  component: FeedDropdown,
} satisfies Meta<typeof FeedDropdown>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    trigger: <IconMoreVert />,
    children: (
      <>
        <FeedDropdown.Item type='danger'>신고</FeedDropdown.Item>
        <FeedDropdown.Item>수정</FeedDropdown.Item>
        <FeedDropdown.Item>공유</FeedDropdown.Item>
      </>
    ),
  },
} satisfies Story;
