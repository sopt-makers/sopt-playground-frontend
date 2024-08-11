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

interface MentoringCardProps {
  id: string;
  name: string;
  profileImage: string;
  organization: string;
  skills: string;
  title: string;
}

export default function CoffeeChatCard({
  id,
  name,
  profileImage,
  organization,
  skills,
  title,
}: MentoringCardProps) {
  const router = useRouter();
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });

  return (
    <Container
      onClick={() => {
        router.push(playgroundLink.memberDetail(id));
      }}
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

const Container = styled(Flex)`
  width: 419px;
  min-width: 419px;
  height: 198px;
  padding: 32px 36px;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  background: ${colors.gray900};
  gap: 11px;
  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 335px;
    min-width: 335px;
    height: 140px;
    padding: 18px 20px;
    border-radius: 16px;
  }
`;

const Title = styled.div`
  display: -webkit-box;
  height: 56px;
  color: ${colors.white};

  /* Title/18_SB */
  font-size: 18px;
  font-weight: 600;
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;

  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 40px;
    /* Title/14_SB */
    font-size: 14px;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.21px;
  }
`;

const Mentor = styled.div`
  grid-area: mentor;
  line-height: 120%;
  color: ${colors.gray300};

  /* Label/14_SB */
  font-size: 14px;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.28px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    /* Label/12_SB */
    font-size: 12px;
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.24px;
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
  grid-area: profileImage;
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
  grid-area: profileImage;
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
