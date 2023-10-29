import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import MainSelector from '@/components/feed/upload/CategorySelector/common/MainSelector';

export default {
  component: MainSelector,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 드롭다운 열기</Button>
        <MainSelector isOpen={isOpen} onClose={onClose} />
      </>
    );
  },

  name: '메인셀렉터',
};
