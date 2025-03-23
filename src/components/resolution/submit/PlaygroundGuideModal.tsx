import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import router from 'next/router';
import { ReactNode } from 'react';

import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { playgroundLink } from '@/constants/links';
import CoffeeIcon from '@/public/logos/playgroundGuide/img_coffee.svg';
import GroupIcon from '@/public/logos/playgroundGuide/img_group.svg';
import MemberIcon from '@/public/logos/playgroundGuide/img_member.svg';
import ProjectIcon from '@/public/logos/playgroundGuide/img_project.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface PlaygroundGuideModalProps extends ModalProps {
  isJustTimecapsopt?: boolean;
}

interface CardProps {
  name: string;
  description: string;
  color: string;
  hover: string;
  icon: ReactNode;
  button: string;
  href: string;
}
const cards = [
  {
    id: 1,
    name: '모임',
    description: 'SOPT에는 어떤 모임이 있을지 궁금해요',
    color: '#FF6E1D',
    hover: '#C24F0F',
    icon: <GroupIcon />,
    button: '#521F01',
    href: playgroundLink.groupList(),
  },
  {
    id: 2,
    name: '멤버',
    description: '나와 함께 활동할 36기 사람들이 궁금해요',
    color: '#5CDBFE',
    hover: '#4194AB',
    icon: <MemberIcon />,
    button: '#0E5A6F',
    href: playgroundLink.memberList(),
  },
  {
    id: 3,
    name: '프로젝트',
    description: 'SOPT에서 만들어진 프로덕트를 보고싶어요',
    color: '#FDBBF9',
    hover: '#BC60A7',
    icon: <ProjectIcon />,
    button: '#8C3D87',
    href: playgroundLink.projectList(),
  },
  {
    id: 4,
    name: '커피솝',
    description: 'SOPT 이전 기수에게 조언을 듣고싶어요',
    color: '#3E74FD',
    hover: '#2952BC',
    icon: <CoffeeIcon />,
    button: '#1C2584',
    href: playgroundLink.coffeechat(),
  },
];
const PlaygroundGuideModal = ({ isJustTimecapsopt, ...props }: PlaygroundGuideModalProps) => {
  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100} onOpenAutoFocus={(e) => e.preventDefault()}>
      <TitleTextWrapper>
        <Text typography='SUIT_20_SB'>
          {isJustTimecapsopt ? '타임캡솝을 보관했어요 💌' : '타임캡솝이 이미 보관되었어요 💌'}
        </Text>
        <Description typography='SUIT_14_M' color={colors.gray200} lineHeight={22}>
          보관된 타임캡솝은 종무식 때 열어볼 수 있어요
        </Description>
      </TitleTextWrapper>
      <StyledDivider />
      <Description typography='SUIT_18_SB' lineHeight={28}>
        오직 SOPT에서만 이용할 수 있는{'\n'} 기능도 만나보세요!
      </Description>
      <CardWrapper>
        {cards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            description={card.description}
            color={card.color}
            hover={card.hover}
            icon={card.icon}
            button={card.button}
            href={card.href}
          />
        ))}
      </CardWrapper>
    </StyledModal>
  );
};

export default PlaygroundGuideModal;

const Card = ({ name, description, color, hover, icon, button, href }: CardProps) => {
  return (
    <StyledCard color={color} hover={hover} href={href}>
      <Text typography='SUIT_14_SB' lineHeight={20}>
        {description}
      </Text>
      {icon}
      <StyledButton color={button}>
        {name} 보러가기
        <IconChevronRight />
      </StyledButton>
    </StyledCard>
  );
};

const IconChevronRight = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='5' height='8' viewBox='0 0 5 8' fill='none'>
      <path d='M1 7L4 4L1 1' stroke='white' stroke-width='1.125' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray900};
  padding: 18px;
  width: 430px;
  min-width: 320px;
  max-height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;

const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  margin-top: 56px;
  width: 100%;
`;

const Description = styled(Text)`
  text-align: center;
  white-space: pre-wrap;
`;

const StyledDivider = styled.div`
  margin: 28px;
  background: ${colors.gray400};
  width: 64px;
  height: 1px;
`;

const CardWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
`;

const StyledCard = styled(Link)<{ color: string; hover: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  border-radius: 9.6px;
  background: ${({ color }) => color};
  padding: 16px;
  width: 100%;
  min-width: 136px;
  height: 190px;

  &:hover {
    background: ${({ hover }) => hover};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
  }
`;

const StyledButton = styled.button<{ color: string }>`
  display: flex;
  gap: 2px;
  align-items: center;
  border-radius: 80px;
  background: ${({ color }) => color};
  padding: 4px;
  padding-left: 8px;
  width: max-content;
  color: ${colors.gray10};
  ${fonts.LABEL_11_SB}
`;
