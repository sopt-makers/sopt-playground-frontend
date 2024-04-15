import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';
import Link from 'next/link';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';

import HorizontalScroller from '@/components/common/HorizontalScroller';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { IconMember, IconMoreHoriz } from '@/components/feed/common/Icon';
import { getRelativeTime } from '@/components/feed/common/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface BaseProps {
  profileImage: string | null;
  name: string;
  info: ReactNode;
  title: string;
  content: string;
  createdAt: string;
  isBlindWriter?: boolean;
  isQuestion?: boolean;
  commentLength: number;
  hits: number;
  rightIcon?: ReactNode;
  memberId: number;
  isShowInfo: boolean;
  onClick?: () => void;
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
      onClick,
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
          <div css={{ flexShrink: 0 }}>
            <IconMember size={32} />
          </div>
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
                <Top align='center'>
                  <Text typography='SUIT_14_SB' lineHeight={20}>
                    익명
                  </Text>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray300}>
                    {isShowInfo && info}
                  </InfoText>
                </Top>
              ) : (
                <Top align='center'>
                  <Link href={playgroundLink.memberDetail(memberId)}>
                    <Text typography='SUIT_14_SB' lineHeight={20}>
                      {name}
                    </Text>
                  </Link>
                  <InfoText typography='SUIT_14_M' lineHeight={20} color={colors.gray400}>
                    {info}
                  </InfoText>
                </Top>
              )}
              <Stack.Horizontal gutter={4} align='center'>
                <Text typography='SUIT_14_M' lineHeight={20} color={colors.gray400}>
                  {getRelativeTime(createdAt)}
                </Text>
                {rightIcon}
              </Stack.Horizontal>
            </Flex>
            <Stack gutter={8}>
              {title && (
                <Title typography='SUIT_17_SB'>
                  {isQuestion && <QuestionBadge>질문</QuestionBadge>}
                  {title}
                </Title>
              )}
              <Text
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
            </Stack>
          </Stack>
          {children}
          <Bottom gutter={2}>
            <Text typography='SUIT_14_R'>{`댓글 ${commentLength}개`}</Text>
          </Bottom>
        </Flex>
      </Flex>
    );
  },
);

const ProfileImageBox = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

const ProfileImage = styled(ResizedImage)`
  flex-shrink: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Top = styled(Flex)`
  gap: 4px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 2px;
  }
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

type CommentItemProps =
  | { comment: string } & (
      | {
          name?: null;
          isBlindWriter: true;
        }
      | {
          name: string;
          isBlindWriter: false;
        }
    );

const CommentItem = ({ name, comment, isBlindWriter }: CommentItemProps) => {
  return (
    <StyledCommentItem>
      <Text typography='SUIT_13_R' color={colors.gray10}>
        {isBlindWriter ? '익명' : name}
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

interface IconProps {
  name: 'moreHorizon';
}

const Icon = ({ name }: IconProps) => {
  if (name === 'moreHorizon') {
    return (
      <IconMoreHoriz
        color={colors.gray400}
        css={css`
          &:hover {
            color: ${colors.gray30};
            transition: 0.2s;
          }
        `}
      />
    );
  } else return null;
};

export default Object.assign(Base, {
  Image,
  ImageItem,
  Comment,
  CommentItem,
  Icon,
});
