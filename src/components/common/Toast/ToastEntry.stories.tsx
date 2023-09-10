import { Meta } from '@storybook/react';

import ToastEntry from '@/components/common/Toast/ToastEntry';

export default {
  component: ToastEntry,
} as Meta<typeof ToastEntry>;

export const Default = {
  args: {
    title: '링크 복사 완료',
    message: '링크가 클립보드에 저장되었습니다.',
  },
};
