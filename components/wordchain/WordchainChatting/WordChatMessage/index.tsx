import styled from '@emotion/styled';
import Link from 'next/link';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface WordChatMessageProps {
  user: {
    id: number;
    name: string;
    profileImage?: string;
  };
  word: string;
}

export default function WordChatMessage({ user, word }: WordChatMessageProps) {
  return (
    <Container>
      <MessageBox>
        <Word>{word}</Word>
        <Divider>|</Divider>
        <Link href={playgroundLink.memberDetail(user.id)} style={{ height: 'min-content' }}>
          <Name>{user.name}</Name>
        </Link>
      </MessageBox>
      <Link href={playgroundLink.memberDetail(user.id)}>
        {user.profileImage ? (
          <ProfileImage src={user.profileImage} />
        ) : (
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

const MessageBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 20px 20px 0;
  background-color: ${colors.black90};
  padding: 16px 20px;
  width: fit-content;
`;

const Word = styled.div`
  line-height: 120%;
  color: ${colors.white};

  ${textStyles.SUIT_16_M}
`;

const Divider = styled.div`
  line-height: 120%;
  color: ${colors.black40};

  ${textStyles.SUIT_16_M}
`;

const Name = styled.div`
  line-height: 100%;
  color: ${colors.purple100};

  ${textStyles.SUIT_14_SB}
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 40px;
  height: 40px;;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;
