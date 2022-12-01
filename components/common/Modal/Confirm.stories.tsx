import { ComponentMeta } from '@storybook/react';

import Button from '@/components/common/Button';

import Confirm from './Confirm';

export default {
  component: Confirm,
} as ComponentMeta<typeof Confirm>;

export const Default = () => {
  const onConfirm = () => {
    Confirm({
      title: '컨펌 모달',
    });
  };

  return (
    <>
      <Button onClick={onConfirm}>클릭하여 모달 열기</Button>
    </>
  );
};
Default.args = {};
Default.storyName = '기본';
