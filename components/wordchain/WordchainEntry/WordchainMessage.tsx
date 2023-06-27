import styled from '@emotion/styled';
import Link from 'next/link';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
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
      type: 'startWord' | 'helper';
    }
);

export default function WordchainMessage(props: WordchainMessageProps) {
  return (
    <Container>
      <MessageBox>
        <Word>{props.word}</Word>
        {(props.type === 'word' || props.type === 'startWord') && (
          <>
            <Divider>|</Divider>
            {props.type === 'word' && (
              <Link href={playgroundLink.memberDetail(props.user.id)}>
                <Name>{props.user.name}</Name>
              </Link>
            )}
            {props.type === 'startWord' && <Name>제시어</Name>}
          </>
        )}
      </MessageBox>
      {(props.type === 'helper' || props.type === 'startWord') && (
        <ProfileImage src='/logos/img/logo-makers-circle.png' />
      )}
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 14px;
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
  border-radius: 20px 20px 0;
  background-color: ${colors.black60};
  padding: 16px 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
    border-radius: 10px 10px 0;
    padding: 10px 16px;
  }
`;

const Word = styled.div`
  line-height: 120%;
  color: ${colors.white};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB};
  }
`;

const Divider = styled.div`
  line-height: 120%;
  color: ${colors.black40};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    height: 14px;
  }
`;

const Name = styled.div`
  line-height: 100%;
  color: ${colors.purple100};

  ${textStyles.SUIT_14_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB};
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
