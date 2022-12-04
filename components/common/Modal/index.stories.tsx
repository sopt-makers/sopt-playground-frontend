import { Meta } from '@storybook/react';
import { useState } from 'react';

import Button from '@/components/common/Button';
import { Alert } from '@/components/common/Modal/Alert';
import { Confirm } from '@/components/common/Modal/Confirm';

import Modal from '.';

export default {
  component: Modal,
} as Meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>클릭하여 모달 열기</Button>
      <Modal title='모달 예시' isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
Default.storyName = '기본';

export const ConfirmModal = () => {
  const onConfirm = () => {
    Confirm({
      title: '컨펌 모달',
    });
  };

  return (
    <>
      <Button onClick={onConfirm}>클릭하여 모달 열기</Button>
    </>
  );
};
ConfirmModal.storyName = '컨펌';

export const AlertModal = () => {
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
};
AlertModal.storyName = '알럿';
