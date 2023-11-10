import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import { DropDown } from '@/components/feed/upload/Category/DropDown';

export default {
  component: DropDown,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 드롭다운 열기</Button>
        <DropDown isOpen={isOpen} onClose={onClose}>
          드롭다운
        </DropDown>
      </>
    );
  },

  name: '드롭다운 기본',
};
