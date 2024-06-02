import { Meta, StoryObj } from '@storybook/react';

import WordchainMessage from '@/components/wordchain/WordchainEntry/WordchainMessage';

export default {
  component: WordchainMessage,
} as Meta<typeof WordchainMessage>;

export const Default: StoryObj = {
  render: () => (
    <WordchainMessage
      type='word'
      user={{
        id: 1,
        name: '남주영',
        profileImage:
          'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
      }}
      word='사과'
    />
  ),
};

export const StartWord: StoryObj = {
  render: () => <WordchainMessage type='startWord' word='토스' />,
};
