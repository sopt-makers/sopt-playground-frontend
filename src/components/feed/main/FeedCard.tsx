import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';
import { PropsWithChildren } from 'react';

import Text from '@/components/common/Text';
import { IconMember, IconMoreHoriz } from '@/components/feed/Icon';
import { getRelativeTime } from '@/components/feed/utils';
import { textStyles } from '@/styles/typography';

interface BaseProps {
  profileImage: string;
  name: string;
  info: string;
  title: string;
  content: string;
  createdAt: string;
  isBlindWriter?: boolean;
  isQuestion?: boolean;
  commentLength: number;
  hits: number;
}

const Base = ({
  profileImage,
  name,
  info,
  title,
  content,
  createdAt,
  isBlindWriter = false,
  isQuestion = false,
  commentLength,
  hits,
  children,
}: PropsWithChildren<BaseProps>) => {
  return (
    <Flex
      css={{
        backgroundColor: colors.gray950,
        padding: '16px',
        gap: 8,
      }}
    >
      {isBlindWriter ? <IconMember /> : <ProfileImage width={32} height={32} src={profileImage} />}
      <Stack gutter={8}>
        <Flex justify='space-between'>
          {isBlindWriter ? (
            <Text typography='SUIT_13_SB'>익명</Text>
          ) : (
            <Stack.Horizontal gutter={4}>
              <Text typography='SUIT_13_SB'>{name}</Text>
              <Text typography='SUIT_13_R' color={colors.gray400}>
                ∙
              </Text>
              <Text typography='SUIT_13_R' color={colors.gray400}>
                {info}
              </Text>
            </Stack.Horizontal>
          )}
          <Stack.Horizontal gutter={4}>
            <Text typography='SUIT_14_R' color={colors.gray400}>
              {getRelativeTime(createdAt)}
            </Text>
            <button type='button'>
              <IconMoreHoriz />
            </button>
          </Stack.Horizontal>
        </Flex>
        <Stack.Horizontal gutter={4} align='center'>
          {isQuestion ? <QuestionBadge>질문</QuestionBadge> : null}
          <Title typography='SUIT_16_SB'>{title}</Title>
        </Stack.Horizontal>
        <Text
          typography='SUIT_14_R'
          css={{
            lineHeight: '22px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {renderContent(content)}
        </Text>
        {children}
        <Bottom gutter={2}>
          <Text>{`댓글 ${commentLength}개`}</Text>
          <Text>∙</Text>
          <Text>{`조회수 ${hits}회`}</Text>
        </Bottom>
      </Stack>
    </Flex>
  );
};

const ProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const Title = styled(Text)`
  /* stylelint-disable */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const QuestionBadge = styled.div`
  border-radius: 5px;
  background-color: ${colors.orangeAlpha200};
  padding: 6px;
  color: ${colors.secondary};
  ${textStyles.SUIT_12_SB};
`;

const Bottom = styled(Stack.Horizontal)`
  color: ${colors.gray400};
  ${textStyles.SUIT_13_R}
`;

const renderContent = (content: string) => {
  if (content.length > 140) {
    return (
      <>
        {content.slice(0, 140) + '... '}
        {/* TODO: 연결 */}
        <Text css={{ cursor: 'pointer' }} typography='SUIT_14_R' color={colors.blue400}>
          더보기
        </Text>
      </>
    );
  }
  return content;
};

const Image = ({ children }: PropsWithChildren<unknown>) => {
  return <Flex css={{ gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>{children}</Flex>;
};

const ImageItem = styled.img`
  border-radius: 12px;
  height: 160px;
  object-fit: cover;
`;

const Comment = ({ children }: PropsWithChildren<unknown>) => {
  return <Flex css={{ gap: 8, overflowX: 'auto', whiteSpace: 'nowrap' }}>{children}</Flex>;
};

interface CommentItemProps {
  name: string;
  comment: string;
}

const CommentItem = ({ name, comment }: CommentItemProps) => {
  return (
    <StyledCommentItem>
      <Text color={colors.gray10}>{name}</Text>
      <Text color={colors.gray300}>{comment}</Text>
    </StyledCommentItem>
  );
};

const StyledCommentItem = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
  border: 0.5px solid ${colors.gray700};
  border-radius: 10px;
  padding: 10px 12px;

  ${textStyles.SUIT_13_R};
`;

export default Object.assign(Base, {
  Image,
  ImageItem,
  Comment,
  CommentItem,
});
