import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
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
  background-color: ${colors.black100};
  padding: 16px 20px;
  width: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px 10px 0;
    padding: 10px 16px;
  }
`;

const Word = styled.div`
  line-height: 120%;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M}
  }
`;

const Divider = styled.div`
  line-height: 120%;
  color: ${colors.black40};

  ${textStyles.SUIT_16_M}
`;

const Name = styled.div`
  line-height: 100%;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB}
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 24px;
    height: 24px;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 40px;
  height: 40px;

  & > svg {
    width: 20px;
    height: 20px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 24px;
    height: 24px;

    & > svg {
      width: 12px;
      height: 12px;
    }
  }
`;
