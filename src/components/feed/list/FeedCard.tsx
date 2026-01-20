import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconDotsVertical } from '@sopt-makers/icons';
import { IconEye } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import { Flex, Spacing, Stack } from '@toss/emotion-utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, PropsWithChildren, ReactNode, useState } from 'react';

import HorizontalScroller from '@/components/common/HorizontalScroller';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import FeedLike from '@/components/feed/common/FeedLike';
import { IconMember } from '@/components/feed/common/Icon';
import { parseMentionsToJSX } from '@/components/feed/common/utils/parseMention';
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
  onClickContent?: () => void;
  onCommentClick?: () => void;
  answer?: ReactNode;
  isNew?: boolean;
  isAskMode?: boolean;
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
      onClickContent,
      onCommentClick,
      answer,
      isNew = false,
      isAskMode,
    },
    ref,
  ) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClickContent?.();
    };

    const handleToggleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    };

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
        <Flex direction='column' css={{ minWidth: 0, gap: '12px', width: '100%' }}>
          <Stack gutter={title ? 12 : 4}>
            <Flex justify='space-between' css={{ height: '32px' }}>
              {isBlindWriter ? (
                <Flex align='center'>
                  <ProfileImageBox>
                    {anonymousProfile?.profileImgUrl ? (
                      <ProfileImage
                        width={32}
                        height={32}
                        src={anonymousProfile.profileImgUrl}
                        alt='anonymousProfileImage'
                      />
                    ) : (
                      <IconMember size={32} />
                    )}
                  </ProfileImageBox>

                  <Text typography={isAskMode ? 'SUIT_16_SB' : 'SUIT_14_SB'} mobileTypography='SUIT_14_SB' lineHeight={20}>
                    {anonymousProfile?.nickname ?? '익명'}
                  </Text>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray300}>
                    {info}
                  </InfoText>
                  {isNew && <Tag variant='primary'>New</Tag>}
                </Flex>
              ) : (
                <Flex align='center'>
                  <Link href={playgroundLink.memberDetail(memberId)} css={{ height: 'fit-content' }}>
                    <ProfileImageBox>
                      {profileImage ? (
                        <ProfileImage width={32} height={32} src={profileImage} alt='profileImage' />
                      ) : (
                        <IconMember size={32} />
                      )}
                    </ProfileImageBox>
                  </Link>

                  <Link href={playgroundLink.memberDetail(memberId)}>
                    <Text typography='SUIT_14_SB' lineHeight={20}>
                      {name}
                    </Text>
                  </Link>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray400}>
                    {info}
                  </InfoText>
                  {isNew && <Tag variant='primary'>New</Tag>}
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
                <div onClick={handleContentClick}>
                  {title && (
                    <Title typography='SUIT_17_SB' mr='28px'>
                      {isQuestion && <QuestionBadge>질문</QuestionBadge>}
                      {title}
                    </Title>
                  )}

                  {isAskMode && <Spacing size={10} />}
                  <Text
                    mr='28px'
                    typography={isAskMode ? 'SUIT_16_L' : 'SUIT_15_L'}
                    mobileTypography='SUIT_15_L'
                    color={colors.gray10}
                    lineHeight={22}
                    css={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {renderContent(content, router, isAskMode, isExpanded, handleToggleExpand)}
                  </Text>
                </div>
              )}
            </Stack>
          </Stack>
          {children}

          <Bottom gutter={2}>
            <Flex css={{ gap: 2, visibility: !isAskMode ? 'visible' : 'hidden' }}>
              <IconEye style={{ width: 16, height: 16, color: colors.gray600 }} />
              <Text typography='SUIT_14_SB' lineHeight={18} color={colors.gray600}>
                {hits}
              </Text>
            </Flex>
            <Flex css={{ gap: 8 }}>
              {!isAskMode && <FeedLike likes={commentLength} type='message' onClick={onCommentClick} />}
              {like}
            </Flex>
          </Bottom>
          {answer}
        </Flex>
      </Flex>
    );
  },
);

const ProfileImageBox = styled.div`
  flex-shrink: 0;
  margin-right: 6px;
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
  margin-right: 4px;
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
  gap: 8px;
`;

const renderContent = (
  content: string,
  router: ReturnType<typeof useRouter>,
  isAskMode?: boolean,
  isExpanded?: boolean,
  handleToggleExpand?: (e: React.MouseEvent) => void,
) => {
  // isAskMode일 때
  if (isAskMode) {
    if (content.length <= 140) {
      return parseMentionsToJSX(content, router);
    }

    if (isExpanded) {
      const parsed = parseMentionsToJSX(content, router);
      parsed.push(
        <Text
          key='toggle-button'
          css={{ cursor: 'pointer' }}
          typography='SUIT_14_R'
          color={colors.gray400}
          onClick={handleToggleExpand}
        >
          {'\n'}접기
        </Text>,
      );
      return parsed;
    }

    const displayText = content.slice(0, 140) + '...\n';
    const parsed = parseMentionsToJSX(displayText, router);
    parsed.push(
      <Text
        key='toggle-button'
        css={{ cursor: 'pointer' }}
        typography='SUIT_14_R'
        color={colors.gray400}
        onClick={handleToggleExpand}
      >
        더보기
      </Text>,
    );
    return parsed;
  }

  // isAskMode가 아닐 때
  let displayText = content;
  let isLong = false;

  if (content.length > 140) {
    displayText = content.slice(0, 140) + '...';
    isLong = true;
  }
  const parsed = parseMentionsToJSX(displayText, router);

  if (isLong) {
    parsed.push(
      <Text key='more-button' css={{ cursor: 'default' }} typography='SUIT_14_R' color={colors.blue400}>
        더보기
      </Text>,
    );
  }

  return parsed;
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

const ImageItem = styled(ImageWithSkeleton)``;

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
  return <IconDotsVertical style={{ width: 20, height: 20, color: colors.gray400 }} />;
};

export default Object.assign(Base, {
  Image,
  ImageItem,
  Comment,
  CommentItem,
  Icon,
});
