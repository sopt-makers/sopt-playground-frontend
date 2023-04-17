import styled from '@emotion/styled';
import WarningIcon from 'public/icons/icon-warning.svg';

import Modal from '@/components/common/Modal';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface NoMessageModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function NoMessageModal({ onClose, isOpen }: NoMessageModalProps) {
  return (
    <StyledModal onClose={onClose} isOpen={isOpen}>
      <StyledWarningIcon />
      <Content>{`해당 유저는 이메일을 등록하지 않아\n쪽지를 보낼 수 없어요.`}</Content>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  border-radius: 10px;
  background: ${colors.black100};
  width: 280px;
`;

const StyledWarningIcon = styled(WarningIcon)``;

const Content = styled.div`
  margin-top: 12px;
  text-align: center;
  line-height: 130%;
  white-space: pre-line;

  ${textStyles.SUIT_14_M}
`;
