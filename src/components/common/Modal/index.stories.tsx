import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import { Alert } from '@/components/common/Modal/Alert';
import { Confirm } from '@/components/common/Modal/Confirm';
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
        <Modal title='모달 예시' isOpen={isOpen} onClose={onClose} />
      </>
    );
  },

  name: '기본',
};

export const ConfirmModal = {
  render: () => {
    const onConfirm = async () => {
      const result = await Confirm({
        title: '컨펌 모달',
      });
      if (result) {
        alert('confirm!');
      }
    };

    return (
      <>
        <Button onClick={onConfirm}>클릭하여 모달 열기</Button>
      </>
    );
  },

  name: '컨펌',
};

export const AlertModal = {
  render: () => {
    return (
      <>
        <Button
          onClick={() => {
            Alert({
              title: '알럿 모달',
            });
          }}
        >
          클릭하여 모달 열기
        </Button>
      </>
    );
  },

  name: '알럿',
};
