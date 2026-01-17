import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconAlertTriangle, IconChevronDown, IconPlus, IconTrash, IconWrite } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { QuestionTab, useGetMemberQuestions } from '@/api/endpoint/members/getMemberQuestions';
import { useGetMyLatestAnsweredQuestion } from '@/api/endpoint/members/getMyLatestAnsweredQuestion';
import { usePostQuestionReaction } from '@/api/endpoint/members/postQuestionReaction';
import Pagination from '@/components/common/Pagination';
import Text from '@/components/common/Text';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useDeleteQuestion } from '@/components/feed/common/hooks/useDeleteQuestion';
import { useReportQuestion } from '@/components/feed/common/hooks/useReportQuestion';
import { getRelativeTime } from '@/components/feed/common/utils';
import FeedCard from '@/components/feed/list/FeedCard';
import { zIndex } from '@/styles/zIndex';

import AskReply from './AskReply';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface AskTabContentProps {
  memberId: string;
  memberName: string;
  meId?: number;
  unansweredCount?: number;
}

const ITEMS_PER_PAGE = 5;

const AskTabContent = ({ memberId, memberName, meId, unansweredCount }: AskTabContentProps) => {
  const router = useRouter();
  const isMyProfile = meId !== undefined && String(meId) === memberId;

  const defaultTab = isMyProfile ? 'unanswered' : 'answered';
  const questionTabFromQuery = (router.query.questionTab as QuestionTab) ?? defaultTab;

  const [selectedTab, setSelectedTab] = useState<QuestionTab>(questionTabFromQuery);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedTab(questionTabFromQuery);
    setCurrentPage(1);
  }, [questionTabFromQuery]);

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

  const [scrollTargetIndex, setScrollTargetIndex] = useState<number | null>(null);

  const { data: latestAnswered } = useGetMyLatestAnsweredQuestion(isMyProfile ? null : Number(memberId));
  const hasLatestAnswered =
    latestAnswered != null &&
    (latestAnswered.questionId != null || latestAnswered.page != null || latestAnswered.index != null);
  const shouldShowBanner = !isMyProfile && hasLatestAnswered;

  const isLoading = isTabLoading || isAnsweredPeekLoading || isUnansweredPeekLoading;

  const questions = useMemo(() => tabData?.questions ?? [], [tabData?.questions]);
  const totalPages = tabData?.totalPages ?? 1;

  const hasAnswered = (answeredPeek?.questions?.length ?? 0) > 0;
  const hasUnanswered = (unansweredPeek?.questions?.length ?? 0) > 0;
  const hasAnyQuestions = hasAnswered || hasUnanswered;

  const handleTabChange = (questionTab: QuestionTab) => {
    const { page: _page, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...restQuery, questionTab },
      },
      undefined,
      { shallow: true },
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoLatestAnswered = () => {
    if (latestAnswered?.page == null || latestAnswered?.index == null) return;
    const { page: _page, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...restQuery, questionTab: 'answered' },
      },
      undefined,
      { shallow: true },
    );
    setCurrentPage(latestAnswered.page + 1);
    setScrollTargetIndex(latestAnswered.index);
  };

  useEffect(() => {
    if (selectedTab !== 'answered' || scrollTargetIndex == null || questions.length === 0) return;

    if (isLoading) return;

    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-ask-index="${scrollTargetIndex}"]`);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setScrollTargetIndex(null);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedTab, currentPage, questions, scrollTargetIndex, isLoading]);

  if (isLoading) {
    return (
      <Container>
        <EmptyState>로딩 중...</EmptyState>
      </Container>
    );
  }
  if (!memberId) return null;

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

          {selectedTab === 'unanswered' && isMyProfile && (unansweredCount ?? 0) > 0 && (
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
              {shouldShowBanner && (
                <AnsweredBanner onClick={handleGoLatestAnswered}>
                  <Text typography='SUIT_14_SB' color={colors.white}>
                    내 질문에 답변이 달렸어요.
                  </Text>
                  <BannerRight>
                    <Text typography='SUIT_14_SB' color={colors.gray50}>
                      보러가기
                    </Text>
                    <StyledChevronDown />
                  </BannerRight>
                </AnsweredBanner>
              )}
              <QuestionList>
                {questions.map((question, idx) => {
                  const createdDate = new Date(question.createdAt);
                  const now = new Date();
                  const diffInDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                  const isNewQuestion = diffInDays <= 7;

                  return (
                    <div data-ask-index={idx} key={question.questionId}>
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
                                  <FeedDropdown.Item
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      sessionStorage.setItem(
                                        `ask-edit-${question.questionId}`,
                                        JSON.stringify({
                                          content: question.content,
                                          isAnonymous: question.isAnonymous,
                                          receiverId: memberId,
                                        }),
                                      );
                                      router.push(`/members/ask/edit/${question.questionId}`);
                                    }}
                                  >
                                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                                      <IconWrite css={{ width: '16px', height: '16px' }} />
                                      수정
                                    </Flex>
                                  </FeedDropdown.Item>
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
                            onClick={() => {
                              reactToQuestion(question.questionId);
                            }}
                          />
                        }
                        isSopticle={false}
                        sopticleUrl=''
                        thumbnailUrl=''
                        answer={
                          question.isAnswered && question.answer ? (
                            <AskReply
                              question={question}
                              answererName={memberName}
                              profileImage={question.answer.profileImage ?? ''}
                              isMyProfile={isMyProfile}
                            />
                          ) : isMyProfile && !question.isAnswered ? (
                            <AnswerButtonSection>
                              <AnswerButton
                                theme='white'
                                size='md'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (typeof window !== 'undefined') {
                                    sessionStorage.setItem(
                                      `ask-answer-${question.questionId}`,
                                      JSON.stringify(question),
                                    );
                                  }

                                  router.push(`/members/ask/answer/${question.questionId}`);
                                }}
                              >
                                답변 작성하기
                              </AnswerButton>
                            </AnswerButtonSection>
                          ) : undefined
                        }
                      />
                    </div>
                  );
                })}
              </QuestionList>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </>
      )}

      {!isMyProfile && (
        <FabSticky>
          <Link href={`/members/ask/upload?memberId=${memberId}`}>
            <Fab LeftIcon={IconPlus}>
              질문
            </Fab>
          </Link>
        </FabSticky>
      )}
    </Container>
  );
};

export default AskTabContent;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;
  max-width: 790px;
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
  flex-direction: column;
  gap: 16px;
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
  position: fixed;
  bottom: 72px;
  align-self: flex-end;
  z-index: ${zIndex.헤더 + 1};
  margin-top: auto;
  width: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    bottom: 32px;
  }
`;

const Fab = styled(Button)`
  align-content: center;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${colors.white};
  padding: 12px 14px;
`;

const AnsweredBanner = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 8px;
  background: ${colors.blue400};
  cursor: pointer;
  padding: 12px 16px;
  height: 44px;
`;

const BannerRight = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledChevronDown = styled(IconChevronDown)`
  width: 16px;
  height: 16px;
  color: ${colors.white};
`;
