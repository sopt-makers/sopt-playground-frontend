import { Meta } from '@storybook/react';

import WordChainWinner from '@/components/wordchain/WordchainWinners/WordChainWinner';

export default {
  component: WordChainWinner,
} as Meta<typeof WordChainWinner>;

export const Default = {
  args: {
    roomId: 25,
    id: 1,
    profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
    name: '서지수',
  },
  name: '기본',
};
