import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

import Modal from '@/components/common/Modal';

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditImpossibleModal({ isOpen, onClose }: ModalProp) {
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        router.back();
        onClose();
      }}
      hideCloseButton={true}
    >
      <Modal.Content>
        <StyledDescription>다른 사람의 글은 수정할 수 없어요.</StyledDescription>
        <Modal.Footer align='stretch'>
          <StyledButton action='close'>확인</StyledButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const StyledDescription = styled(Modal.Title)`
  padding: 35px 20px 0;
`;

const StyledButton = styled(Modal.Button)`
  background-color: ${colors.white};
  color: ${colors.black};
`;
