import { FC, useEffect, useMemo, useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import AskFormPage from '@/components/members/ask/AskFormPage';
import type { MemberQuestion } from '@/api/endpoint/members/getMemberQuestions';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { getRelativeTime } from '@/components/feed/common/utils';
import { setLayout } from '@/utils/layout';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import ResizedImage from '@/components/common/ResizedImage';
import { IconMember } from '@/components/feed/common/Icon';
import Link from 'next/link';
import { playgroundLink } from '@/constants/links';
import { usePostMemberQuestionAnswer } from '@/api/endpoint/members/postMemberAnswer';


const STORAGE_PREFIX = 'ask-answer-';

const AskAnswerPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const [question, setQuestion] = useState<MemberQuestion | null>(null);

  const questionId = useMemo(() => query?.id ?? '', [query?.id]);

  const questionIdNum = useMemo(() => {
    const n = Number(questionId);
    return Number.isNaN(n) ? null : n;
  }, [questionId]);

  const { mutateAsync: postAnswer, isPending } = usePostMemberQuestionAnswer();

  useEffect(() => {
    if (status !== 'success' || !questionId) return;

    const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${questionId}`);
    if (!stored) return;

    try {
      const parsed: MemberQuestion = JSON.parse(stored);
      setQuestion(parsed);
    } catch {
      // ignore
    }
  }, [status, questionId]);

  if (status === 'loading') return null;
  if (!questionId || questionIdNum == null || !question) return null;

  const handleSubmit = async ({ content }: { content: string; isAnonymous: boolean }) => {
    await postAnswer({
      questionId: questionIdNum,
      content,
    });

    sessionStorage.removeItem(`${STORAGE_PREFIX}${questionId}`);

    window.history.back();
  };

  const askerName = question.isAnonymous
    ? question.anonymousProfile?.nickname ?? '익명'
    : question.askerName ?? '익명';

  return (
    <AuthRequired>
      <AskFormPage
        onSubmit={handleSubmit}
        isSubmitting={isPending} 
        defaultValues={{
          content: '',
          isAnonymous: false,
        }}
        hideAnonymousToggle={true}
        commentSlot={
          <QuestionPreview>
            <QuestionHeader>
              {question.isAnonymous ? (
                <ProfileImageBox>
                  {question.anonymousProfile ? (
                    <ProfileImage
                      width={32}
                      height={32}
                      src={question.anonymousProfile?.profileImgUrl}
                      alt='anonymousProfileImage'
                    />
                  ) : (
                    <IconMember size={32} />
                  )}
                </ProfileImageBox>
              ) : (
                <Link href={playgroundLink.memberDetail(question.askerId as number)} css={{ height: 'fit-content' }}>
                  <ProfileImageBox>
                    {question.askerProfileImage ? (
                      <ProfileImage width={32} height={32} src={question.askerProfileImage} alt='profileImage' />
                    ) : (
                      <IconMember size={32} />
                    )}
                  </ProfileImageBox>
                </Link>
              )}

              <HeaderText>
                <NameRow>
                  <Name>{askerName}</Name>
                  <Meta>{getRelativeTime(question.createdAt)}</Meta>
                </NameRow>
              </HeaderText>
            </QuestionHeader>

            <QuestionBody>{question.content}</QuestionBody>

            <Divider />
          </QuestionPreview>
        }
      />
    </AuthRequired>
  );
};

setLayout(AskAnswerPage, 'empty');
export default AskAnswerPage;

/* styles 그대로 */
const QuestionPreview = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const QuestionHeader = styled.header`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ProfileImageBox = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const ProfileImage = styled(ResizedImage)`
  flex-shrink: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  min-width: 0;
`;

const Name = styled.div`
  ${fonts.HEADING_24_B}

  white-space: nowrap;
  color: ${colors.white};
`;

const Meta = styled.div`
  ${fonts.BODY_16_M}

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray400};
`;

const QuestionBody = styled.p`
  margin: 0;
  ${fonts.HEADING_24_B}

  line-height: 1.4;
  color: ${colors.gray50};
`;

const Divider = styled.hr`
  margin: 6px 0 2px;
  border: 0;
  background: ${colors.gray800};
  height: 1px;
`;
