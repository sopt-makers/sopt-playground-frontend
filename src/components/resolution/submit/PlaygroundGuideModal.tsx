import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface PlaygroundGuideModal extends ModalProps {
  isJustTimecapsopt?: boolean;
}

const PlaygroundGuideModal = ({ isJustTimecapsopt, ...props }: PlaygroundGuideModal) => {
  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100} onOpenAutoFocus={(e) => e.preventDefault()}>
      <TitleTextWrapper>
        <Text typography='SUIT_20_SB'>
          {isJustTimecapsopt ? '타임캡솝을 보관했어요 💌' : '타임캡솝이 이미 보관되었어요 💌'}
        </Text>
        <Description typography='SUIT_14_M' color={colors.gray200}>
          보관된 타임캡솝은 종무식 때 열어볼 수 있어요
        </Description>
      </TitleTextWrapper>
      <StyledDivider />
      <Description typography='SUIT_18_SB'>오직 SOPT에서만 이용할 수 있는{'\n'} 기능도 만나보세요!</Description>
    </StyledModal>
  );
};

export default PlaygroundGuideModal;

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
  line-height: 22px;
  white-space: pre-wrap;
`;

const StyledDivider = styled.div`
  margin: 28px;
  background: ${colors.gray400};
  width: 64px;
  height: 1px;
`;
