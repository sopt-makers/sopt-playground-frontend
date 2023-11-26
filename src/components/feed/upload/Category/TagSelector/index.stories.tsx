import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import TagSelector from '@/components/feed/upload/Category/TagSelector';

export default {
  component: TagSelector,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>클릭하여 셀렉터 열기</Button>
        <TagSelector
          isOpen={isOpen}
          onClose={onClose}
          onBack={onClose}
          feedData={{
            mainCategoryId: 0,
            categoryId: 0,
            title: '',
            content: '',
            isQuestion: false,
            isBlindWriter: false,
            images: [],
          }}
          onSave={onClose}
        />
      </>
    );
  },

  name: '태그 셀렉터',
};
