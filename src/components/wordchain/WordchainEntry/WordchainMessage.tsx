import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type User = {
  id: number;
  name: string;
  profileImage?: string;
};

type WordchainMessageProps = { word: string } & (
  | {
      type: 'word';
      user: User;
    }
  | {
      type: 'startWord';
    }
);

export default function WordchainMessage(props: WordchainMessageProps) {
  return (
    <Container>
      <MessageBox>
        <Word>
          <LastWord isWhite={props.type === 'startWord'}>'{props.word}'</LastWord>(으)로 시작하는 단어는?
        </Word>
      </MessageBox>
      {props.type === 'word' && (
        <Link href={playgroundLink.memberDetail(props.user.id)}>
          {props.user.profileImage ? (
            <ProfileImage src={props.user.profileImage} />
          ) : (
            <EmptyProfileImage>
              <ProfileIcon />
            </EmptyProfileImage>
          )}
        </Link>
      )}
      {props.type === 'startWord' && <ProfileImage src='/logos/img/logo-makers-circle.png' />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
  }
`;

const MessageBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 15.869px 15.869px 0;
  background-color: ${colors.gray700};
  padding: 10px 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
    border-radius: 10px 10px 0;
    padding: 10px 16px;
  }
`;

const Word = styled.div`
  line-height: 120%;
  color: ${colors.gray10};

  ${fonts.BODY_13_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB};
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
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
  background-color: ${colors.gray700};
  width: 32px;
  height: 32px;

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

const LastWord = styled.span<{ isWhite: boolean }>`
  color: ${(props) => (props.isWhite ? colors.white : colors.yellow300)};
`;
