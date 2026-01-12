import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconAlertTriangle, IconPlus, IconTrash, IconWrite } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { useState } from 'react';

import { QuestionTab, useGetMemberQuestions } from '@/api/endpoint/members/getMemberQuestions';
import { usePostQuestionReaction } from '@/api/endpoint/members/postQuestionReaction';
import Pagination from '@/components/common/Pagination';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useDeleteQuestion } from '@/components/feed/common/hooks/useDeleteQuestion';
import { useReportQuestion } from '@/components/feed/common/hooks/useReportQuestion';
import { getRelativeTime } from '@/components/feed/common/utils';
import FeedCard from '@/components/feed/list/FeedCard';

interface AskTabContentProps {
  memberId: string;
  memberName: string;
  meId?: number;
  unansweredCount?: number;
}

const ITEMS_PER_PAGE = 5;

const AskTabContent = ({ memberId, memberName, meId, unansweredCount }: AskTabContentProps) => {
  const [selectedTab, setSelectedTab] = useState<QuestionTab>('answered');
  const [currentPage, setCurrentPage] = useState(1);

  const isMyProfile = meId !== undefined && String(meId) === memberId;

  const { handleDeleteQuestion } = useDeleteQuestion();
  const { mutate: reactToQuestion } = usePostQuestionReaction();
  const { handleReportQuestion } = useReportQuestion();

  const { data: tabData, isLoading: isTabLoading } = useGetMemberQuestions({
    memberId,
    tab: selectedTab,
    page: currentPage - 1,
    size: ITEMS_PER_PAGE,
  });

  const { data: answeredPeek, isLoading: isAnsweredPeekLoading } = useGetMemberQuestions({
    memberId,
    tab: 'answered',
    page: 0,
    size: 1,
  });

  const { data: unansweredPeek, isLoading: isUnansweredPeekLoading } = useGetMemberQuestions({
    memberId,
    tab: 'unanswered',
    page: 0,
    size: 1,
  });

  const isLoading = isTabLoading || isAnsweredPeekLoading || isUnansweredPeekLoading;

  const questions = tabData?.questions ?? [];
  const totalPages = tabData?.totalPages ?? 1;

  const hasAnswered = (answeredPeek?.questions?.length ?? 0) > 0;
  const hasUnanswered = (unansweredPeek?.questions?.length ?? 0) > 0;
  const hasAnyQuestions = hasAnswered || hasUnanswered;

  const handleTabChange = (tab: QuestionTab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <Container>
        <EmptyState>로딩 중...</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {!hasAnyQuestions ? (
        <EmptyContainer>
          <EmptyTitle>아직 질문이 없어요.</EmptyTitle>
          <EmptyState>
            {isMyProfile
              ? '새로운 질문이 들어오면 문자로 알려드릴게요.'
              : `${memberName}님에게 첫 번째로 질문해볼까요?`}
          </EmptyState>
        </EmptyContainer>
      ) : (
        <>
          <TabButtons>
            <Button
              onClick={() => handleTabChange('answered')}
              rounded='lg'
              theme={selectedTab === 'answered' ? 'white' : 'black'}
            >
              답변완료
            </Button>
            <Button
              onClick={() => handleTabChange('unanswered')}
              rounded='lg'
              theme={selectedTab === 'unanswered' ? 'white' : 'black'}
            >
              새질문
            </Button>
          </TabButtons>

          {selectedTab === 'unanswered' && isMyProfile && unansweredCount && unansweredCount > 0 && (
            <UnansweredNotice>
              <UnansweredCount>{unansweredCount}개</UnansweredCount>의 질문이 답변을 기다리고 있어요
            </UnansweredNotice>
          )}

          {questions.length === 0 ? (
            <EmptyContainer>
              <EmptyTitle>
                {selectedTab === 'answered'
                  ? '아직 답변된 질문이 없어요.'
                  : isMyProfile
                  ? '모든 질문에 답변했어요'
                  : '새로운 질문이 없어요.'}
              </EmptyTitle>
              <EmptyState>
                {selectedTab === 'answered'
                  ? `${memberName}님에게 새로운 질문을 해볼까요?`
                  : isMyProfile
                  ? '새로운 질문이 들어오면 문자로 알려드릴게요.'
                  : `${memberName}님에게 새로운 질문을 해볼까요?`}
              </EmptyState>
            </EmptyContainer>
          ) : (
            <>
              <QuestionList>
                {questions.map((question) => {
                  const createdDate = new Date(question.createdAt);
                  const now = new Date();
                  const diffInDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                  const isNewQuestion = diffInDays <= 7;

                  return (
                    <FeedCard
                      key={question.questionId}
                      profileImage={question.isAnonymous ? null : question.askerProfileImage}
                      name={
                        question.isAnonymous
                          ? question.anonymousProfile?.nickname ?? '익명'
                          : question.askerName ?? '익명'
                      }
                      info={
                        <>
                          <span style={{ margin: '0 4px' }}>·</span>
                          {question.askerLatestGeneration}
                          <span style={{ margin: '0 4px' }}>·</span>
                          {getRelativeTime(question.createdAt)}
                        </>
                      }
                      title=''
                      content={question.content}
                      createdAt={question.createdAt}
                      isBlindWriter={question.isAnonymous}
                      anonymousProfile={question.anonymousProfile}
                      isQuestion={true}
                      commentLength={0}
                      hits={0}
                      memberId={question.askerId ?? 0}
                      isShowInfo={true}
                      isNew={isNewQuestion}
                      isAskMode={true}
                      rightIcon={
                        <FeedDropdown
                          trigger={
                            <Flex as='button'>
                              <FeedCard.Icon />
                            </Flex>
                          }
                        >
                          {question.isMine ? (
                            <>
                              {!question.isAnswered && (
                                <Link
                                  href={`/members/ask/edit/${question.questionId}`}
                                  onClick={() => {
                                    sessionStorage.setItem(
                                      `ask-edit-${question.questionId}`,
                                      JSON.stringify({
                                        content: question.content,
                                        isAnonymous: question.isAnonymous,
                                      }),
                                    );
                                  }}
                                >
                                  <FeedDropdown.Item>
                                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10} ` }}>
                                      <IconWrite css={{ width: '16px', height: '16px' }} />
                                      수정
                                    </Flex>
                                  </FeedDropdown.Item>
                                </Link>
                              )}
                              {!question.isAnswered && (
                                <FeedDropdown.Item
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteQuestion({
                                      questionId: question.questionId,
                                    });
                                  }}
                                >
                                  <Flex align='center' css={{ gap: '10px' }}>
                                    <IconTrash css={{ width: '16px', height: '16px' }} />
                                    삭제
                                  </Flex>
                                </FeedDropdown.Item>
                              )}
                            </>
                          ) : isMyProfile ? (
                            <>
                              {!question.isAnswered && (
                                <FeedDropdown.Item
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteQuestion({
                                      questionId: question.questionId,
                                    });
                                  }}
                                >
                                  <Flex align='center' css={{ gap: '10px' }}>
                                    <IconTrash css={{ width: '16px', height: '16px' }} />
                                    삭제
                                  </Flex>
                                </FeedDropdown.Item>
                              )}
                              <FeedDropdown.Item
                                type='danger'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReportQuestion({ questionId: question.questionId });
                                }}
                              >
                                <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                                  <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                                  신고
                                </Flex>
                              </FeedDropdown.Item>
                            </>
                          ) : (
                            <FeedDropdown.Item
                              type='danger'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReportQuestion({ questionId: question.questionId });
                              }}
                            >
                              <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                                <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                                신고
                              </Flex>
                            </FeedDropdown.Item>
                          )}
                        </FeedDropdown>
                      }
                      like={
                        <FeedLike
                          likes={question.reactionCount}
                          isLiked={question.isReacted}
                          type='thumb'
                          onClick={
                            question.isReceived
                              ? undefined
                              : () => {
                                  reactToQuestion(question.questionId);
                                }
                          }
                        />
                      }
                      isSopticle={false}
                      sopticleUrl=''
                      thumbnailUrl=''
                      answer={
                        question.isAnswered && question.answer ? (
                          <AnswerSection>
                            <AnswerLabel>답변</AnswerLabel>
                            <AnswerContent>{question.answer.content}</AnswerContent>
                            <AnswerDate>{getRelativeTime(question.answer.createdAt)}</AnswerDate>
                          </AnswerSection>
                        ) : isMyProfile && !question.isAnswered ? (
                          <AnswerButtonSection>
                            <Link
                              href={`/members/ask/answer/${question.questionId}`}
                              onClick={() => {
                                if (typeof window === 'undefined') return;
                                sessionStorage.setItem(`ask-answer-${question.questionId}`, JSON.stringify(question));
                              }}
                            >
                              <AnswerButton theme='white' size='md'>
                                답변 작성하기
                              </AnswerButton>
                            </Link>
                          </AnswerButtonSection>
                        ) : undefined
                      }
                    />
                  );
                })}
              </QuestionList>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </>
      )}

      <FabSticky>
        <Link href={`/members/ask/upload?memberId=${memberId}`}>
          <Button LeftIcon={IconPlus} rounded='lg'>
            작성
          </Button>
        </Link>
      </FabSticky>
    </Container>
  );
};

export default AskTabContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  margin-top: 100px;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 4px;
`;

const UnansweredNotice = styled.div`
  color: ${colors.white};

  ${fonts.TITLE_20_SB}
`;

const UnansweredCount = styled.span`
  color: ${colors.yellow400};
`;

const QuestionList = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  border-left: 3px solid #ddd;
  background: #fff;
  padding: 12px;
`;

const AnswerButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AnswerButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AnswerLabel = styled.span`
  color: #666;
  font-size: 12px;
  font-weight: 600;
`;

const AnswerContent = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #333;
  font-size: 14px;
`;

const AnswerDate = styled.span`
  color: #999;
  font-size: 11px;
`;

const EmptyTitle = styled.h1`
  ${fonts.HEADING_20_B}

  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${colors.gray300};
  ${fonts.BODY_14_M};
`;

const FabSticky = styled.div`
  display: flex;
  position: fixed;
  bottom: 52px;
  justify-content: flex-end;
  margin-top: auto;
`;
