import styled from '@emotion/styled';

import StartWordChatMessage from '@/components/wordchain/StartWordChatMessage';
import { Word } from '@/components/wordchain/types';
import WordChatMessage from '@/components/wordchain/WordChatMessage';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface WordchainProps {
  count: number;
  start: {
    word: string;
    userName: string;
  };
  wordList: Word[];
}

export default function Wordchain({ start, count, wordList }: WordchainProps) {
  return (
    <Container>
      <InitMessage>
        ‘{start.userName}’님이 {count}번째 끝말잇기를 시작했어요!
      </InitMessage>
      <StartWordChatMessage word='버디버디' />
      <WordChatMessageList>
        {wordList.map(({ user, content }) => (
          <WordChatMessage word={content} user={user} key={`${count}-${content}`} />
        ))}
      </WordChatMessageList>
      <GiveUpButton> 😅 이어나갈 단어가 떠오르지 않는다면?</GiveUpButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InitMessage = styled.div`
  margin-top: 10px;
  border-radius: 20px;
  background-color: ${colors.black40};
  padding: 4px 8px;
  width: fit-content;
  line-height: 120%;
  color: ${colors.gray60};

  ${textStyles.SUIT_13_M}
`;

const WordChatMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
  width: 100%;
`;

const GiveUpButton = styled.button`
  margin-top: 40px;
  text-decoration-line: underline;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M}
`;
