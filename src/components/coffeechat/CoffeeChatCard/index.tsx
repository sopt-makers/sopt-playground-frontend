import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import { Flex } from '@toss/emotion-utils';
import { Tag } from '@sopt-makers/ui';
import IconCoffee from '@/public/icons/icon-coffee.svg';

interface MentoringCardProps {
  name: string;
  profileImage: string;
  organization: string;
  skills: string;
  title: string;
  onClick?: () => void;
}

export default function CoffeeChatCard({
  name,
  profileImage,
  organization,
  skills,
  title,
  onClick,
}: MentoringCardProps) {
  return (
    <Container onClick={onClick}>
      <Flex direction='column' style={{ gap: 12, overflow: 'hidden' }}>
        <Title>{title}</Title>
        <HorizontalScroller>
          <Flex style={{ gap: 4, marginTop: 4 }}>
            {skills.split(',').map((skill) => (
              <Tag size='sm' shape='rect' variant='secondary' type='solid'>
                {skill}
              </Tag>
            ))}
          </Flex>
        </HorizontalScroller>
        <Mentor>{organization ? `${name} · ${organization}` : name}</Mentor>
      </Flex>
      <Flex direction='column' align='end' justify='space-between' style={{ height: '100%' }}>
        {profileImage ? (
          <ProfileImage src={profileImage} />
        ) : (
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
        <IconContainer>
          <IconCoffee />
        </IconContainer>
      </Flex>
    </Container>
  );
}

const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery('1200px');

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

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
  }

  @media ${MOBILE_MEDIA_QUERY} {
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
`;

const ProfileImage = styled.img`
  grid-area: profileImage;
  align-self: center;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  object-fit: cover;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    width: 20px;
    height: 20px;
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

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    width: 20px;
    height: 20px;

    & > svg {
      width: 10px;
      height: 10px;
    }
  }
`;

const Mentor = styled.div`
  grid-area: mentor;
  line-height: 120%;
  color: ${colors.gray300};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${textStyles.SUIT_12_R};
  }
`;

const IconContainer = styled.div`
  border-radius: 50%;
  background: ${colors.blue400};
  padding: 5px;
  width: 32px;
  height: 32px;
`;
