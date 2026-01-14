import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconFlipForward } from '@sopt-makers/icons';
import { IconAlertTriangle, IconTrash, IconWrite } from '@sopt-makers/icons';
import { IconDotsVertical } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import Link from 'next/link';

import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { getRelativeTime } from '@/components/feed/common/utils';

interface AskReplyProps {
  createdAt: string;
  profileImage: string;
  answererName: string;
  content: string;
}
export default function AskReply({ createdAt, profileImage, answererName, content }: AskReplyProps) {
  const isMine = true;
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
          {/* TODO: 추후 isMine 추가 */}
          {isMine ? (
            <>
              {isMine && (
                <Link href=''>
                  <FeedDropdown.Item
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: 수정 로직
                    }}
                  >
                    <Flex align='center' css={{ gap: '10px', color: `${colors.gray10} ` }}>
                      <IconWrite css={{ width: '16px', height: '16px' }} />
                      수정
                    </Flex>
                  </FeedDropdown.Item>
                </Link>
              )}
              {isMine && (
                <FeedDropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: 삭제 로직
                  }}
                >
                  <Flex align='center' css={{ gap: '10px' }}>
                    <IconTrash css={{ width: '16px', height: '16px' }} />
                    삭제
                  </Flex>
                </FeedDropdown.Item>
              )}
            </>
          ) : (
            <FeedDropdown.Item
              type='danger'
              onClick={(e) => {
                e.stopPropagation();
                // TODO: 신고
              }}
            >
              <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
                신고
              </Flex>
            </FeedDropdown.Item>
          )}
        </FeedDropdown>
      </AskReplyHeader>
      <Content>{content}</Content>
      <ButtonWrapper>
        <FeedLike
          isLiked={false}
          likes={0}
          type='helpful'
          onClick={() => {
            //TODO: 도움돼요 로직
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
        >
          쪽지 보내기
        </Button>
      </SendMailWrapper>
    </AskReplyContainer>
  );
}

// const Button = styled.button`
//   padding: 9px 114px;

//   ${fonts.LABEL_14_SB};
//   background-color: ${colors.gray700};
//   color: ${colors.gray10};
//   border-radius: 8px;
//   border: none;
//   cursor: pointer;
// `;
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
