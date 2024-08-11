import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import { Flex } from '@toss/emotion-utils';
import { Tag } from '@sopt-makers/ui';
import IconCoffee from '@/public/icons/icon-coffee.svg';
import { useState } from 'react';
import { MessageModalState } from '@/components/members/main/MemberList';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

interface MentoringCardProps {
  id: string;
  name: string;
  profileImage: string;
  organization: string;
  skills: string;
  title: string;
  isBlurred?: boolean;
}

export default function CoffeeChatCard({
  id,
  name,
  profileImage,
  organization,
  skills,
  title,
  isBlurred,
}: MentoringCardProps) {
  const router = useRouter();
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });

  return (
    <Container
      whileHover={{
        y: -4,
      }}
      onClick={() => {
        router.push(playgroundLink.memberDetail(id));
      }}
      isBlurred={isBlurred}
    >
      <Flex direction='column' style={{ gap: 12, overflow: 'hidden' }}>
        <Title>{title}</Title>
        <HorizontalScroller>
          <Flex style={{ gap: 4, marginTop: 4 }}>
            {skills
              .split(',')
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill) => (
                <Tag size='sm' shape='rect' variant='secondary' type='solid'>
                  {skill}
                </Tag>
              ))}
          </Flex>
        </HorizontalScroller>
        <Mentor>{organization ? `${name} · ${organization}` : name}</Mentor>
      </Flex>
      <ProfileSection>
        {profileImage ? (
          <ProfileImage src={profileImage} />
        ) : (
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
        <IconContainer
          onClick={(e) => {
            e.stopPropagation();
            setMessageModalState({
              show: true,
              data: { targetId: id, name, profileUrl: profileImage },
            });
          }}
        >
          <IconCoffee />
        </IconContainer>
      </ProfileSection>
      {messageModalState.show && (
        <MessageModal
          receiverId={messageModalState.data.targetId}
          name={messageModalState.data.name}
          profileImageUrl={messageModalState.data.profileUrl}
          onClose={() => setMessageModalState({ show: false })}
          defaultCategory={MessageCategory.COFFEE_CHAT}
        />
      )}
    </Container>
  );
}

const Container = styled(m.div)<{ isBlurred?: boolean }>`
  display: flex;
  gap: 11px;
  align-items: center;
  justify-content: space-between;
  padding: 32px 36px;
  border-radius: 24px;
  width: 419px;
  min-width: 419px;
  height: 198px;
  background: ${colors.gray900};
  cursor: pointer;

  ${({ isBlurred }) =>
    isBlurred &&
    css`
      filter: blur(5px);
    `};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 16px;
    padding: 18px 20px;
    width: 335px;
    min-width: 335px;
    height: 140px;
  }
`;

const Title = styled.div`
  display: ${'-webkit-box'};
  overflow: hidden;
  height: 56px;

  /* Title/18_SB */
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.white};
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-line;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 40px;

    /* Title/14_SB */
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.21px;
    font-size: 14px;
  }
`;

const Mentor = styled.div`
  /* Label/14_SB */
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.28px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray300};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;

    /* Label/12_SB */
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.24px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-end;
  }
`;

const ProfileImage = styled.img`
  align-self: center;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 68px;
  height: 68px;

  & > svg {
    width: 34px;
    height: 34px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const IconContainer = styled.div`
  border-radius: 50%;
  background: ${colors.blue400};
  padding: 5px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.blue200};
  }
`;
