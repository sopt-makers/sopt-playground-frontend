import styled from '@emotion/styled';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import PaperAirplaneIcon from 'public/icons/icon-paper-airplane.svg';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { useGetWordchain, UseGetWordchainResponse, wordChainQueryKey } from '@/api/endpoint/wordchain/getWordchain';
import { usePostWord } from '@/api/endpoint/wordchain/postWord';
import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const LIMIT = 50;

export default function WordchainChatting() {
  const { data: wordchainData } = useGetWordchain({
    limit: LIMIT,
  });
  const [word, setWord] = useState('');
  const queryClient = useQueryClient();
  const { mutate: mutatePostWord } = usePostWord({
    onSuccess: ({ word, user }) => {
      setWord('');
      queryClient.invalidateQueries([wordChainQueryKey.getRecentWordchain]);
      queryClient.setQueryData<InfiniteData<UseGetWordchainResponse>>(
        [wordChainQueryKey.getWordchain, LIMIT],
        (old) => {
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
        },
      );
      scrollToBottom();
    },
    onError: (error) => {
      if (typeof error.response?.data !== 'string') {
        return;
      }
      const split = error.response.data.split(' : ');
      if (split.length !== 2) {
        return;
      }
      setError({ isError: true, errorMessage: split[1] });
      const timer = setTimeout(() => {
        setError((prev) => ({ ...prev, isError: false }));
        clearTimeout(timer);
      }, 2000);
    },
  });
  const wordchainListRef = useRef<HTMLDivElement>(null);
  const [{ isError, errorMessage }, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wordchainData || word.length < 1) {
      return;
    }
    const wordchainList = wordchainData.pages;
    await mutatePostWord({ wordchainId: wordchainList[wordchainList.length - 1].id, word });
  };

  const handleChange = (value: string) => {
    setWord(value);
  };

  const scrollToBottom = () => {
    if (wordchainListRef.current) {
      wordchainListRef.current.scrollTop = wordchainListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [wordchainData]);

  return (
    <Container>
      <WordchainList ref={wordchainListRef}>
        {wordchainData?.pages.map((wordchain) => (
          <Wordchain wordchain={wordchain} key={wordchain.order} className='wordchain' />
        ))}
      </WordchainList>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          value={word}
          onChange={(e) => handleChange(e.target.value)}
          placeholder='단어를 입력해주세요. (단, 표준국어대사전에 있는 단어만 사용할 수 있어요.)'
          isError={isError}
        />
        <SubmitButton>
          <PaperAirplaneIcon />
        </SubmitButton>
        <ErrorMessage isVisible={isError}>
          {WaringIconSvg}
          {errorMessage}
        </ErrorMessage>
        <Triangle isVisible={isError} />
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

const StyledInput = styled.input<{ isError: boolean }>`
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
    border-color: ${({ isError }) => (isError ? colors.red100 : colors.purple100)};
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 20px;
  height: 20px;
`;

const ErrorMessage = styled.div<{ isVisible: boolean }>`
  display: flex;
  position: absolute;
  right: 0;
  bottom: -52px;
  gap: 6px;
  align-items: center;
  transition: opacity 0.5s ease-in;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  border-radius: 10px;
  background-color: ${colors.red100};
  padding: 10px;
  width: fit-content;
  line-height: 130%;
  color: ${colors.white};

  ${textStyles.SUIT_14_M}
`;

const Triangle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 24px;
  bottom: -24px;
  transition: opacity 0.5s ease-in;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  border-right: 12px solid transparent;
  border-bottom: calc(12px * 1.732) solid ${colors.red100};
  border-left: 12px solid transparent;
  width: 0;
  height: 0;
`;

const WaringIconSvg = (
  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='14' height='14' rx='7' fill='#FCFCFC' />
    <path d='M7.00586 4L7.00586 7' stroke='#D33A3A' stroke-linecap='round' stroke-linejoin='round' />
    <path
      d='M7.00586 10L6.99919 10'
      stroke='#D33A3A'
      stroke-width='1.2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);
