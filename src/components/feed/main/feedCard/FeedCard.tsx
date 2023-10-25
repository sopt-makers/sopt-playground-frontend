import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';

import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

interface Comment {
  name: string;
  comment: string;
}

interface FeedCardProps {
  isMyFeed?: boolean;
  isAnonymous?: boolean;
  isQuestion?: boolean;
  author: {
    name: string;
    profileImage: string;
    info: string; // api interface 들어오면 확정짓기
  };
  // date로 변경되면 바꾸기
  lastUpdatedAt: string;
  title: string;
  content: string;
  comments: Comment[];
  views: number;
  images: string[];
}

// desktop
const FeedCard = ({
  isMyFeed = false,
  author,
  lastUpdatedAt,
  isAnonymous = false,
  isQuestion = false,
  title,
  content,
  comments,
  views,
  images,
}: FeedCardProps) => {
  return (
    <StyeledFeedCard>
      {isAnonymous ? <IconMember /> : <ProfileImage width={32} height={32} src={author.profileImage} />}
      <StyledStack gutter={8}>
        <Flex justify='space-between'>
          {isAnonymous ? (
            <Text typography='SUIT_13_SB'>익명</Text>
          ) : (
            <Stack.Horizontal gutter={4}>
              <Text typography='SUIT_13_SB'>{author.name}</Text>
              <Text typography='SUIT_13_R' color={colors.gray400}>
                ∙
              </Text>
              <Text typography='SUIT_13_R' color={colors.gray400}>
                {author.info}
              </Text>
            </Stack.Horizontal>
          )}
          <Stack.Horizontal gutter={4}>
            <Text typography='SUIT_14_R' color={colors.gray400}>
              {lastUpdatedAt}
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
        <Content typography='SUIT_13_R'>{content}</Content>
        {images.length > 0 ? (
          <FeedImageWrapper>
            {images.map((image, index) => (
              <FeedImage key={index} src={image} />
            ))}
          </FeedImageWrapper>
        ) : null}
        {comments.length > 0 ? (
          <CommentWrapper>
            {comments.map((comment, index) => (
              <Comment key={index}>
                <Text color={colors.gray10}>{comment.name}</Text>
                <Text color={colors.gray300}>{comment.comment}</Text>
              </Comment>
            ))}
          </CommentWrapper>
        ) : null}
        <Bottom gutter={2}>
          <Text>{`댓글 ${comments.length}개`}</Text>
          <Text>∙</Text>
          <Text>{`조회수 ${views}회`}</Text>
        </Bottom>
      </StyledStack>
    </StyeledFeedCard>
  );
};

export default FeedCard;

const StyeledFeedCard = styled.div`
  display: flex;
  gap: 8px;
  background-color: ${colors.gray950};
  padding: 16px;
  width: 560px;
`;

const ProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const StyledStack = styled(Stack.Vertical)`
  min-width: 0;
`;

const Content = styled(Text)`
  line-height: 22px;
`;

const Title = styled(Text)`
  /* stylelint-disable */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  height: 44px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const FeedImageWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow: auto;
  white-space: nowrap;
`;

const FeedImage = styled.img`
  border-radius: 12px;
  height: 160px;
  object-fit: cover;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
`;

const Comment = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
  border: 0.5px solid ${colors.gray700};
  border-radius: 10px;
  padding: 10px 12px;

  ${textStyles.SUIT_13_R};
`;

const Bottom = styled(Stack.Horizontal)`
  color: ${colors.gray400};
  ${textStyles.SUIT_13_R}
`;

const QuestionBadge = styled.div`
  border-radius: 5px;
  background-color: rgb(255 110 29 / 20%);
  padding: 3px 5px;
  color: ${colors.secondary};
  ${textStyles.SUIT_12_SB};
`;

const IconMoreHoriz = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4.60156 9C5.15187 9 5.60156 8.5503 5.60156 8C5.60156 7.4497 5.15187 7 4.60156 7C4.05126 7 3.60156 7.4497 3.60156 8C3.60156 8.5503 4.05126 9 4.60156 9Z'
      fill='#66666D'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M8.0013 9C8.55161 9 9.0013 8.5503 9.0013 8C9.0013 7.4497 8.55161 7 8.0013 7C7.451 7 7.0013 7.4497 7.0013 8C7.0013 8.5503 7.451 9 8.0013 9Z'
      fill='#66666D'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M11.4014 7C10.8511 7 10.4014 7.4497 10.4014 8C10.4014 8.5503 10.8511 9 11.4014 9C11.9517 9 12.4014 8.5503 12.4014 8C12.4014 7.4497 11.9517 7 11.4014 7Z'
      fill='#66666D'
    />
  </svg>
);

const IconMember = () => (
  <div style={{ flexShrink: 0 }}>
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='16' cy='16' r='16' fill='#2C2D2E' />
      <ellipse cx='16' cy='11.2773' rx='3' ry='3' fill='#515159' />
      <path
        d='M10.3862 18.4183C10.7072 17.0048 11.9245 16.0059 13.3259 16.0059H18.5973C19.9371 16.0059 21.1167 16.9204 21.4947 18.2521L21.8754 19.5932C22.4443 21.5973 20.9942 23.6053 18.978 23.6053H13.0214C11.0739 23.6053 9.63558 21.7236 10.0816 19.7594L10.3862 18.4183Z'
        fill='#515159'
      />
    </svg>
  </div>
);
