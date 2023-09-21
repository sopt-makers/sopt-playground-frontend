import { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

import WordchainWinners from '@/components/wordchain/WordchainWinners';
import WordChainWinner from '@/components/wordchain/WordchainWinners/WordchainWinner';

export default {
  component: WordchainWinners,
} as Meta;

const winnerList = [
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
];

export const Default: StoryObj = {
  render: () => (
    <Fragment>
      {winnerList.map(({ roomId, winner: { id, profileImage, name } }) => {
        return <WordChainWinner key={id} roomId={roomId} profileImage={profileImage} name={name} isRecent={false} />;
      })}
    </Fragment>
  ),
  name: '기본',
};
