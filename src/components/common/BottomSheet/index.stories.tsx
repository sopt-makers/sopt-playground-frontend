import { Meta } from '@storybook/react';

import { BottomSheet } from '@/components/common/BottomSheet';
import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';

export default {
  component: BottomSheet,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={onClose}>
          바텀시트
        </BottomSheet>
      </>
    );
  },

  name: '기본',
};
