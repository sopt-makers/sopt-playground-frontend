import styled from '@emotion/styled';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import PaperAirplaneIcon from 'public/icons/icon-paper-airplane.svg';
import { FormEvent, useState } from 'react';

import { useGetWordchain, UseGetWordchainResponse } from '@/api/endpoint/wordchain/getWordchain';
import { usePostWord } from '@/api/endpoint/wordchain/postWord';
import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';
import { colors } from '@/styles/colors';

const LIMIT = 50;

export default function WordchainChatting() {
  const { data: wordchainData } = useGetWordchain({ limit: LIMIT });
  const [word, setWord] = useState('');
  const queryClient = useQueryClient();
  const { mutate: postWord } = usePostWord({
    onSuccess: ({ word, user }) => {
      setWord('');
      queryClient.setQueryData<InfiniteData<UseGetWordchainResponse>>(['getWordchain', LIMIT], (old) => {
        return old
          ? {
              ...old,
              pages: [
                {
                  ...old.pages[0],
                  wordchainList: [
                    ...old.pages[0].wordchainList.slice(0, old.pages[0].wordchainList.length - 1),
                    {
                      ...old.pages[0].wordchainList[old.pages[0].wordchainList.length - 1],
                      wordList: [
                        ...old.pages[0].wordchainList[old.pages[0].wordchainList.length - 1].wordList,
                        { content: word, user },
                      ],
                    },
                  ],
                },
                ...old.pages.slice(1),
              ],
            }
          : old;
      });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wordchainData || word.length < 1) {
      return;
    }
    const wordchainList = wordchainData.pages;
    await postWord({ wordchainId: wordchainList[wordchainList.length - 1].id, word });
    setWord('');
  };

  const handleChange = (value: string) => {
    setWord(value);
  };

  return (
    <Container>
      <WordchainList>
        {wordchainData?.pages.map((wordchain) => (
          <Wordchain wordchain={wordchain} key={wordchain.order} className='wordchain' />
        ))}
      </WordchainList>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          value={word}
          onChange={(e) => handleChange(e.target.value)}
          placeholder='단어를 입력해주세요. (단, 표준국어대사전에 있는 단어만 사용할 수 있어요.)'
        />
        <SubmitButton>
          <PaperAirplaneIcon />
        </SubmitButton>
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

const SubmitButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 20px;
  height: 20px;
`;
