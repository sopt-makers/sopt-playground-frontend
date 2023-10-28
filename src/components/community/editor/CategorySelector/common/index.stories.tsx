import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import Sheet from '@/components/community/editor/CategorySelector/common';

export default {
  component: Sheet,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 드롭다운 열기</Button>
        <Sheet isOpen={isOpen} onClose={onClose}>
          드롭다운
        </Sheet>
      </>
    );
  },

  name: '드롭다운 기본',
};
