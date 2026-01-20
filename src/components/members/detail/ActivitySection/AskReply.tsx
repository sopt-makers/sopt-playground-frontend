import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconFlipForward, IconUser } from '@sopt-makers/icons';
import { IconAlertTriangle, IconTrash, IconWrite } from '@sopt-makers/icons';
import { IconDotsVertical } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MemberQuestion } from '@/api/endpoint/members/getMemberQuestions';
import { usePostAnswerReaction } from '@/api/endpoint/members/postAnswerReaction';
import useModalState from '@/components/common/Modal/useModalState';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useDeleteQuestionAnswer } from '@/components/feed/common/hooks/useDeleteQuestion';
import { getRelativeTime } from '@/components/feed/common/utils';
import { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import MessageModal from '@/components/members/detail/MessageSection/MessageModal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface AskReplyProps {
  question: MemberQuestion;
  answererName: string;
  profileImage: string;
  isMyProfile: boolean;
  isMine: boolean;
}
export default function AskReply({ question, answererName, profileImage, isMyProfile, isMine }: AskReplyProps) {
  const answer = question.answer;
  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const { mutate: handleToggleLikeAskAnswer } = usePostAnswerReaction();
  const router = useRouter();
  const { handleDeleteQuestionAnswer } = useDeleteQuestionAnswer();
  const [isExpanded, setIsExpanded] = useState(false);
  if (!answer) return null;
  const { answerId, content, createdAt, reactionCount, isReacted } = answer;

  const handleClickMessageButton = () => {
    // TODO: 전화번호 데이터 확인 요망
    // if (isEmptyPhone) {
    //   toast.show({ message: `해당 유저는 전화번호를 등록하지 않아 쪽지를 보낼 수 없어요.` });
    // } else {
    onOpenMessageModal();
    //}
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    if (content.length <= 140) {
      return content;
    }

    if (isExpanded) {
      return (
        <>
          {content}
          {'\n'}
          <MoreButton onClick={handleToggleExpand}>접기</MoreButton>
        </>
      );
    }

    return (
      <>
        {content.slice(0, 140)}...{'\n'}
        <MoreButton onClick={handleToggleExpand}>더보기</MoreButton>
      </>
    );
  };

  return (
    <AskReplyContainer>
      <AskReplyHeader>
        <HeaderLeft>
          <IconFlipForward style={{ width: 16, height: 16, color: colors.white, transform: 'scale(1, -1)' }} />
          <ProfileWrapper>
            <ImageBox>
              {profileImage ? (
                <ProfileImage src={profileImage} width={32} height={32} />
              ) : (
                <IconUser style={{ width: 22, height: 22, color: `${colors.gray400}`, paddingTop: '2px' }} />
              )}
            </ImageBox>
            <AnswerName>{answererName}</AnswerName>
            <AnswerDate>{getRelativeTime(createdAt)}</AnswerDate>
          </ProfileWrapper>
        </HeaderLeft>

        <FeedDropdown
          trigger={
            <Flex as='button'>
              <IconDotsVertical style={{ width: 20, height: 20, color: colors.white }} />
            </Flex>
          }
        >
          <>
            {isMyProfile && (
              <FeedDropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window === 'undefined' || !answerId) return;
                  sessionStorage.setItem(`ask-answer-edit-${answerId}`, JSON.stringify(question));
                  router.push(`/members/ask/answer/edit/${answerId}`);
                }}
              >
                <Flex align='center' css={{ gap: '10px', color: `${colors.gray10} ` }}>
                  <IconWrite css={{ width: '16px', height: '16px' }} />
                  수정
                </Flex>
              </FeedDropdown.Item>
            )}
            {isMyProfile && (
              <FeedDropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteQuestionAnswer({ answerId: answerId });
                }}
              >
                <Flex align='center' css={{ gap: '10px' }}>
                  <IconTrash css={{ width: '16px', height: '16px' }} />
                  삭제
                </Flex>
              </FeedDropdown.Item>
            )}
          </>
        </FeedDropdown>
      </AskReplyHeader>
      <Content>{renderContent()}</Content>
      <ButtonWrapper>
        <FeedLike
          isLiked={isReacted}
          likes={reactionCount}
          type='helpful'
          onClick={() => {
            handleToggleLikeAskAnswer(answerId);
          }}
        ></FeedLike>
      </ButtonWrapper>
      {isMine && (
        <SendMailWrapper>
          더 궁금한 내용이 있다면 쪽지로 대화를 이어갈 수 있어요.
          <Button
            style={{
              padding: '9px 14px',
              backgroundColor: 'rgb(255 255 255 / 17%)',
              color: colors.white,
              fontSize: '12px',
            }}
            onClick={handleClickMessageButton}
          >
            쪽지 보내기
          </Button>
        </SendMailWrapper>
      )}

      {isOpenMessageModal && (
        <MessageModal
          receiverId={`${answerId}`}
          name={answererName}
          profileImageUrl={profileImage}
          onClose={onCloseMessageModal}
          //TODO: 카테고리 확인 요망
          defaultCategory={MessageCategory.NETWORK}
        />
      )}
    </AskReplyContainer>
  );
}

const HeaderLeft = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const AnswerName = styled(Text)`
  ${fonts.LABEL_16_SB}

  color: ${colors.white};

  @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.LABEL_14_SB}
  }
`;
const ProfileImage = styled(ResizedImage)`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
const AnswerDate = styled.span`
  ${fonts.LABEL_14_SB}

  color: ${colors.gray400};
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ImageBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: ${colors.gray700};
  width: 32px;
  height: 32px;
  clip-path: circle(50%);
`;

const AskReplyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-all;

  ${fonts.BODY_16_R}

  color: ${colors.gray10};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SendMailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: linear-gradient(93deg, #27272d 4.36%, #205572 156.14%);
  padding: 14px 16px;
  width: 100%;
  ${fonts.LABEL_14_SB};
`;

const AskReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 20px 24px;
  width: 100%;
`;

const MoreButton = styled.span`
  cursor: pointer;
  ${fonts.LABEL_14_SB}

  color: ${colors.gray400};
`;
