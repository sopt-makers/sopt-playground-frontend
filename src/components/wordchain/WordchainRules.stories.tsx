import { Meta, StoryObj } from '@storybook/react';

import WordchainRules from '@/components/wordchain/WordchainRules';

export default {
  component: WordchainRules,
} as Meta<typeof WordchainRules>;

export const Default: StoryObj = {
  render: () => <WordchainRules trigger={<></>} />,
  name: '기본',
};
