import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconEye } from '@sopt-makers/icons';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, PropsWithChildren, ReactNode, useEffect, useId, useRef, useState } from 'react';
import Checkbox from '@/components/common/Checkbox';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import Loading from '@/components/common/Loading';
import ResizedImage from '@/components/common/ResizedImage';
import VerticalScroller from '@/components/common/ScrollContainer';
import Text from '@/components/common/Text';
import FeedLike from '@/components/feed/common/FeedLike';
import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMember,
  IconMoreHoriz,
  IconMoreVert,
  IconSendFill,
  IconShare,
} from '@/components/feed/common/Icon';
import { getRelativeTime } from '@/components/feed/common/utils';
import FeedImageSlider from '@/components/feed/detail/slider/FeedImageSlider';
import FeedUrlCard from '@/components/feed/list/FeedUrlCard';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';
import { parseTextToLink } from '@/utils/parseTextToLink';
import Vote from '@/components/vote';
import {
  parseHTMLToMentions,
  parseMentionsToHTML,
  parseMentionsToJSX,
} from '@/components/feed/common/utils/parseMention';
import useMention, { Member } from '@/components/feed/common/hooks/useMention';
import MentionDropdown from '@/components/feed/common/MentionDropdown';

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
  return (
    <StyledHeader align='center' justify='space-between' as='header'>
      <Flex.Center css={{ gap: 8 }}>
        <div css={{ width: '24px', height: '24px' }}>{left}</div>

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

  const parsedMentions = parseMentionsToJSX(content);
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
              <ImageBox key={index} onClick={() => setOpenSlider(true)}>
                <ImageItem src={image} alt='image' height={320} />
              </ImageBox>
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

const ImageBox = styled.div`
  flex: 0;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 12px;
  height: 322px;
`;

const ImageItem = styled(ResizedImage)`
  border-radius: 12px;
  cursor: pointer;
  width: fit-content;
  height: 100%;
  object-fit: cover;
`;

const Divider = styled.hr`
  flex-shrink: 0;
  margin: 0;
  border: none;
  background-color: ${colors.gray800};
  height: 1px;
`;

type CommentProps = {
  comment: string;
  createdAt: string;
  moreIcon?: ReactNode;
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
);

const Comment = ({
  profileImage,
  name,
  info,
  comment,
  isBlindWriter,
  anonymousProfile,
  createdAt,
  moreIcon,
  memberId = 0,
}: CommentProps) => {
  const parsedMentions = parseMentionsToJSX(comment);
  const parsedMentionsAndLinks = parsedMentions.map((fragment, index) => parseTextToLink(fragment));

  return (
    <StyledComment>
      <Flex css={{ gap: 8, minWidth: 0 }}>
        {isBlindWriter ? (
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
        </Stack>
      </Flex>
    </StyledComment>
  );
};

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
  const id = useId();
  const textareaRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
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

  const isButtonActive = value.length > 0 && !isPending;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleCheckBlindWriter = (isBlindWriter: boolean) => {
    isBlindWriter && handleShowBlindWriterPromise();
    onChangeIsBlindChecked(isBlindWriter);
  };

  const handleContentsInput = () => {
    if (!textareaRef.current) return;
    const html = textareaRef.current.innerHTML;
    onChange(parseHTMLToMentions(html));
  };

  const handleSelectMention = (member: Member) => {
    selectMention(member);
    handleContentsInput();
  };

  useEffect(() => {
    if (!textareaRef.current || value === null) return;

    const currentHTML = textareaRef.current.innerHTML;
    const parsed = parseMentionsToHTML(value);

    if (currentHTML !== parsed) {
      textareaRef.current.innerHTML = parsed;

      // 커서를 맨 뒤로 이동
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(textareaRef.current);
        range.collapse(false);
        selection.addRange(range);
      }
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
      <Flex align='flex-end' css={{ gap: '4px' }} ref={parentRef}>
        <StyledTextArea
          contentEditable
          onInput={(e) => {
            handleMention();
            handleContentsInput();
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleContentsInput();
          }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          data-placeholder={textareaRef.current?.innerText === '' ? '댓글을 남겨주세요.' : ''}
          ref={textareaRef}
        />
        {isMentionOpen && (
          <MentionDropdown
            parentRef={parentRef}
            searchedMemberList={searchedMemberList}
            onSelect={handleSelectMention}
            mentionPosition={mentionPosition}
          />
        )}
        <SendButton
          type='submit'
          initial={{
            backgroundColor: colors.gray800,
          }}
          animate={{
            backgroundColor: isButtonActive ? colors.success : colors.gray800,
          }}
          disabled={!isButtonActive || isPending}
        >
          {isPending ? <Loading size={4} /> : <IconSendFill />}
        </SendButton>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  --card-max-width: 560px;

  border-top: 1px solid ${colors.gray800};
  border-right: 1px solid ${colors.gray800};
  background-color: ${colors.gray950};
  padding: 12px 16px;
  width: 100%;
  max-width: var(--card-max-width);

  @media ${MOBILE_MEDIA_QUERY} {
    border-right: none;
    padding: 10px 16px;
    max-width: 100%;
  }
`;

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

const StyledTextArea = styled.div`
  flex: 1;
  border: none;
  border-width: 0;
  background-color: ${colors.background};
  padding-bottom: 7px;
  max-height: 180px;
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

const SendButton = styled(m.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 36px;
  height: 36px;
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
