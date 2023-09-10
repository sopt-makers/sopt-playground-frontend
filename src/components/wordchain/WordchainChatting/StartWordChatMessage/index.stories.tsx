import { Meta, StoryObj } from '@storybook/react';

import StartWordChatMessage from '@/components/wordchain/WordchainChatting/StartWordChatMessage';

export default {
  component: StartWordChatMessage,
} as Meta<typeof StartWordChatMessage>;

export const Default: StoryObj = {
  render: () => <StartWordChatMessage word={'지갑'} />,
  name: '기본',
};
