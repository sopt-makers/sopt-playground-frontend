import styled from '@emotion/styled';
import Modal from '@/components/common/Modal';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

interface CheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  moveToCheck: () => void;
}

function CheckModal({ isOpen, onClose, moveToCheck }: CheckModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
      <Modal.Content style={{ maxWidth: '303px' }}>
        <MobileModalTitle>활동 정보를 확인해주세요</MobileModalTitle>
        <MobileModalDesc>
          현재 일부 회원의 활동 정보가 정확하게 등록되어 있지 않아요.
          <br />
          본인의 활동 정보를 한번 더 확인해주세요.
        </MobileModalDesc>
        <Modal.Footer align='stretch'>
          <Modal.Button action='close' background='light' onClick={moveToCheck}>
            활동 정보 확인하기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CheckModal;

const MobileModalTitle = styled(Modal.Title)`
  text-align: left;
  letter-spacing: -0.36px;
  color: ${colors.gray10};
  ${fonts.TITLE_18_SB}
`;

const MobileModalDesc = styled(Modal.Description)`
  text-align: left;
  letter-spacing: -0.21px;
  color: ${colors.gray100};
  ${fonts.BODY_14_R}
`;
