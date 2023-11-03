import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import UsingRulesDetail from '@/components/feed/upload/UsingRules/UsingRulesDetail';

export default {
  component: UsingRulesDetail,
} as Meta<typeof UsingRulesDetail>;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    return (
      <>
        <Button onClick={onOpen}>세부규칙 열기</Button>
        <UsingRulesDetail isOpen={isOpen} onClose={onClose} />
      </>
    );
  },

  name: '커뮤니티 규칙 세부',
};
