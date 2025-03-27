import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { ModalBottomSheet } from '@/components/common/BottomSheet/ModalBottomSheet';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import TimecapsopDelteButton from '@/components/resolution/delete';
import { cards } from '@/components/resolution/submit/constants/cards';
import { DEBUG } from '@/constants/env';
import { MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface PlaygroundGuideModalProps extends ModalProps {
  isAlreadyRegistration?: boolean;
}

interface CardProps {
  name: string;
  description: string;
  color: string;
  hover: string;
  icon: ReactNode;
  button: string;
  href: string;
  onClose: () => void;
}

const PlaygroundGuideModal = ({ ...props }: PlaygroundGuideModalProps) => {
  return (
    <>
      <StyledModal
        className='desktop'
        isOpen
        {...props}
        zIndex={zIndex.헤더 + 100}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <PlaygroundGuide {...props} />
      </StyledModal>
      <ModalBottomSheetWrapper className='mobile'>
        <ModalBottomSheet isOpen onClose={props.onClose}>
          <PlaygroundGuide {...props} />
        </ModalBottomSheet>
      </ModalBottomSheetWrapper>
    </>
  );
};

export default PlaygroundGuideModal;

const PlaygroundGuide = ({ isAlreadyRegistration, ...props }: PlaygroundGuideModalProps) => {
  return (
    <>
      <TitleTextWrapper>
        <Text typography='SUIT_20_SB'>
          {isAlreadyRegistration ? '타임캡솝이 이미 보관되었어요 💌' : '타임캡솝을 보관했어요 💌'}
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
            onClose={props.onClose}
          />
        ))}
      </CardWrapper>
      {DEBUG && <TimecapsopDelteButton />}
    </>
  );
};

const Card = ({ name, description, color, hover, icon, button, href, onClose }: CardProps) => {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await router.replace('/', undefined, { shallow: true });
    router.push(href);
    onClose();
  };

  return (
    <StyledCard color={color} hover={hover} href={href} onClick={handleClick}>
      <Description typography='SUIT_14_SB' color={colors.black} lineHeight={20}>
        {description}
      </Description>
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
    <svg xmlns='http://www.w3.org/2000/svg' width='13' height='12' viewBox='0 0 13 12' fill='none'>
      <path d='M5 9L8 6L5 3' stroke='white' stroke-width='1.125' stroke-linecap='round' stroke-linejoin='round' />
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

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    &.desktop {
      display: none;
    }
  }
`;

const ModalBottomSheetWrapper = styled(Slot)`
  &.mobile {
    display: none;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    &.mobile {
      display: block;
    }
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
  word-break: keep-all;
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

  @media ${MB_BIG_MEDIA_QUERY} {
    padding: 18px;
  }
`;

const StyledCard = styled.a<{ color: string; hover: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  border-radius: 9.6px;
  background: ${({ color }) => color};
  padding: 16px;
  width: 100%;
  min-width: 136px;
  max-height: 190px;

  &:hover {
    background: ${({ hover }) => hover};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    max-height: 202px;
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
