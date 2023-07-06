import { Meta } from '@storybook/react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';

export default {
  component: ErrorMessage,
} as Meta<typeof ErrorMessage>;

export const Basic = {
  args: {
    message: '에러가 발생했습니다.',
  },
};

export const NoMessage = {
  args: {
    message: undefined,
  },
};
