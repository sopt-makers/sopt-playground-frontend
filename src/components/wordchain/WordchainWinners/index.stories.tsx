import { Meta, StoryObj } from '@storybook/react';

import WordchainWinners from '@/components/wordchain/WordchainWinners';

const meta = {
  component: WordchainWinners,
} satisfies Meta<typeof WordchainWinners>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    winners: [
      {
        roomId: 25,
        winner: {
          id: 1,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '남주영',
        },
      },
      {
        roomId: 24,
        winner: {
          id: 2,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '박건영',
        },
      },
      {
        roomId: 23,
        winner: {
          id: 3,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '서지수',
        },
      },
      {
        roomId: 22,
        winner: {
          id: 4,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '이준호',
        },
      },
      {
        roomId: 21,
        winner: {
          id: 5,
          profileImage: 'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
          name: '솝트짱',
        },
      },
    ],
    hasNext: true,
  },
  name: '기본',
} satisfies Story;
