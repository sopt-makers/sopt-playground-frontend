import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import { forwardRef, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Text from '@/components/common/Text';
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
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';

const Base = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledBase direction='column'>{children}</StyledBase>;
};

const StyledBase = styled(Flex)`
  border-right: 1px solid ${colors.gray800};
  border-left: 1px solid ${colors.gray800};
  height: 100%;
`;

interface HeaderProps {
  category: string;
  tag: string;
  left?: ReactNode;
  right?: ReactNode;
}

const Header = ({ category, tag, left, right }: HeaderProps) => {
  return (
    <StyledHeader align='center' justify='space-between' as='header'>
      <Flex.Center css={{ gap: 8 }}>
        {left}
        <Chip align='center' as='button'>
          <Text typography='SUIT_13_M'>{category}</Text>
          <IconChevronRight />
          <Text typography='SUIT_13_M'>{tag}</Text>
        </Chip>
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
    <StyledBody direction='column' ref={ref} className={className}>
      <Flex direction='column' css={{ position: 'absolute', inset: 0 }}>
        {children}
      </Flex>
    </StyledBody>
  );
});

const StyledBody = styled(Flex)`
  position: relative;
  flex: 1;
  padding: 16px 24px;
  overflow: auto;

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

interface TopProps {
  isBlindWriter?: boolean;
  profileImage: string | null;
  name: string;
  info: string;
  createdAt: string;
}

const Top = ({ isBlindWriter = false, profileImage, name, info, createdAt }: TopProps) => {
  return (
    <Flex justify='space-between'>
      <Flex css={{ gap: 8 }}>
        {isBlindWriter || profileImage == null ? (
          <IconMember />
        ) : (
          <ProfileImage width={40} height={40} src={profileImage} alt='profileImage' />
        )}
        <Stack.Vertical gutter={4}>
          <Name color={colors.gray10}>{isBlindWriter ? '익명' : name}</Name>
          {!isBlindWriter ? (
            <Text typography='SUIT_13_R' color={colors.gray100}>
              {info}
            </Text>
          ) : null}
        </Stack.Vertical>
      </Flex>
      <RelativeTimeText typography='SUIT_14_R' color={colors.gray300}>
        {getRelativeTime(createdAt)}
      </RelativeTimeText>
    </Flex>
  );
};

const ProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Name = styled(Text)`
  ${textStyles.SUIT_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB};
  }
`;

const RelativeTimeText = styled(Text)`
  ${textStyles.SUIT_14_R};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_13_R};
  }
`;

interface ContentProps {
  isQuestion?: boolean;
  title: string;
  content: string;
  hits: number;
  commentLength: number;
  images: string[];
}

const Content = ({ isQuestion = false, title, content, hits, commentLength, images }: ContentProps) => {
  const [openSlider, setOpenSlider] = useState(false);

  return (
    <>
      <Stack gutter={8}>
        <Flex css={{ gap: 3 }} align='center'>
          {isQuestion ? <QuestionBadge>질문</QuestionBadge> : null}
          <Title>{title}</Title>
        </Flex>
        <StyledContent>{content}</StyledContent>
      </Stack>
      {images.length !== 0 ? (
        <Flex css={{ gap: 8, overflowX: 'auto' }} onClick={() => setOpenSlider(true)}>
          {images.map((image, index) => (
            <ImageItem key={index} src={image} alt='image' />
          ))}
        </Flex>
      ) : null}
      <Text typography='SUIT_14_R' color={colors.gray300}>{`댓글 ${commentLength}개 ∙ ${hits}명 읽음`}</Text>
      <FeedImageSlider opened={openSlider} images={images} onClose={() => setOpenSlider(false)} />
    </>
  );
};

const Title = styled(Text)`
  ${textStyles.SUIT_20_SB};
`;

const StyledContent = styled(Text)`
  line-height: 22px;
  white-space: pre-wrap;
  color: ${colors.gray10};
  ${textStyles.SUIT_16_R};

  font-weight: 300;
`;

const QuestionBadge = styled.div`
  border-radius: 5px;
  background-color: ${colors.orangeAlpha200};
  padding: 6px;
  color: ${colors.secondary};
`;

const ImageItem = styled.img`
  flex: 0;
  border-radius: 12px;
  cursor: pointer;
  height: 240px;
  object-fit: cover;
`;

const Divider = styled.hr`
  flex-shrink: 0;
  margin: 0;
  border: none;
  background-color: ${colors.gray800};
  height: 1px;
`;

interface CommentProps {
  profileImage: string | null;
  name: string;
  info: string;
  comment: string;
  isBlindWriter: boolean;
  createdAt: string;
  moreIcon?: ReactNode;
}
const Comment = ({ profileImage, name, info, comment, isBlindWriter, createdAt, moreIcon }: CommentProps) => {
  return (
    <StyledComment>
      <Flex css={{ gap: 8 }}>
        {isBlindWriter || profileImage == null ? (
          <IconMember />
        ) : (
          <CommentProfileImage width={32} height={32} src={profileImage} alt='profileImage' />
        )}
        <Stack css={{ width: '100%' }} gutter={6}>
          <Flex justify='space-between'>
            <Flex>
              <Text typography='SUIT_13_SB' color={colors.gray10}>
                {!isBlindWriter ? `${name}∙` : '익명'}
              </Text>
              {!isBlindWriter ? (
                <Text typography='SUIT_13_R' color={colors.gray100}>
                  {info}
                </Text>
              ) : null}
            </Flex>
            <Flex>
              <Text typography='SUIT_13_R' color={colors.gray400}>
                {getRelativeTime(createdAt)}
              </Text>
              {moreIcon}
            </Flex>
          </Flex>
          <Text typography='SUIT_14_M'>{comment}</Text>
        </Stack>
      </Flex>
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 20px 24px 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 16px;
  }
`;

const CommentProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  isBlindChecked: boolean;
  onChangeIsBlindChecked: (checked: boolean) => void;
}

const Input = ({ value, onChange, isBlindChecked, onChangeIsBlindChecked }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const is버튼액티브 = isFocus && value.length > 0;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocus(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <InputAnimateArea
        initial={{ height: 0 }}
        animate={{ height: isFocus ? '34px' : 0 }}
        transition={{ bounce: 0, stiffness: 1000 }}
      >
        <InputContent>
          <Checkbox size='small' checked={isBlindChecked} onChange={(e) => onChangeIsBlindChecked(e.target.checked)} />
          <Text typography='SUIT_12_M'>익명으로 남기기</Text>
        </InputContent>
      </InputAnimateArea>
      <Flex>
        <StyledInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocus(true)}
          placeholder='댓글을 남겨주세요.'
        />
        <SendButton
          type='submit'
          initial={{
            backgroundColor: colors.gray800,
          }}
          animate={{
            backgroundColor: is버튼액티브 ? colors.success : colors.gray800,
          }}
        >
          <IconSendFill />
        </SendButton>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  border-top: 1px solid ${colors.gray800};
  border-bottom: 1px solid ${colors.gray800};
  border-radius: 10px;
  background-color: ${colors.gray950};
  padding: 16px;
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

const StyledInput = styled.input`
  flex: 1;
  border: none;
  ${textStyles.SUIT_16_M};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colors.gray500};
  }
`;

const SendButton = styled(m.button)`
  border-radius: 12px;
  padding: 8px;
`;

const Icon = ({ name }: { name: 'share' | 'chevronLeft' | 'moreVertical' | 'moreHorizental' }) => {
  return (
    <SwitchCase
      value={name}
      caseBy={{
        share: <IconShare />,
        chevronLeft: <IconChevronLeft />,
        moreVertical: <IconMoreVert />,
        moreHorizental: <IconMoreHoriz />,
      }}
      default={null}
    />
  );
};

export default Object.assign(Base, {
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
