import { Meta, StoryObj } from '@storybook/react';

import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';

export default {
  component: Wordchain,
} as Meta;

export const First: StoryObj = {
  render: () => (
    <Wordchain
      id={-1}
      isProgress={true}
      winnerName={null}
      initial={{ word: '의자', userName: '남주영천재' }}
      order={1}
      wordList={[
        { content: '자전거', user: { id: -1, name: '이준호' } },
        { content: '거지', user: { id: -1, name: '박건영' } },
      ]}
    />
  ),
  name: '첫 게임',
};

export const Progress: StoryObj = {
  render: () => (
    <Wordchain
      id={-1}
      isProgress={true}
      winnerName={null}
      initial={{ word: '의자', userName: '남주영천재' }}
      order={2}
      wordList={[
        { content: '자전거', user: { id: -1, name: '이준호' } },
        { content: '거지', user: { id: -1, name: '박건영' } },
      ]}
    />
  ),
  name: '진행 중',
};

export const Finished: StoryObj = {
  render: () => (
    <Wordchain
      id={-1}
      isProgress={false}
      winnerName={'남주영끝말잇기천재'}
      initial={{ word: '서기', userName: '이준호' }}
      order={2}
      wordList={[
        { content: '기술', user: { id: -1, name: '박건영' } },
        {
          content: '술집',
          user: {
            id: -1,
            name: '남주영',
            profileImage:
              'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
          },
        },
      ]}
    />
  ),
  name: '종료',
};
