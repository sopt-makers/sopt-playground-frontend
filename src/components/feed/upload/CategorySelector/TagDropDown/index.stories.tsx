import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import TagDropDown from '@/components/feed/upload/CategorySelector/TagDropDown';

export default {
  component: TagDropDown,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 드롭다운 열기</Button>
        <TagDropDown isOpen={isOpen} onClose={onClose} onBack={onClose} />
      </>
    );
  },

  name: '태그 드롭다운',
};
