import { Meta } from '@storybook/react';

import LoginCallbackView from '@/components/auth/callback/LoginCallbackView';

export default {
  component: LoginCallbackView,
} as Meta<typeof LoginCallbackView>;

export const Loading = {
  args: {
    mode: {
      type: 'loading',
    },
  },
};

export const Error = {
  args: {
    mode: {
      type: 'error',
      errorMessage: '에러가 발생했습니다.',
    },
  },
};
