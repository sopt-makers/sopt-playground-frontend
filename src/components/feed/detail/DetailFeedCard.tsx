import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Text from '@/components/common/Text';
import { FeedDetailLink } from '@/components/feed/common/queryParam';
import FeedImageSlider from '@/components/feed/detail/slider/FeedImageSlider';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMember,
  IconMoreVert,
  IconSendFill,
  IconShare,
} from '@/components/feed/list/Icon';
import { getRelativeTime } from '@/components/feed/common/utils';
import { textStyles } from '@/styles/typography';

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
}

const Header = ({ category, tag }: HeaderProps) => {
  return (
    <Flex align='center' justify='space-between' as='header' css={{ padding: '0 24px' }}>
      <Flex.Center css={{ gap: 8 }}>
        <FeedDetailLink feedId={undefined}>
          <IconChevronLeft />
        </FeedDetailLink>
        <Chip align='center' as='button'>
          <Text typography='SUIT_13_M'>{category}</Text>
          <IconChevronRight />
          <Text typography='SUIT_13_M'>{tag}</Text>
        </Chip>
      </Flex.Center>
      <Flex.Center css={{ gap: 8 }}>
        <button>
          <IconShare />
        </button>
        <button>
          <IconMoreVert />
        </button>
      </Flex.Center>
    </Flex>
  );
};

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

const Body = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StyledBody direction='column'>
      <Flex direction='column' css={{ position: 'absolute', inset: 0 }}>
        {children}
      </Flex>
    </StyledBody>
  );
};

const StyledBody = styled(Flex)`
  position: relative;
  flex: 1;
  padding: 16px 24px;
  overflow: auto;
`;

const Main = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Stack gutter={16} css={{ padding: '16px 24px' }}>
      {children}
    </Stack>
  );
};

interface TopProps {
  isBlindWriter?: boolean;
  profileImage: string;
  name: string;
  info: string;
  createdAt: string;
}

const Top = ({ isBlindWriter = false, profileImage, name, info, createdAt }: TopProps) => {
  return (
    <Flex justify='space-between'>
      <Flex css={{ gap: 8 }}>
        {isBlindWriter ? <IconMember /> : <ProfileImage width={32} height={32} src={profileImage} alt='profileImage' />}
        <Stack.Vertical gutter={4}>
          <Text typography='SUIT_16_SB' color={colors.gray10}>
            {isBlindWriter ? '익명' : name}
          </Text>
          {!isBlindWriter ? (
            <Text typography='SUIT_13_R' color={colors.gray100}>
              {info}
            </Text>
          ) : null}
        </Stack.Vertical>
      </Flex>
      <Text typography='SUIT_14_R' color={colors.gray300}>
        {getRelativeTime(createdAt)}
      </Text>
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
          <Text typography='SUIT_20_SB'>{title}</Text>
        </Flex>
        <Text css={{ lineHeight: '22px', whiteSpace: 'pre-wrap' }}>{content}</Text>
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
  image: string;
  name: string;
  info: string;
  comment: string;
}
const Comment = ({ image, name, info, comment }: CommentProps) => {
  return (
    <StyledComment>
      <Flex css={{ gap: 8 }}>
        <ProfileImage style={{ width: 32, height: 32 }} src={image} alt='profileImage' />
        <Stack gutter={6}>
          <Flex>
            <Text typography='SUIT_13_SB' color={colors.gray10}>
              {name}∙
            </Text>
            <Text typography='SUIT_13_R' color={colors.gray100}>
              {info}
            </Text>
          </Flex>
          <Text typography='SUIT_14_M'>{comment}</Text>
        </Stack>
      </Flex>
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 20px 24px 12px;
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

export default Object.assign(Base, {
  Header,
  Body,
  Main,
  Top,
  Content,
  Divider,
  Comment,
  Input,
});
