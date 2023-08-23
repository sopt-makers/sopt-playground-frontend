import { Meta, StoryObj } from '@storybook/react';

import WordChatMessage from '@/components/wordchain/WordchainChatting/WordChatMessage';

export default {
  component: WordChatMessage,
} as Meta<typeof WordChatMessage>;

export const Default: StoryObj = {
  render: () => (
    <WordChatMessage
      user={{
        id: -1,
        name: '남주영',
        profileImage:
          'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
      }}
      word='의자'
    />
  ),
  name: '기본',
};
