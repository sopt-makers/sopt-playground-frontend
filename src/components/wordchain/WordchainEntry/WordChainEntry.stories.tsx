import { Meta, StoryObj } from '@storybook/react';

import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';

export default {
  component: WordChainEntry,
} as Meta<typeof WordChainEntry>;

export const Default: StoryObj = {
  render: () => <WordChainEntry />,
  name: '기본',
};
