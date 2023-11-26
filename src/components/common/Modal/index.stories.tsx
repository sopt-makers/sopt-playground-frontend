import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';

import Modal from '.';

export default {
  component: Modal,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 모달 열기</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Content style={{ minWidth: '500px' }}>
            <Modal.Title>모달 제목!</Modal.Title>
            <div>안녕하세요, 반가워요.</div>
            <Modal.Footer align='stretch'>
              <Modal.Button action='normal'>버튼1</Modal.Button>
              <Modal.Button action='close'>닫기</Modal.Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },

  name: '기본',
};
