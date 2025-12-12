import { useRouter } from 'next/router';
import Text from '@/components/common/Text';
import { colors } from '@sopt-makers/colors';
import { Spacing } from '@toss/emotion-utils';
import promotion from '@/public/icons/img/popup/member_match.png';
import { Button } from '@sopt-makers/ui';
import styled from '@emotion/styled';
import { MemberCard } from '@/components/matchmember/MemberCard';
import { playgroundLink } from '@/constants/links';
import {
  BalanceGameValue,
  ChoiceSide,
  convertAnswersToApiPayload,
  QuestionKey,
  QUESTIONS,
} from '@/components/matchmember/constant';
import { usePostWorkPreferenceMutation } from '@/api/endpoint/members/postWorkPreference';
import Loading from '@/components/common/Loading';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface MatchContentProps {
  step: number;
  value: BalanceGameValue;
  onChange: (key: QuestionKey, side: ChoiceSide) => void;
  onNextStep: () => void;
  handleClose: () => void;
  handleCloseForToday: () => void;
}

export const MatchContent = ({
  step,
  value,
  onChange,
  onNextStep,
  handleClose,
  handleCloseForToday,
}: MatchContentProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = usePostWorkPreferenceMutation();
  const isValid = QUESTIONS.every((q) => value[q.key] !== undefined);
  const { logSubmitEvent } = useEventLogger();

  if (step === 1) {
    return (
      <>
        <Text typography='SUIT_14_SB' color='#FFCA00'>
          나와 합숙할
        </Text>
        <Text typography='SUIT_20_B' color={colors.gray10}>
          찰떡 케미 앱잼 멤버 찾기!
        </Text>
        <Spacing size={20} />
        <img src={promotion.src} alt='찰떡 케미 앱잼 멤버 찾기' />
        <Spacing size={24} />
        <LoggingClick eventKey='balancegame'>
          <Button size='lg' onClick={onNextStep}>
            앱잼 소울메이트 보러가기
          </Button>
        </LoggingClick>
        <CloseForTodayButton
          onClick={() => {
            handleCloseForToday();
            handleClose();
          }}
        >
          <Text typography='SUIT_14_SB' color={colors.gray200}>
            다시 보지 않기
          </Text>
        </CloseForTodayButton>
      </>
    );
  }

  if (step === 2) {
    const handleSubmit = async () => {
      if (!isValid || isPending) return;

      try {
        await mutateAsync(convertAnswersToApiPayload(value));
        logSubmitEvent('balancegame');
        onNextStep();
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <>
        <Text typography='SUIT_14_SB' color='#FFCA00'>
          작업 방식 밸런스 게임!
        </Text>
        <Text typography='SUIT_20_B' color={colors.white}>
          선호하는 작업 방식을 선택 해주세요.
        </Text>
        <Spacing size={20} />
        <QuestionList>
          {QUESTIONS.map((q) => (
            <QuestionRow key={q.key}>
              <Button
                size='md'
                theme={value[q.key] === 'left' ? 'blue' : 'black'}
                onClick={() => onChange(q.key, 'left')}
              >
                {q.left.label}
              </Button>
              <Text typography='SUIT_16_SB' color={colors.gray100}>
                vs
              </Text>
              <Button
                size='md'
                theme={value[q.key] === 'right' ? 'blue' : 'black'}
                onClick={() => onChange(q.key, 'right')}
              >
                {q.right.label}
              </Button>
            </QuestionRow>
          ))}
        </QuestionList>
        <Spacing size={24} />
        <Button size='lg' disabled={!isValid || isPending} onClick={handleSubmit}>
          {isPending ? <Loading color='white' /> : '결과 확인하기'}
        </Button>
      </>
    );
  }
  return (
    <>
      <Text typography='SUIT_20_B' color={colors.gray10}>
        당신의 찰떡 멤버는...?!
      </Text>
      <Text typography='SUIT_14_M' color={colors.gray200}>
        아래 멤버 프로필을 눌러 더 알아보세요.
      </Text>
      <Spacing size={20} />
      <MemberCard />
      <Spacing size={24} />
      <LoggingClick eventKey='newmember'>
        <Button size='lg' onClick={() => router.push(playgroundLink.memberList())}>
          다른 찰떡 멤버도 확인하기
        </Button>
      </LoggingClick>
    </>
  );
};

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

const QuestionRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;

  & > button {
    flex: 1;
  }
`;

const CloseForTodayButton = styled.button`
  margin-top: 16px;
  text-decoration: underline;
  color: ${colors.gray200};
`;
