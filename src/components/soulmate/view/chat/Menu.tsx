import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, ReactNode, useState } from 'react';

import SoulmateIconFlag from '@/components/soulmate/icons/SoulmateIconFlag';
import SoulmateIconHeart from '@/components/soulmate/icons/SoulmateIconHeart';
import SoulmateModal from '@/components/soulmate/view/common/SoulmateModal';
import { colors } from '@sopt-makers/colors';
import { textStyles } from '@/styles/typography';

interface MenuProps {
  className?: string;
  progressSlot: ReactNode;
}

const Menu: FC<MenuProps> = ({ className, progressSlot }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container className={className}>
      <ProgressButton onClick={() => setOpen(true)}>
        <StyledSoulmateIconFlag />
        미션 현황
      </ProgressButton>
      <FeedbackLink>
        <StyledSoulmateIconHeart />
        후기 보내기
      </FeedbackLink>
      <SoulmateModal open={open} onOpenChange={(v) => setOpen(v)}>
        <ModalContainer>
          <StyledSoulmateIconFlag />
          <ModalTitle>미션 현황</ModalTitle>
          <ModalChildren>{progressSlot}</ModalChildren>
        </ModalContainer>
      </SoulmateModal>
    </Container>
  );
};

export default Menu;

const buttonStyle = css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.black80};
  cursor: pointer;
  padding: 6px 10px;

  ${textStyles.SUIT_14_M};
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const ProgressButton = styled.button`
  ${buttonStyle};

  flex-grow: 1;
`;

const FeedbackLink = styled.a`
  ${buttonStyle};

  flex-grow: 1;
`;

const StyledSoulmateIconHeart = styled(SoulmateIconHeart)`
  width: 32px;
  height: 32px;
`;

const StyledSoulmateIconFlag = styled(SoulmateIconFlag)`
  width: 32px;
  height: 32px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 16px 16px;
`;

const ModalTitle = styled.div`
  margin-top: 10px;
  text-align: center;

  ${textStyles.SUIT_14_B};
`;

const ModalChildren = styled.div`
  margin-top: 10px;
`;
