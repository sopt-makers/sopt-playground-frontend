import styled from '@emotion/styled';
import PaperAirplaneIcon from 'public/icons/icon-paper-airplane.svg';
import { FormEvent } from 'react';

import { useGetWordchain } from '@/api/endpoint/wordchain/getWordchain';
import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';
import { colors } from '@/styles/colors';

export default function WordchainChatting() {
  const { data: wordchainData } = useGetWordchain({ limit: 50 });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      <WordchainList>
        {wordchainData?.pages.map((wordchain) => (
          <Wordchain wordchain={wordchain} key={wordchain.order} className='wordchain' />
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
