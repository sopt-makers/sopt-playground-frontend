import { Meta } from '@storybook/react';
import { useState } from 'react';

import Button from '@/components/common/Button';

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
