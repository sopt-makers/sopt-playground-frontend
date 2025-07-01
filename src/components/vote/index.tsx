import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { usePostVoteMutation } from '@/api/endpoint/feed/postVote';
import Text from '@/components/common/Text';
import { getParentCategoryId } from '@/components/feed/common/utils';
import RadioBox from '@/components/vote/RadioBox';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheckSquare } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type VoteOption = {
  id: number;
  content: string;
  voteCount: number;
  votePercent: number;
  isSelected: boolean;
};

interface VoteProps {
  postId: number;
  categoryId: number;
  isMultiple: boolean;
  isMine: boolean;
  hasVoted: boolean;
  options: VoteOption[];
  totalParticipants: number;
}

const Vote = ({ postId, categoryId, isMine, hasVoted, options, isMultiple, totalParticipants }: VoteProps) => {
  const [isResult, setIsResult] = useState(hasVoted);
  const [mode, setMode] = useState<'view' | 'select'>(hasVoted ? 'view' : 'select');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const maxVoteCount = Math.max(...options.map((o) => o.voteCount));

  const { mutate: vote } = usePostVoteMutation(postId, categoryId, {
    onSuccess: () => {
      setIsResult(true);
      setMode('view');
    },
  });

  const toggleOption = (id: number) => {
    if (mode !== 'select') return;
    if (isMultiple) {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    } else {
      setSelectedIds([id]);
    }
  };

  useEffect(() => {
    setIsResult(hasVoted);
    setMode(hasVoted ? 'view' : 'select');
  }, [hasVoted]);

  return (
    <Container>
      <Title>
        <CheckedIcon />
        투표
      </Title>
      <RadioWrapper>
        {options.map((option) => (
          <RadioBox
            key={option.id}
            {...option}
            isResult={isResult}
            isWinner={mode === 'view' && option.voteCount === maxVoteCount}
            mode={mode}
            isSelected={option.isSelected || selectedIds.includes(option.id)}
            onClick={(e) => {
              e.preventDefault();
              if (mode === 'select') toggleOption(option.id);
            }}
          />
        ))}
      </RadioWrapper>
      <ButtonContainer>
        <ButtonWrapper>
          {mode === 'select' && (
            <Button
              size='sm'
              disabled={selectedIds.length === 0}
              onClick={(e) => {
                e.preventDefault();
                vote({ selectedOptions: [...selectedIds] });
              }}
            >
              투표하기
            </Button>
          )}
          {isMine && !hasVoted && (
            <Button
              size='sm'
              theme='black'
              onClick={(e) => {
                e.preventDefault();
                setIsResult((prev) => !prev);
                setMode(mode === 'view' ? 'select' : 'view');
                if (mode === 'select') {
                  setSelectedIds([]);
                }
              }}
            >
              {mode === 'view' ? '돌아가기' : '결과보기'}
            </Button>
          )}
        </ButtonWrapper>
        <Text typography='SUIT_13_M' color={colors.gray400}>
          {totalParticipants}명 참여 ∙ {isMultiple ? '복수 선택 가능' : '1개 선택 가능'}
        </Text>
      </ButtonContainer>
    </Container>
  );
};

export default Vote;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  border-radius: 12px;
  background: ${colors.gray900};
  padding: 16px;
  width: 100%;
`;

const Title = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${colors.gray10};
  font: ${fonts.LABEL_14_SB};
`;

const CheckedIcon = styled(IconCheckSquare)`
  width: 16px;
  height: 16px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  button {
    width: 100%;
  }
`;
