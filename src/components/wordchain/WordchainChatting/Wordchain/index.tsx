import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import TrophyIcon from 'public/icons/icon-trophy.svg';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetCurrentWinnerName } from '@/api/endpoint/wordchain/getWordchain';
import { useNewGameMutation } from '@/api/endpoint/wordchain/newGame';
import { Confirm } from '@/components/common/Modal/Confirm';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import StartWordChatMessage from '@/components/wordchain/WordchainChatting/StartWordChatMessage';
import { Word } from '@/components/wordchain/WordchainChatting/types';
import WordChatMessage from '@/components/wordchain/WordchainChatting/WordChatMessage';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type WordchainProps =
  | {
      id: number;
      isProgress: true;
      winnerName: null;
      initial: {
        word: string;
        userName: string;
      };
      order: number;
      wordList: Word[];

      className?: string;
    }
  | {
      id: number;
      isProgress: false;
      winnerName: string;
      initial: {
        word: string;
        userName: string;
      };
      order: number;
      wordList: Word[];

      className?: string;
    };

export default function Wordchain({ initial, order, wordList, isProgress, winnerName, className }: WordchainProps) {
  const { logSubmitEvent } = useEventLogger();
  const { data: currentWinnerName } = useGetCurrentWinnerName();
  const { mutate } = useNewGameMutation();
  const { data: me } = useGetMemberOfMe();
  const queryClient = useQueryClient();

  const onClickGiveUp = async () => {
    const confirm = await Confirm({
      title: '정말 포기하시겠어요?',
      content: `지금 포기하면 '${currentWinnerName ?? ''}'님이 우승자가 돼요.`,
      cancelText: '돌아가기',
      okText: '새로 시작하기',
    });
    if (confirm) {
      mutate(undefined, {
        onSuccess: () => {
          logSubmitEvent('wordchainNewGame');
          queryClient.invalidateQueries(['getWordchainWinners']);
        },
      });
    }
  };

  return (
    <Container className={className}>
      <InitMessage>
        {order === 1 ? `첫 끝말잇기가 시작됐어요!` : `‘${initial.userName}’님이 ${order}번째 끝말잇기를 시작했어요!`}
      </InitMessage>
      <StartWordChatMessage word={initial.word} />
      <WordChatMessageList>
        {wordList.map(({ user, content }, index) => (
          <WordChatMessage word={content} user={user} key={`${order}-${content}-${index}`} />
        ))}
      </WordChatMessageList>
      {isProgress ? (
        wordList.length > 0 &&
        wordList[wordList.length - 1].user.id !== me?.id && (
          <GiveUpButton onClick={onClickGiveUp}> 😅 이어나갈 단어가 떠오르지 않는다면?</GiveUpButton>
        )
      ) : winnerName?.length ? (
        <WinnerMessage>
          <TrophyIconWrapper>
            <TrophyIcon />
          </TrophyIconWrapper>
          {`${order}번째 우승자는 ‘${winnerName}'님 입니다!`}
        </WinnerMessage>
      ) : (
        <></>
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
  margin-bottom: 16px;
  border-radius: 20px;
  background-color: ${colors.black40};
  padding: 4px 8px;
  width: fit-content;
  line-height: 120%;
  color: ${colors.gray60};

  ${textStyles.SUIT_13_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 8px;

    ${textStyles.SUIT_10_M}
  }
`;

const WordChatMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin-top: 8px;
  }
`;

const GiveUpButton = styled.button`
  margin-top: 40px;
  text-decoration-line: underline;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;

    ${textStyles.SUIT_10_M}
  }
`;

const WinnerMessage = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: flex-end;
  margin-top: 12px;
  margin-right: 54px;
  line-height: 100%;
  color: ${colors.white100};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 6px;

    ${textStyles.SUIT_12_M}
  }
`;

const TrophyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.orange100};
  width: 20px;
  height: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 16px;
    height: 16px;

    & > svg {
      width: 12px;
      height: 11px;
    }
  }
`;
