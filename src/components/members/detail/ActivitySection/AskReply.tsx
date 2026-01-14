import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconFlipForward } from '@sopt-makers/icons';
import { IconAlertTriangle, IconTrash, IconWrite } from '@sopt-makers/icons';
import { IconDotsVertical } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';

import { usePostQuestionReaction } from '@/api/endpoint/members/postQuestionReaction';
import useModalState from '@/components/common/Modal/useModalState';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import useToast from '@/components/common/Toast/useToast';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { getRelativeTime } from '@/components/feed/common/utils';
import { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import MessageModal from '@/components/members/detail/MessageSection/MessageModal';
import { useRouter } from 'next/router';
import { MemberQuestion } from '@/api/endpoint/members/getMemberQuestions';
import { useDeleteQuestionAnswer } from '@/components/feed/common/hooks/useDeleteQuestion';
interface AskReplyProps {
   question: MemberQuestion;      
  answererName: string;       
  profileImage: string;
  isMyProfile: boolean; 
}
export default function AskReply({
question, answererName, profileImage, isMyProfile
}: AskReplyProps) {
  const answer = question.answer;
  if (!answer) return null;
  const { answerId, content, createdAt, reactionCount, isReacted } = answer;
  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const { mutate: handleToggleLikeAskAnswer } = usePostQuestionReaction();
  const router = useRouter();
  const { handleDeleteQuestionAnswer } = useDeleteQuestionAnswer();


  const handleClickMessageButton = () => {
    // TODO: 전화번호 데이터 확인 요망
    // if (isEmptyPhone) {
    //   toast.show({ message: `해당 유저는 전화번호를 등록하지 않아 쪽지를 보낼 수 없어요.` });
    // } else {
    onOpenMessageModal();
    //}
  };
  const isMine = question.isMine;
  return (
    <AskReplyContainer>
      <AskReplyHeader>
        <HeaderLeft>
          <IconFlipForward style={{ width: 16, height: 16, color: colors.white, transform: 'scale(1, -1)' }} />
          <ProfileWrapper>
            <ProfileImage src={profileImage} width={32} height={32} />
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
                      sessionStorage.setItem(
                        `ask-answer-edit-${answerId}`,
                        JSON.stringify(question),
                      );
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
                    handleDeleteQuestionAnswer({answerId: answerId});
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
      <Content>{content}</Content>
      <ButtonWrapper>
        <FeedLike
          isLiked={isReacted}
          likes={reactionCount}
          type='helpful'
          onClick={() => {
            //TODO: 도움돼요 로직
            handleToggleLikeAskAnswer(answerId);
          }}
        ></FeedLike>
      </ButtonWrapper>
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

const AskReplyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

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
