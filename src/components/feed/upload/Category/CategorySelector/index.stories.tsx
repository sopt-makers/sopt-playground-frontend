import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';

export default {
  component: CategorySelector,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 셀렉터 열기</Button>
        <CategorySelector
          isOpen={isOpen}
          onNext={onClose}
          onClose={onClose}
          onSelect={onClose}
          feedData={{
            mainCategoryId: 0,
            categoryId: 0,
            title: '',
            content: '',
            isQuestion: false,
            isBlindWriter: false,
            images: [],
          }}
        />
      </>
    );
  },

  name: '카테고리 셀렉터',
};
