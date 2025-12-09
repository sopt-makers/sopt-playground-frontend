import { useRouter } from 'next/router';
import Text from '@/components/common/Text';
import { colors } from '@sopt-makers/colors';
import { Spacing } from '@toss/emotion-utils';
import promotion from '@/public/icons/img/popup/member_match.png';
import { Button } from '@sopt-makers/ui';
import styled from '@emotion/styled';
import { MemberCard } from '@/components/matchmember/MemberCard';
import { playgroundLink } from '@/constants/links';
import { BalanceGameValue, ChoiceSide, QuestionKey, QUESTIONS } from '@/components/matchmember/constant';

interface MatchContentProps {
  step: number;
  value: BalanceGameValue;
  onChange: (key: QuestionKey, side: ChoiceSide) => void;
  onNextStep: () => void;
}

export const MatchContent = ({ step, value, onChange, onNextStep }: MatchContentProps) => {
  const router = useRouter();

  if (step === 1)
    return (
      <>
        <Text typography='SUIT_14_SB' color='#FFCA00'>
          나와 합숙할
        </Text>
        <Text typography='SUIT_20_B' color={colors.gray10}>
          찰떡 케미 앱잼 멤버 찾기!
        </Text>
        <Spacing size={20} />
        <img src={promotion.src} />
        <Spacing size={24} />
        <Button size='lg' onClick={onNextStep}>
          5초만에 소울메이트 찾기
        </Button>
      </>
    );

  if (step === 2) {
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
        <Button size='lg' onClick={onNextStep}>
          결과 확인하기
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
      <Button size='lg' onClick={() => router.push(playgroundLink.memberList())}>
        나랑 찰떡 멤버 더 찾아보기
      </Button>
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
