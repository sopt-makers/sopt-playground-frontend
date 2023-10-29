import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import CategoryDropDown from '@/components/feed/upload/CategorySelector/CategoryDropDown';

export default {
  component: CategoryDropDown,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 드롭다운 열기</Button>
        <CategoryDropDown isOpen={isOpen} onClose={onClose} />
      </>
    );
  },

  name: '카테고리 드롭다운',
};
