import styled from '@emotion/styled';
import PaperAirplaneIcon from 'public/icons/icon-paper-airplane.svg';
import { FormEvent } from 'react';

import { Word } from '@/components/wordchain/types';
import { colors } from '@/styles/colors';

import Wordchain from './Wordchain';

export default function WordchainChatting() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      <WordchainList>
        {DUMMY_DATA.map((wordchain) => (
          <Wordchain {...wordchain} key={wordchain.count} className='wordchain' />
        ))}
      </WordchainList>
      <Form onSubmit={handleSubmit}>
        <StyledInput placeholder='단어를 입력해주세요. (단, 표준국어대사전에 있는 단어만 사용할 수 있어요.)' />
        <StyledPaperAirplaneIcon />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 30px;
  background-color: ${colors.black80};
  padding: 40px;
  width: 790px;
  height: 728px;
`;

const WordchainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding-right: 14px;
  width: 100%;
  height: 548px;
  overflow-y: scroll;

  & > .wordchain {
    position: relative;
  }

  & > .wordchain:not(:last-child)::after {
    position: absolute;
    bottom: -32px;
    left: 0;
    background-color: ${colors.black60};
    width: 100%;
    height: 1px;
    content: '';
  }
`;

const Form = styled.form`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  margin-top: 32px;
  border: 1px solid ${({ isError }) => (isError ? colors.red100 : colors.black90)};
  border-radius: 14px;
  background-color: ${colors.black90};
  padding: 24px 20px;
  width: 100%;
  line-height: 120%;
  color: ${colors.gray10};

  &::placeholder {
    color: ${colors.gray80};
  }

  &:focus {
    outline: none;
    border-color: ${colors.purple100};
  }
`;

const StyledPaperAirplaneIcon = styled(PaperAirplaneIcon)`
  position: absolute;
  right: 24px;
  bottom: 24px;
  cursor: pointer;
`;

type WordchainProps =
  | {
      isProgress: true;
      count: number;
      start: {
        word: string;
        userName: string;
      };
      wordList: Word[];
      winnerName: null;
      className?: string;
    }
  | {
      isProgress: false;
      count: number;
      start: {
        word: string;
        userName: string;
      };
      wordList: Word[];
      winnerName: string;
      className?: string;
    };

const DUMMY_DATA: WordchainProps[] = [
  {
    isProgress: false,
    winnerName: '박건영',
    count: 1,
    start: { word: '버디버디', userName: '남주영' },
    wordList: [
      {
        user: {
          id: 1,
          name: '남주영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '디자이너',
      },
      {
        user: {
          id: 2,
          name: '한지우',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '너가소개서',
      },
      {
        user: {
          id: 3,
          name: '한유진',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '서비스',
      },
      {
        user: {
          id: 4,
          name: '이준호',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '스키',
      },
      {
        user: {
          id: 5,
          name: '이정연',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '키움증권',
      },
      {
        user: {
          id: 6,
          name: '박건영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '권리',
      },
    ],
  },
  {
    isProgress: false,
    winnerName: '박건영',
    count: 1,
    start: { word: '버디버디', userName: '남주영' },
    wordList: [
      {
        user: {
          id: 1,
          name: '남주영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '디자이너',
      },
      {
        user: {
          id: 2,
          name: '한지우',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '너가소개서',
      },
      {
        user: {
          id: 3,
          name: '한유진',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '서비스',
      },
      {
        user: {
          id: 4,
          name: '이준호',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '스키',
      },
      {
        user: {
          id: 5,
          name: '이정연',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '키움증권',
      },
      {
        user: {
          id: 6,
          name: '박건영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '권리',
      },
    ],
  },
  {
    isProgress: true,
    winnerName: null,
    count: 1,
    start: { word: '버디버디', userName: '남주영' },
    wordList: [
      {
        user: {
          id: 1,
          name: '남주영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '디자이너',
      },
      {
        user: {
          id: 2,
          name: '한지우',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '너가소개서',
      },
      {
        user: {
          id: 3,
          name: '한유진',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '서비스',
      },
      {
        user: {
          id: 4,
          name: '이준호',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '스키',
      },
      {
        user: {
          id: 5,
          name: '이정연',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '키움증권',
      },
      {
        user: {
          id: 6,
          name: '박건영',
          profileImage:
            'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
        },
        content: '권리',
      },
    ],
  },
];
