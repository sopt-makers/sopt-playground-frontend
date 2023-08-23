import { Meta } from '@storybook/react';

import HelpCard from './HelpCard';

export default {
  component: HelpCard,
  parameters: {},
  decorators: [],
} as Meta<typeof HelpCard>;

export const Default = {
  args: {
    title: '제목제목',
    content: '내용내용',
    highlight: false,
  },
};

export const Highlight = {
  args: {
    title: '제목제목',
    content: '내용내용',
    highlight: true,
  },
};
