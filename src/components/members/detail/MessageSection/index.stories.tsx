import { Meta } from '@storybook/react';

import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import MessageSection from '@/components/members/detail/MessageSection';

export default {
  component: MessageSection,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta<typeof MessageSection>;

export const Default = {
  args: {
    name: '남주영',
    email: 'njy1007@gmail.com',
    memberId: '8',
  },

  name: '기본',
};

export const NoMessage = {
  args: {
    name: '남주영',
    email: '',
    memberId: '8',
  },

  name: '이메일 없는 유저',
};
