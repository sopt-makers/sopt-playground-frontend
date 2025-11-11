import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconEye, IconFlipForward, IconHeart, IconMessageDots } from '@sopt-makers/icons';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, PropsWithChildren, ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import { KeyboardEvent } from 'react';
import { useContext } from 'react';
import { useResetRecoilState } from 'recoil';

import { useCommentLikeMutation, useCommentUnLikeMutation } from '@/api/endpoint/feed/commentLike';
import Checkbox from '@/components/common/Checkbox';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import Loading from '@/components/common/Loading';
import ResizedImage from '@/components/common/ResizedImage';
import VerticalScroller from '@/components/common/ScrollContainer';
import Text from '@/components/common/Text';
import FeedLike from '@/components/feed/common/FeedLike';
import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import { useCursorPosition } from '@/components/feed/common/hooks/useCursorPosition';
import useMention, { Member } from '@/components/feed/common/hooks/useMention';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMember,
  IconMoreHoriz,
  IconMoreVert,
  IconSendFill,
  IconShare,
} from '@/components/feed/common/Icon';
import MentionDropdown from '@/components/feed/common/MentionDropdown';
import { getRelativeTime } from '@/components/feed/common/utils';
import {
  parseHTMLToMentions,
  parseMentionsToHTML,
  parseMentionsToJSX,
} from '@/components/feed/common/utils/parseMention';
import { ANONYMOUS_MEMBER_ID } from '@/components/feed/constants';
import { ReplyContext } from '@/components/feed/detail/FeedDetail';
import { commentAtomFamily } from '@/components/feed/detail/FeedDetailInput';
import FeedImageSlider from '@/components/feed/detail/slider/FeedImageSlider';
import { Container } from '@/components/feed/list/CategorySelect';
import FeedUrlCard from '@/components/feed/list/FeedUrlCard';
import Vote from '@/components/vote';
import { playgroundLink } from '@/constants/links';
import IconMessageDotsAction from '@/public/icons/icon-message-dots-action.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';
import { parseTextToLink } from '@/utils/parseTextToLink';

const Base = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledBase direction='column'>{children}</StyledBase>;
};

const StyledBase = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

interface HeaderProps {
  categoryId: string;
  category: string;
  tag: string;
  left?: ReactNode;
  right?: ReactNode;
  renderCategoryLink?: (props: { children: ReactNode; categoryId: string }) => ReactNode;
  hasChildren?: boolean;
}

const Header = ({
  categoryId,
  category,
  tag,
  left,
  right,
  renderCategoryLink = (props) => props.children,
  hasChildren,
}: HeaderProps) => {
  const isIOSApp = typeof navigator !== 'undefined' && /SOPT-iOS/.test(navigator.userAgent);

  return (
    <StyledHeader align='center' justify='space-between' as='header'>
      <Flex.Center css={{ gap: 8 }}>
        {!isIOSApp && <div css={{ width: '24px', height: '24px' }}>{left}</div>}

        {renderCategoryLink({
          children: (
            <Chip align='center' as='div'>
              <Text typography='SUIT_13_M'>{category}</Text>
              {hasChildren && (
                <>
                  <IconChevronRight />
                  <Text typography='SUIT_13_M'>{tag}</Text>
                </>
              )}
            </Chip>
          ),
          categoryId,
        })}
      </Flex.Center>
      {right ? <Flex.Center css={{ gap: 8 }}>{right}</Flex.Center> : null}
    </StyledHeader>
  );
};

const StyledHeader = styled(Flex)`
  padding: 15px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 10px 16px;
  }
`;

const Chip = styled(Flex)`
  transition: background-color 0.2s ease-in-out;
  border-radius: 21px;
  background-color: ${colors.gray800};
  padding: 7px 12px;
  color: ${colors.gray10};

  :hover {
    background-color: ${colors.gray700};
  }
`;

interface BodyProps {
  className?: string;
}

const Body = forwardRef<HTMLDivElement, PropsWithChildren<BodyProps>>(({ className, children }, ref) => {
  return (
    <StyledBody ref={ref} className={className}>
      <Flex direction='column' css={{ position: 'absolute', inset: 0 }}>
        {children}
      </Flex>
    </StyledBody>
  );
});

const StyledBody = styled(VerticalScroller)`
  position: relative;
  flex: 1;
  padding: 16px 24px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const Main = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledMain direction='column'>{children}</StyledMain>;
};

const StyledMain = styled(Flex)`
  gap: 16px;
  padding: 16px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

type RandomProfile = { nickname: string; profileImgUrl: string };

type TopProps = { createdAt: string } & (
  | {
      isBlindWriter: true;
      anonymousProfile: RandomProfile | null;
      profileImage?: null;
      name?: null;
      info?: null;
      memberId: number | null;
    }
  | {
      isBlindWriter: false;
      anonymousProfile?: null;
      profileImage: string | null;
      name: string;
      info: string;
      memberId: number | null;
    }
);

const Top = ({ isBlindWriter, anonymousProfile, profileImage, name, info, memberId, createdAt }: TopProps) => {
  return (
    <Flex justify='space-between'>
      <Flex css={{ gap: 8 }}>
        {isBlindWriter || memberId == null ? (
          <ProfileImageBox css={{ height: 40 }}>
            {anonymousProfile ? (
              <ProfileImage width={40} src={anonymousProfile?.profileImgUrl} alt='anonymousProfileImage' />
            ) : (
              <IconMember size={40} />
            )}
          </ProfileImageBox>
        ) : (
          <Link href={playgroundLink.memberDetail(memberId)}>
            <ProfileImageBox css={{ height: 40 }}>
              {profileImage ? (
                <ProfileImage width={40} src={profileImage} alt='profileImage' />
              ) : (
                <IconMember size={40} />
              )}
            </ProfileImageBox>
          </Link>
        )}
        <Stack.Vertical gutter={0} justify='center'>
          {isBlindWriter || memberId == null ? (
            <Name color={colors.gray10}>{anonymousProfile?.nickname ?? '익명'}</Name>
          ) : (
            <Link href={playgroundLink.memberDetail(memberId)}>
              <Name color={colors.gray10}>{name}</Name>
            </Link>
          )}
          {!isBlindWriter && memberId !== null && (
            <Link href={playgroundLink.memberDetail(memberId)}>
              <Text typography='SUIT_13_M' color={colors.gray100}>
                {info}
              </Text>
            </Link>
          )}
        </Stack.Vertical>
      </Flex>
      <Flex align='center'>
        <Text typography='SUIT_14_M' color={colors.gray400}>
          {createdAt && getRelativeTime(createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

const ProfileImageBox = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled(Text)`
  ${textStyles.SUIT_15_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB};
  }
`;

interface VoteData {
  id: number;
  isMultiple: boolean;
  hasVoted: boolean;
  totalParticipants: number;
  options: {
    id: number;
    content: string;
    voteCount: number;
    votePercent: number;
    isSelected: boolean;
  }[];
}

interface ContentProps {
  isQuestion?: boolean;
  title: string;
  content: string;
  hits: number;
  commentLength: number;
  images: string[];
  like: ReactNode;
  isSopticle?: boolean;
  sopticleUrl: string;
  thumbnailUrl: string;
  isMine: boolean;
  vote: VoteData | null;
  postId: number;
  categoryId: number;
}

const Content = ({
  isQuestion = false,
  title,
  content,
  hits,
  commentLength,
  images,
  like,
  isSopticle = false,
  sopticleUrl,
  thumbnailUrl,
  isMine,
  vote,
  postId,
  categoryId,
}: ContentProps) => {
  const [openSlider, setOpenSlider] = useState(false);
  const router = useRouter();

  const parsedMentions = parseMentionsToJSX(content, router);
  const parsedMentionsAndLinks = parsedMentions.map((fragment, index) => parseTextToLink(fragment));
  return (
    <>
      <Stack gutter={12}>
        {isSopticle ? (
          <a href={sopticleUrl} target='_blank'>
            <FeedUrlCard
              title={title}
              description={content}
              sopticleUrl={sopticleUrl}
              thumbnailUrl={thumbnailUrl}
              isDetailFeedCard
            />
          </a>
        ) : (
          <>
            {title && (
              <Text typography='SUIT_20_SB' lineHeight={26}>
                {isQuestion && <QuestionBadge>질문</QuestionBadge>}
                {title}
              </Text>
            )}
            <StyledContent>{parsedMentionsAndLinks.flat()}</StyledContent>
          </>
        )}
      </Stack>
      {!isSopticle && images.length !== 0 ? (
        <HorizontalScroller
          css={css`
            margin-right: -24px;
            margin-left: -24px;

            @media ${MOBILE_MEDIA_QUERY} {
              margin-right: -16px;
              margin-left: -16px;
            }
          `}
        >
          <ImageScrollContainer>
            {images.map((image, index) => (
              <div key={index} onClick={() => setOpenSlider(true)}>
                <ImageWithSkeleton src={image} alt='image' height={320} />
              </div>
            ))}
          </ImageScrollContainer>
        </HorizontalScroller>
      ) : null}
      {vote && (
        <Vote
          postId={postId}
          categoryId={categoryId}
          isMine={isMine}
          isMultiple={vote.isMultiple}
          hasVoted={vote.hasVoted}
          options={vote.options}
          totalParticipants={vote.totalParticipants}
        />
      )}
      <Flex justify='space-between' align='center'>
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
      </Flex>
      <FeedImageSlider opened={openSlider} images={images} onClose={() => setOpenSlider(false)} />
    </>
  );
};

const ImageScrollContainer = styled(Flex)`
  gap: 8px;
  padding-right: 24px;
  padding-left: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

const StyledContent = styled.div`
  line-height: 26px;
  white-space: pre-wrap;
  word-break: break-all;
  color: ${colors.gray30};
  ${textStyles.SUIT_16_R};

  a {
    text-decoration: underline;
  }
`;

const QuestionBadge = styled.div`
  display: inline-flex;
  align-self: flex-start;
  transform: translateY(-2.4px);
  margin-right: 4px;
  border-radius: 5px;
  background-color: ${colors.orangeAlpha200};
  padding: 4px 6px;
  line-height: 18px;
  white-space: nowrap;
  color: ${colors.secondary};
  ${textStyles.SUIT_14_SB};
`;

const Divider = styled.hr`
  flex-shrink: 0;
  margin: 0;
  border: none;
  background-color: ${colors.gray800};
  height: 1px;
`;

type CommentProps = {
  // TODO: 좋아요 backend data 추가 후 optional 제거
  commentId: number;
  postId: string;
  isLiked: boolean;
  commentLikeCount: number;
  comment: string;
  createdAt: string;
  moreIcon?: ReactNode;
  isReply?: boolean;
  parentCommentId: number | null;
  isDeleted: boolean;
  hasReplies: boolean;
} & (
  | {
      isBlindWriter: false;
      profileImage: string | null;
      anonymousProfile?: null;
      info: string;
      name: string;
      memberId?: number;
    }
  | {
      isBlindWriter: true;
      profileImage?: null;
      anonymousProfile: RandomProfile | null;
      info?: null;
      name?: null;
      memberId?: number;
    }
  | {
      isBlindWriter?: undefined;
      profileImage?: undefined;
      anonymousProfile?: undefined;
      info?: undefined;
      name?: undefined;
      memberId?: undefined;
    }
);

const Comment = ({
  // TODO: post 작성자 이름 데이터 필요
  commentId,
  postId,
  profileImage,
  name,
  info,
  comment,
  isBlindWriter,
  anonymousProfile,
  createdAt,
  moreIcon,
  isLiked,
  memberId = 0,
  commentLikeCount,
  isReply = false,
  parentCommentId = null,
  isDeleted,
  hasReplies,
}: CommentProps) => {
  const router = useRouter();
  const parsedMentions = parseMentionsToJSX(comment, router);
  const parsedMentionsAndLinks = parsedMentions.map((fragment, index) => parseTextToLink(fragment));

  const { member, replyTargetCommentId, setReplyState } = useContext(ReplyContext);
  const resetCommentData = useResetRecoilState(commentAtomFamily(postId));
  const { mutate: commentLike } = useCommentLikeMutation();
  const { mutate: commentUnLike } = useCommentUnLikeMutation();

  const handleCommentToggleLike = (isLiked: boolean) => {
    if (isLiked) {
      commentUnLike({ postId: Number(postId), commentId: commentId });
    } else {
      commentLike({ postId: Number(postId), commentId: commentId });
    }
  };
  const handleReply = () => {
    if (replyTargetCommentId === commentId) {
      resetCommentData();
      setReplyState({
        member: null,
        replyTargetCommentId: null,
        parentCommentId: null,
      });
    } else {
      // 추후 같은 멤버에 대해 입력하고 있던 댓글을 남겨두는 것이 UX 상 좋다고 판단하면 주석 해제
      // if (memberId === member?.id) {
      //   setReplyState((prev) => ({
      //     ...prev,
      //     replyTargetCommentId: commentId,
      //     parentCommentId: parentCommentId ?? commentId,
      //   }));
      setReplyState({
        member: {
          id: memberId ? memberId : ANONYMOUS_MEMBER_ID,
          name: isBlindWriter ? anonymousProfile?.nickname ?? '익명' : name ?? '삭제된 댓글',
          generation: 0, //TODO: generation 데이터 필요
          profileImage: profileImage ?? null,
        },
        replyTargetCommentId: commentId,
        parentCommentId: parentCommentId ?? commentId,
      });
    }
  };

  return (
    <StyledComment>
      <Flex css={{ gap: 8, minWidth: 0 }}>
        {isReply ? (
          <IconFlipForward style={{ width: 24, height: 24, color: colors.gray500, transform: 'scale(1, -1)' }} />
        ) : null}
        {isDeleted && hasReplies ? (
          <Text typography='SUIT_14_M' color={colors.gray500} css={{ whiteSpace: 'nowrap' }}>
            {isReply ? '삭제된 답글입니다.' : '삭제된 댓글입니다.'}
          </Text>
        ) : isDeleted && !hasReplies ? null : isBlindWriter ? (
          <CommentProfileImageBox>
            {anonymousProfile ? (
              <CommentProfileImage width={32} src={anonymousProfile?.profileImgUrl} alt='anonymousProfileImage' />
            ) : (
              <IconMember size={32} />
            )}
          </CommentProfileImageBox>
        ) : (
          <Link href={playgroundLink.memberDetail(memberId)}>
            <CommentProfileImageBox>
              {profileImage ? (
                <CommentProfileImage width={32} src={profileImage} alt='profileImage' />
              ) : (
                <div css={{ flexShrink: 0 }}>
                  <IconMember />
                </div>
              )}
            </CommentProfileImageBox>
          </Link>
        )}
        {isDeleted ? null : (
          <Stack css={{ minWidth: 0, width: '100%' }} gutter={2}>
            <Flex justify='space-between'>
              <Stack.Horizontal gutter={2} align='center'>
                {isBlindWriter ? (
                  <Text typography='SUIT_14_SB' color={colors.gray10} css={{ whiteSpace: 'nowrap' }}>
                    {anonymousProfile?.nickname ?? '익명'}
                  </Text>
                ) : (
                  <Link href={playgroundLink.memberDetail(memberId)}>
                    <Text typography='SUIT_14_SB' color={colors.gray10} css={{ whiteSpace: 'nowrap' }}>
                      {name}
                    </Text>
                  </Link>
                )}
                {!isBlindWriter && (
                  <InfoText typography='SUIT_14_M' color={colors.gray100}>
                    {`∙ ${info}`}
                  </InfoText>
                )}
              </Stack.Horizontal>
              <Flex>
                <Text typography='SUIT_14_M' color={colors.gray400} css={{ whiteSpace: 'nowrap' }}>
                  {createdAt && getRelativeTime(createdAt)}
                </Text>
                {moreIcon}
              </Flex>
            </Flex>
            <StyledText typography='SUIT_15_R' lineHeight={22} color={colors.gray50}>
              {parsedMentionsAndLinks.flat()}
            </StyledText>
            <StyledCommentActions>
              <StyledCommentHeartAction isLiked={isLiked}>
                <IconHeart
                  onClick={() => handleCommentToggleLike(isLiked)}
                  css={{
                    width: 20,
                    height: 20,
                    fill: isLiked ? colors.red400 : 'none',
                    stroke: isLiked ? 'none' : colors.gray300,
                    color: isLiked ? colors.red400 : colors.gray300,
                  }}
                />
                <Text typography='SUIT_12_M' color={colors.gray300}>
                  {commentLikeCount}
                </Text>
              </StyledCommentHeartAction>
              <StyledCommentReplyAction onClick={handleReply}>
                {replyTargetCommentId === commentId ? (
                  <IconMessageDotsAction />
                ) : (
                  <>
                    <IconMessageDots
                      css={css`
                        width: 20px;
                        height: 20px;
                      `}
                    />
                    <IconMessageDotsAction
                      css={css`
                        display: none;
                        width: 20px;
                        height: 20px;

                        path {
                          fill: ${colors.gray300};
                        }
                      `}
                    />
                  </>
                )}

                <Text
                  typography='SUIT_12_M'
                  color={replyTargetCommentId === commentId ? colors.gray600 : colors.gray300}
                >
                  답글 달기
                </Text>
              </StyledCommentReplyAction>
            </StyledCommentActions>
          </Stack>
        )}
      </Flex>
    </StyledComment>
  );
};

const StyledCommentHeartAction = styled.div<{ isLiked: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  color: ${colors.gray300};

  &:hover > svg path {
    fill: ${({ isLiked }) => (isLiked ? colors.red400 : colors.gray300)};
  }
`;

const StyledCommentReplyAction = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  color: ${colors.gray300};

  @media (hover: hover) and (pointer: fine) {
    &:hover > svg:first-of-type {
      display: none;
    }

    &:hover > svg:last-of-type {
      display: block;
    }
  }
`;

const StyledCommentActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 6px;
`;

const StyledComment = styled.div`
  padding: 12px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 16px;
  }
`;

const StyledText = styled(Text)`
  a {
    overflow: hidden;
    text-decoration: underline;
    word-wrap: break-word;
  }
`;

const CommentProfileImageBox = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
`;

const CommentProfileImage = styled(ResizedImage)`
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

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  isBlindChecked: boolean;
  onChangeIsBlindChecked: (checked: boolean) => void;
  isPending?: boolean;
}

const Input = ({ value, onChange, isBlindChecked, onChangeIsBlindChecked, isPending }: InputProps) => {
  const { member: replyTargetMember, replyTargetCommentId, setReplyState } = useContext(ReplyContext);
  const id = useId();
  const [textareaValue, setTextareaValue] = useState<string>(''); // textarea의 value 상태 기반 추적 변수
  const textareaRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const prevReplyTargetCommentIdRef = useRef<number | null>(null);

  const { handleShowBlindWriterPromise } = useBlindWriterPromise();
  const {
    isMentionOpen,
    searchedMemberList,
    handleMention,
    selectMention,
    mentionPosition,
    handleKeyDown,
    setIsComposing,
  } = useMention(textareaRef);

  const { saveCursor, restoreCursor } = useCursorPosition(textareaRef);

  const isButtonActive = value.length > 0 && !isPending;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleCheckBlindWriter = (isBlindWriter: boolean) => {
    isBlindWriter && handleShowBlindWriterPromise();
    onChangeIsBlindChecked(isBlindWriter);
  };

  const handleContentsInput = useCallback(() => {
    saveCursor();
    if (!textareaRef.current) return;
    const html = textareaRef.current.innerHTML;
    onChange(parseHTMLToMentions(html));

    setTextareaValue(html);
  }, [onChange, saveCursor]);

  const handleSelectMention = useCallback(
    ({ member, isReply = false }: { member: Member; isReply?: boolean }) => {
      selectMention({ selectedMember: member, isReply });
      handleContentsInput();
    },
    [handleContentsInput, selectMention],
  );

  useEffect(() => {
    // safari 환경에서 모든 텍스트를 지웠을 때 br태그가 남아있어 답글 기능 off가 안되는 이슈로 추가
    if (textareaRef.current) {
      if (textareaRef.current.innerHTML === '<br>') {
        textareaRef.current.innerHTML = '';
        setTextareaValue('');
      }
    }
  }, [textareaRef, setTextareaValue]);

  useEffect(() => {
    if (replyTargetCommentId && replyTargetMember && textareaRef.current) {
      if (prevReplyTargetCommentIdRef.current !== replyTargetCommentId) {
        if (textareaRef.current.innerHTML.length !== 0) {
          textareaRef.current.innerHTML = '';
          setTextareaValue('');
        }
        handleSelectMention({ member: replyTargetMember, isReply: !!replyTargetMember });
        prevReplyTargetCommentIdRef.current = replyTargetCommentId;
      }
    }
    if (replyTargetCommentId === null) {
      prevReplyTargetCommentIdRef.current = null;
      return;
    }

    if (textareaRef.current && textareaRef.current.innerHTML.length === 0) {
      setReplyState({
        member: null,
        replyTargetCommentId: null,
        parentCommentId: null,
      });
      setTextareaValue('');
    }
  }, [replyTargetMember, replyTargetCommentId, textareaValue, setReplyState, setTextareaValue, handleSelectMention]);

  useEffect(() => {
    if (!textareaRef.current || value === null) return;

    const currentHTML = textareaRef.current.innerHTML;
    const parsed = parseMentionsToHTML(value);

    if (currentHTML !== parsed) {
      textareaRef.current.innerHTML = parsed;

      restoreCursor();
    }
  }, [value]);

  return (
    <Container>
      <InputAnimateArea initial={{ height: '28px' }}>
        <InputContent>
          <Checkbox
            size='small'
            id={`${id}-check`}
            checked={isBlindChecked}
            onChange={(e) => handleCheckBlindWriter(e.target.checked)}
          />
          <label htmlFor={`${id}-check`} css={{ display: 'flex' }}>
            <Text typography='SUIT_12_M'>익명으로 남기기</Text>
          </label>
        </InputContent>
      </InputAnimateArea>
      <Flex align='flex-center' css={{ gap: '16px', width: '100%' }} ref={parentRef}>
        {replyTargetCommentId !== null && (
          <IconFlipForward style={{ width: 24, height: 24, color: colors.gray500, transform: 'scale(1, -1)' }} />
        )}

        <TextAreaWrapper>
          <StyledTextArea
            contentEditable
            onInput={(e) => {
              handleMention();
              handleContentsInput();
              setTextareaValue(e.currentTarget.innerHTML);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
              handleContentsInput();
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            data-placeholder={textareaRef.current?.innerText === '' && !replyTargetMember ? '댓글을 남겨주세요.' : ''}
            ref={textareaRef}
          />
          <SendButton type='submit' disabled={!isButtonActive || isPending}>
            {isPending ? <Loading size={4} /> : <IconSendFill />}
          </SendButton>
        </TextAreaWrapper>

        {isMentionOpen && mentionPosition !== null && (
          <MentionDropdown
            parentRef={parentRef}
            searchedMemberList={searchedMemberList}
            onSelect={handleSelectMention}
            mentionPosition={mentionPosition}
          />
        )}
      </Flex>
    </Container>
  );
};

const InputAnimateArea = styled(m.div)`
  position: relative;
  overflow: hidden;
`;

const InputContent = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  gap: 4px;
  align-items: center;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  background-color: ${colors.gray800};
  width: 100%;
`;

const StyledTextArea = styled.div`
  flex: 1;
  padding: 11px 48px 11px 16px;
  max-height: 180px;
  overflow: auto;
  resize: none;
  line-height: 22px;
  line-height: 26px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  ${textStyles.SUIT_16_M};

  :focus {
    outline: none;
  }

  ::before {
    color: ${colors.gray500};
    content: attr(data-placeholder);
  }
`;

const SendButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 34px;
  height: 100%;
`;

const Icon = ({ name }: { name: 'share' | 'chevronLeft' | 'moreVertical' | 'moreHorizontal' }) => {
  return (
    <SwitchCase
      value={name}
      caseBy={{
        share: <IconShare />,
        chevronLeft: <IconChevronLeft />,
        moreVertical: <IconMoreVert />,
        moreHorizontal: (
          <IconMoreHoriz
            color={colors.gray400}
            size={16}
            css={css`
              &:hover {
                transition: 0.2s;
                color: ${colors.gray30};
              }
            `}
          />
        ),
      }}
      default={null}
    />
  );
};

const DetailFeedCard = Object.assign(Base, {
  Header,
  Body,
  Main,
  Top,
  Content,
  Divider,
  Comment,
  Input,
  Icon,
});

export default DetailFeedCard;
