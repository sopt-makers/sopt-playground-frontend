import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

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
import ResizedImage from '@/components/common/ResizedImage';

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
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
          <ImageBox>
            <EmptyProfileImage hide={isImageLoaded}>
              <DefaultImage src='/icons/icon-profile.svg' loading='lazy' decoding='async' />
            </EmptyProfileImage>
            {profileImage && (
              <ResizedProfileImage
                src={profileImage}
                onLoad={() => setIsImageLoaded(true)}
                hide={!isImageLoaded}
                width={68}
              />
            )}
          </ImageBox>
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
      </Container>
      {messageModalState.show && (
        <MessageModal
          receiverId={messageModalState.data.targetId}
          name={messageModalState.data.name}
          profileImageUrl={messageModalState.data.profileUrl}
          onClose={() => setMessageModalState({ show: false })}
          defaultCategory={MessageCategory.COFFEE_CHAT}
        />
      )}
    </>
  );
}

const Container = styled(m.div)<{ isBlurred?: boolean }>`
  display: flex;
  gap: 11px;
  align-items: center;
  justify-content: space-between;
  border-radius: 24px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 32px 36px;
  width: 419px;
  min-width: 419px;
  height: 198px;

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
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Title/18_SB */
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;
  white-space: pre-line;
  word-break: break-word;
  color: ${colors.white};
  font-size: 18px;
  font-weight: 600;
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
  color: ${colors.gray300};
  font-size: 14px;
  font-weight: 600;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;

    /* Label/12_SB */
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.24px;
    white-space: nowrap;
    font-size: 12px;
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
const ImageBox = styled.div`
  position: relative;
  width: 68px;
  height: 68px;
  clip-path: circle(50%);

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const EmptyProfileImage = styled.div<{ hide?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray700};
  width: 68px;
  height: 68px;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const DefaultImage = styled.img`
  width: 34px;
  height: 34px;
`;

const ResizedProfileImage = styled(ResizedImage)<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const IconContainer = styled.div`
  border-radius: 50%;
  background: ${colors.blue400};
  cursor: pointer;
  padding: 5px;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${colors.blue200};
  }
`;
