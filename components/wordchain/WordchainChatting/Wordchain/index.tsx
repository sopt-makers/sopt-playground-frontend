import styled from '@emotion/styled';
import TrophyIcon from 'public/icons/icon-trophy.svg';

import { useGetRecentWordchain } from '@/api/endpoint/wordchain/getWordchain';
import { Confirm } from '@/components/common/Modal/Confirm';
import StartWordChatMessage from '@/components/wordchain/WordchainChatting/StartWordChatMessage';
import { WordchainInfo } from '@/components/wordchain/WordchainChatting/types';
import WordChatMessage from '@/components/wordchain/WordchainChatting/WordChatMessage';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface WordchainProps {
  wordchain: WordchainInfo;
  className?: string;
}

export default function Wordchain({ wordchain, className }: WordchainProps) {
  const { initial, order, wordList, isProgress, winnerName } = wordchain;
  const { data } = useGetRecentWordchain();

  const onClickGiveUp = async () => {
    const result = await Confirm({
      title: '정말 포기하시겠어요?',
      content: `지금 포기하면 '${data?.currentWinner.name}'님이 우승자가 돼요.`,
      cancelText: '돌아가기',
      okText: '새로 시작하기',
    });
    if (result) {
      // TODO: 종료 로직
      console.log('new Game!');
    }
  };

  return (
    <Container className={className}>
      <InitMessage>
        ‘{initial.userName}’님이 {order}번째 끝말잇기를 시작했어요!
      </InitMessage>
      <StartWordChatMessage word='버디버디' />
      <WordChatMessageList>
        {wordList.map(({ user, content }) => (
          <WordChatMessage word={content} user={user} key={`${order}-${content}`} />
        ))}
      </WordChatMessageList>
      {isProgress ? (
        <GiveUpButton onClick={onClickGiveUp}> 😅 이어나갈 단어가 떠오르지 않는다면?</GiveUpButton>
      ) : (
        <WinnerMessage>
          <TrophyIconWrapper>
            <TrophyIcon />
          </TrophyIconWrapper>
          {`25번째 우승자는 ‘${winnerName}'님 입니다!`}
        </WinnerMessage>
      )}
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

const WinnerMessage = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  line-height: 100%;
  color: ${colors.purple100};

  ${textStyles.SUIT_16_M}
`;

const TrophyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.purple100};
  width: 20px;
  height: 20px;
`;
