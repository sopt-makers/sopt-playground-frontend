import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconDotsVertical } from '@sopt-makers/icons';
import { IconEye } from '@sopt-makers/icons';
import { Flex, Stack } from '@toss/emotion-utils';
import Link from 'next/link';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';

import HorizontalScroller from '@/components/common/HorizontalScroller';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import FeedLike from '@/components/feed/common/FeedLike';
import { IconMember } from '@/components/feed/common/Icon';
import FeedUrlCard from '@/components/feed/list/FeedUrlCard';
import { playgroundLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';
interface RandomProfile {
  nickname: string;
  profileImgUrl: string;
}

interface BaseProps {
  profileImage: string | null;
  name: string;
  info: ReactNode;
  title: string;
  content: string;
  createdAt: string;
  isBlindWriter?: boolean;
  anonymousProfile?: RandomProfile | null;
  isQuestion?: boolean;
  commentLength: number;
  hits: number;
  rightIcon?: ReactNode;
  memberId: number;
  isShowInfo: boolean;
  onClick?: () => void;
  like: ReactNode;
  isSopticle?: boolean;
  sopticleUrl: string;
  thumbnailUrl: string;
}

const Base = forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  (
    {
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
      rightIcon,
      memberId,
      isShowInfo,
      anonymousProfile,
      onClick,
      like,
      isSopticle = false,
      sopticleUrl,
      thumbnailUrl,
    },
    ref,
  ) => {
    return (
      <Flex
        ref={ref}
        css={{
          backgroundColor: colors.gray950,
          padding: '16px 16px 22px',
          gap: 12,
          borderBottom: `1px solid ${colors.gray800}`,
        }}
        onClick={onClick}
      >
        {isBlindWriter ? (
          <ProfileImageBox>
            {anonymousProfile ? (
              <ProfileImage width={32} height={32} src={anonymousProfile?.profileImgUrl} alt='anonymousProfileImage' />
            ) : (
              <IconMember size={32} />
            )}
          </ProfileImageBox>
        ) : (
          <Link href={playgroundLink.memberDetail(memberId)} css={{ height: 'fit-content' }}>
            <ProfileImageBox>
              {profileImage ? (
                <ProfileImage width={32} height={32} src={profileImage} alt='profileImage' />
              ) : (
                <IconMember size={32} />
              )}
            </ProfileImageBox>
          </Link>
        )}
        <Flex direction='column' css={{ minWidth: 0, gap: '12px', width: '100%' }}>
          <Stack gutter={title ? 12 : 4}>
            <Flex justify='space-between' css={{ height: '32px' }}>
              {isBlindWriter ? (
                <Flex align='center'>
                  <Text typography='SUIT_14_SB' lineHeight={20}>
                    {anonymousProfile?.nickname ?? '익명'}
                  </Text>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray300}>
                    {info}
                  </InfoText>
                </Flex>
              ) : (
                <Flex align='center'>
                  <Link href={playgroundLink.memberDetail(memberId)}>
                    <Text typography='SUIT_14_SB' lineHeight={20}>
                      {name}
                    </Text>
                  </Link>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray400}>
                    {info}
                  </InfoText>
                </Flex>
              )}
              <Stack.Horizontal gutter={4} align='center'>
                {rightIcon}
              </Stack.Horizontal>
            </Flex>
            <Stack gutter={8}>
              {isSopticle ? (
                <FeedUrlCard
                  title={title}
                  description={content}
                  sopticleUrl={sopticleUrl}
                  thumbnailUrl={thumbnailUrl}
                />
              ) : (
                <>
                  {title && (
                    <Title typography='SUIT_17_SB' mr='28px'>
                      {isQuestion && <QuestionBadge>질문</QuestionBadge>}
                      {title}
                    </Title>
                  )}

                  <Text
                    mr='28px'
                    typography='SUIT_15_L'
                    color={colors.gray10}
                    lineHeight={22}
                    css={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {renderContent(content)}
                  </Text>
                </>
              )}
            </Stack>
          </Stack>
          {children}

          <Bottom gutter={2}>
            <Flex css={{ gap: 2 }}>
              <IconEye style={{ width: 16, height: 16, color: colors.gray600 }} />
              <Text typography='SUIT_14_SB' lineHeight={18} color={colors.gray600}>
                {hits}
              </Text>
            </Flex>
            <Flex css={{ gap: 8 }}>
              <FeedLike likes={commentLength} type='message' />
              {like}
            </Flex>
          </Bottom>
        </Flex>
      </Flex>
    );
  },
);

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

const InfoText = styled(Text)`
  white-space: nowrap;

  @media ${'screen and (max-width: 460px)'} {
    max-width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
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
  transform: translateY(-2px);
  white-space: nowrap;
  display: inline-flex;
  border-radius: 5px;
  background-color: ${colors.orangeAlpha200};
  padding: 3px 5px;
  margin-right: 4px;

  color: ${colors.secondary};
  ${textStyles.SUIT_12_SB};
  line-height: 14px;
`;

const Bottom = styled(Stack.Horizontal)`
  color: ${colors.gray400};
  ${textStyles.SUIT_13_R}
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  gap: 8px;
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

const FEED_CARD_LEFT_SPACE = 58;
const FEED_CARD_RIGHT_SPACE = 16;

const Image = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <HorizontalScroller css={{ marginLeft: -FEED_CARD_LEFT_SPACE, marginRight: -FEED_CARD_RIGHT_SPACE }}>
      <Flex
        css={{
          paddingLeft: FEED_CARD_LEFT_SPACE,
          paddingRight: FEED_CARD_RIGHT_SPACE,
          gap: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Flex>
    </HorizontalScroller>
  );
};

const ImageItem = styled(ResizedImage)`
  border-radius: 12px;
  height: 242px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Comment = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <HorizontalScroller
      css={{ marginTop: '4px', marginLeft: -FEED_CARD_LEFT_SPACE, marginRight: -FEED_CARD_RIGHT_SPACE }}
    >
      <StyledComment css={{ paddingLeft: FEED_CARD_LEFT_SPACE, paddingRight: FEED_CARD_RIGHT_SPACE }}>
        {children}
      </StyledComment>
    </HorizontalScroller>
  );
};

const StyledComment = styled(Flex)`
  gap: 8px;
  white-space: nowrap;
`;

type CommentItemProps = { comment: string; name: string };

const CommentItem = ({ name, comment }: CommentItemProps) => {
  return (
    <StyledCommentItem>
      <Text typography='SUIT_13_R' color={colors.gray10}>
        {name}
      </Text>
      <Text typography='SUIT_13_R' color={colors.gray300}>
        <CommentWrapper>{comment}</CommentWrapper>
      </Text>
    </StyledCommentItem>
  );
};

const CommentWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 240px;
`;

const StyledCommentItem = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
  border: 0.5px solid ${colors.gray700};
  border-radius: 10px;
  padding: 10px;
  align-items: center;

  ${textStyles.SUIT_13_R};
`;

const Icon = () => {
  return <IconDotsVertical style={{ width: 20, height: 20, color: colors.gray600 }} />;
};

export default Object.assign(Base, {
  Image,
  ImageItem,
  Comment,
  CommentItem,
  Icon,
});
